const HOST = "www.khaobetter.shop";
const KEY = "4f4d98c1fc0746afabdeab2668fa0c34";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const DEFAULT_URLS = [
  "https://www.khaobetter.shop/",
  "https://www.khaobetter.shop/shop",
  "https://www.khaobetter.shop/why-makhana",
  "https://www.khaobetter.shop/our-story",
  "https://www.khaobetter.shop/makhana-classic-roasted",
  "https://www.khaobetter.shop/blog",
  "https://www.khaobetter.shop/blog/makhana-weight-loss",
  "https://www.khaobetter.shop/blog/makhana-vs-popcorn-vs-chips",
  "https://www.khaobetter.shop/blog/makhana-nutrition-facts",
  "https://www.khaobetter.shop/office-snacks",
  "https://www.khaobetter.shop/student-snacks",
  "https://www.khaobetter.shop/delhi",
];

const DISALLOWED_PATHS = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
]);

function validateUrl(rawUrl) {
  let url;

  try {
    url = new URL(rawUrl);
  } catch {
    throw new Error(`Invalid URL: ${rawUrl}`);
  }

  if (url.protocol !== "https:") {
    throw new Error(`Only https URLs are allowed: ${rawUrl}`);
  }

  if (url.hostname !== HOST) {
    throw new Error(`Only ${HOST} URLs are allowed: ${rawUrl}`);
  }

  if (url.pathname.startsWith("/api/")) {
    throw new Error(`API routes must not be submitted: ${rawUrl}`);
  }

  if (DISALLOWED_PATHS.has(url.pathname)) {
    throw new Error(`This file must not be submitted: ${rawUrl}`);
  }

  return url.toString();
}

const rawUrls = process.argv.slice(2);
const urlsToSubmit = rawUrls.length > 0 ? rawUrls : DEFAULT_URLS;
const urlList = [...new Set(urlsToSubmit.map(validateUrl))];

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

console.log(`IndexNow response status: ${response.status}`);

if (response.ok) {
  console.log(`Success: submitted ${urlList.length} URL(s).`);
} else {
  const body = await response.text();
  console.error(`Failure: IndexNow rejected the submission.${body ? ` ${body}` : ""}`);
  process.exitCode = 1;
}
