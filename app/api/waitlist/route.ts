import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/site";
import { selectWeightedReward, WheelRewardId, wheelRewardIndex } from "@/lib/wheel-rewards";

const HUBSPOT_PORTAL_ID = "247314933";
const WAITLIST_FORM_ID = "d749ed3e-7ce7-4f60-bf48-76723b1a7902";
const WHEEL_FORM_ID = process.env.HUBSPOT_WHEEL_FORM_ID?.trim();
const HUBSPOT_PRIVATE_APP_ACCESS_TOKEN = process.env.HUBSPOT_PRIVATE_APP_ACCESS_TOKEN?.trim();
const WHEEL_SOURCE_PROPERTY = "khao_better_lead_source";
const WHEEL_REWARD_PROPERTY = "khao_better_wheel_reward";
const HUBSPOT_CONTACT_SEARCH_URL = "https://api.hubapi.com/crm/objects/2026-03/contacts/search";

type WaitlistRequest = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  city?: unknown;
  consent?: unknown;
  website?: unknown;
  sourcePage?: unknown;
  flow?: unknown;
};

type HubSpotSubmissionResult = { ok: true } | { ok: false; status: number };
type WheelResponse =
  | { ok: true; alreadySpun: false; rewardId: WheelRewardId }
  | { ok: true; alreadySpun: true; rewardId?: WheelRewardId }
  | { ok: false; code: "CONFIGURATION_REQUIRED" | "LOOKUP_FAILED" | "SUBMISSION_FAILED" };

const pendingWheelAwards = new Map<string, Promise<{ body: WheelResponse; status: number }>>();
const completedWheelAwards = new Map<string, WheelRewardId>();

type ValidWaitlistRequest = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  sourcePage: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validationError(message: string) {
  return NextResponse.json(
    { ok: false, code: "VALIDATION_ERROR", message },
    { status: 400 }
  );
}

function normalizeIndianMobile(value: string) {
  if (!/^[+\d\s()-]+$/.test(value)) return null;

  let digits = value.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }

  return /^[6-9]\d{9}$/.test(digits) ? `+91${digits}` : null;
}

function parseBody(body: WaitlistRequest): ValidWaitlistRequest | string {
  const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
  if (!fullName || fullName.length > 100) {
    return "Enter a valid full name.";
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return "Enter a valid email address.";
  }

  const phone = typeof body.phone === "string" ? normalizeIndianMobile(body.phone.trim()) : null;
  if (!phone) {
    return "Enter a valid 10-digit Indian mobile number.";
  }

  const city = typeof body.city === "string" ? body.city.trim() : "";
  if (city.length > 100) {
    return "City must be 100 characters or fewer.";
  }

  if (body.consent !== true) {
    return "Consent is required to join the waitlist.";
  }

  const requestedSource = typeof body.sourcePage === "string" ? body.sourcePage : "/";
  const sourcePage =
    requestedSource.startsWith("/") &&
    !requestedSource.startsWith("//") &&
    !requestedSource.includes("?") &&
    !requestedSource.includes("#") &&
    requestedSource.length <= 200
      ? requestedSource
      : "/";

  return { fullName, email, phone, city, sourcePage };
}

function safeHubSpotCategory(payload: unknown) {
  if (!payload || typeof payload !== "object") return undefined;
  const data = payload as Record<string, unknown>;
  const category = data.category ?? data.errorType ?? data.status;
  return typeof category === "string" ? category.slice(0, 80) : undefined;
}

function normalizeSourcePage(value: unknown) {
  const requestedSource = typeof value === "string" ? value : "/";
  return requestedSource.startsWith("/") &&
    !requestedSource.startsWith("//") &&
    !requestedSource.includes("?") &&
    !requestedSource.includes("#") &&
    requestedSource.length <= 200
    ? requestedSource
    : "/";
}

function hubSpotSubmissionUrl(formId: string) {
  return `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${formId}`;
}

async function submitToHubSpot(
  url: string,
  fields: Array<{ name: string; value: string }>,
  sourcePage: string,
  pageName: string
): Promise<HubSpotSubmissionResult> {
  try {
    const hubSpotResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: absoluteUrl(sourcePage),
          pageName
        }
      }),
      cache: "no-store"
    });

    if (!hubSpotResponse.ok) {
      let category: string | undefined;
      try {
        category = safeHubSpotCategory(await hubSpotResponse.json());
      } catch {
        category = undefined;
      }
      console.error("HubSpot waitlist submission failed", {
        status: hubSpotResponse.status,
        category,
        flow: pageName
      });
      return { ok: false, status: hubSpotResponse.status };
    }

    return { ok: true };
  } catch {
    console.error("HubSpot waitlist submission failed", { status: "NETWORK_ERROR", flow: pageName });
    return { ok: false, status: 0 };
  }
}

async function findExistingWheelReward(email: string) {
  try {
    const response = await fetch(HUBSPOT_CONTACT_SEARCH_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HUBSPOT_PRIVATE_APP_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        filterGroups: [{
          filters: [{ propertyName: "email", operator: "EQ", value: email }]
        }],
        properties: [WHEEL_REWARD_PROPERTY],
        limit: 1
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      let category: string | undefined;
      try {
        category = safeHubSpotCategory(await response.json());
      } catch {
        category = undefined;
      }
      console.error("HubSpot reward lookup failed", { status: response.status, category });
      return { ok: false as const };
    }

    const payload = await response.json() as {
      results?: Array<{ properties?: Record<string, string | null | undefined> }>;
    };
    const savedReward = payload.results?.[0]?.properties?.[WHEEL_REWARD_PROPERTY]?.trim();
    return { ok: true as const, savedReward: savedReward || undefined };
  } catch {
    console.error("HubSpot reward lookup failed", { status: "NETWORK_ERROR" });
    return { ok: false as const };
  }
}

