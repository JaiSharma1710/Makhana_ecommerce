export const SITE_URL = "https://www.khaobetter.shop";
export const SITE_HOSTNAME = new URL(SITE_URL).hostname;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `${SITE_URL}/` : `${SITE_URL}${normalizedPath}`;
}

export const defaultOpenGraphImages = [
  {
    url: absoluteUrl("/assets/pack-classic.jpg"),
    width: 1122,
    height: 1402,
    alt: "Khao Better Classic Roasted makhana pack",
    type: "image/jpeg"
  }
];
