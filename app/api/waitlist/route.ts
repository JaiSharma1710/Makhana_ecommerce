import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/site";

const HUBSPOT_SUBMISSION_URL =
  "https://api.hsforms.com/submissions/v3/integration/submit/247314933/d749ed3e-7ce7-4f60-bf48-76723b1a7902";

type WaitlistRequest = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  city?: unknown;
  consent?: unknown;
  website?: unknown;
  sourcePage?: unknown;
};

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

  try {
    const hubSpotResponse = await fetch(HUBSPOT_SUBMISSION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: absoluteUrl(parsed.sourcePage),
          pageName: "Khao Better waitlist"
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
        category
      });
      return NextResponse.json(
        { ok: false, code: "SUBMISSION_FAILED" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    console.error("HubSpot waitlist submission failed", { status: "NETWORK_ERROR" });
    return NextResponse.json(
      { ok: false, code: "SUBMISSION_FAILED" },
      { status: 502 }
    );
  }
}
