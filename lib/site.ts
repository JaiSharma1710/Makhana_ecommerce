export const SITE_URL = "https://www.khaobetter.shop";
export const SITE_HOSTNAME = new URL(SITE_URL).hostname;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;
}