function currentRewardId(value: string | undefined) {
  if (!value || !Object.prototype.hasOwnProperty.call(wheelRewardIndex, value)) return undefined;
  return value as WheelRewardId;
}

function rememberCompletedWheelAward(email: string, rewardId: WheelRewardId) {
  if (completedWheelAwards.size >= 1_000) {
    const oldestEmail = completedWheelAwards.keys().next().value;
    if (oldestEmail) completedWheelAwards.delete(oldestEmail);
  }
  completedWheelAwards.set(email, rewardId);
}

async function awardRewardWheel(email: string, sourcePage: string) {
  const cachedRewardId = completedWheelAwards.get(email);
  if (cachedRewardId) {
    return {
      body: { ok: true, alreadySpun: true, rewardId: cachedRewardId } satisfies WheelResponse,
      status: 200
    };
  }

  const lookup = await findExistingWheelReward(email);
  if (!lookup.ok) {
    return {
      body: { ok: false, code: "LOOKUP_FAILED" } satisfies WheelResponse,
      status: 502
    };
  }

  if (lookup.savedReward) {
    const rewardId = currentRewardId(lookup.savedReward);
    if (rewardId) rememberCompletedWheelAward(email, rewardId);
    return {
      body: { ok: true, alreadySpun: true, ...(rewardId ? { rewardId } : {}) } satisfies WheelResponse,
      status: 200
    };
  }

  const reward = selectWeightedReward();
  const submission = await submitToHubSpot(
    hubSpotSubmissionUrl(WHEEL_FORM_ID as string),
    [
      { name: "email", value: email },
      { name: "consent", value: "true" },
      { name: WHEEL_SOURCE_PROPERTY, value: "reward_wheel" },
      { name: WHEEL_REWARD_PROPERTY, value: reward.id }
    ],
    sourcePage,
    "Khao Better reward wheel"
  );

  if (!submission.ok) {
    return {
      body: { ok: false, code: "SUBMISSION_FAILED" } satisfies WheelResponse,
      status: 502
    };
  }

  rememberCompletedWheelAward(email, reward.id);
  return {
    body: { ok: true, alreadySpun: false, rewardId: reward.id } satisfies WheelResponse,
    status: 200
  };
}

async function submitRewardWheel(body: WaitlistRequest) {
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !emailPattern.test(email)) {
    return validationError("Enter a valid email address.");
  }
  if (body.consent !== true) {
    return validationError("Consent is required to unlock the reward wheel.");
  }
  if (!WHEEL_FORM_ID || !HUBSPOT_PRIVATE_APP_ACCESS_TOKEN) {
    const missing = [
      ...(!WHEEL_FORM_ID ? ["HUBSPOT_WHEEL_FORM_ID"] : []),
      ...(!HUBSPOT_PRIVATE_APP_ACCESS_TOKEN ? ["HUBSPOT_PRIVATE_APP_ACCESS_TOKEN"] : [])
    ];
    console.error("HubSpot reward wheel is not configured", { missing });
    return NextResponse.json(
      { ok: false, code: "CONFIGURATION_REQUIRED" },
      { status: 503 }
    );
  }

  const existingRequest = pendingWheelAwards.get(email);
  if (existingRequest) {
    const result = await existingRequest;
    return NextResponse.json(result.body, { status: result.status });
  }

  const request = awardRewardWheel(email, normalizeSourcePage(body.sourcePage));
  pendingWheelAwards.set(email, request);
  try {
    const result = await request;
    return NextResponse.json(result.body, { status: result.status });
  } finally {
    if (pendingWheelAwards.get(email) === request) pendingWheelAwards.delete(email);
  }
}

export async function POST(request: Request) {
  let body: WaitlistRequest;

  try {
    body = (await request.json()) as WaitlistRequest;
  } catch {
    return validationError("Invalid request body.");
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return validationError("Invalid request body.");
  }

  // Bots commonly fill fields that are visually hidden from people. Return a
  // generic success so the endpoint does not reveal how the trap works.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (body.flow === "reward-wheel") {
    return submitRewardWheel(body);
  }

  const parsed = parseBody(body);
  if (typeof parsed === "string") {
    return validationError(parsed);
  }

  const fields = [
    { name: "firstname", value: parsed.fullName },
    { name: "email", value: parsed.email },
    { name: "mobilephone", value: parsed.phone },
    ...(parsed.city ? [{ name: "city", value: parsed.city }] : []),
    { name: "consent", value: "true" }
  ];

  const submission = await submitToHubSpot(
    hubSpotSubmissionUrl(WAITLIST_FORM_ID),
    fields,
    parsed.sourcePage,
    "Khao Better waitlist"
  );
  return submission.ok
    ? NextResponse.json({ ok: true })
    : NextResponse.json({ ok: false, code: "SUBMISSION_FAILED" }, { status: 502 });
}
