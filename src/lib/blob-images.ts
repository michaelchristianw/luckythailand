const blobBaseUrl = process.env.NEXT_PUBLIC_BLOB_BASE_URL?.replace(/\/+$/, "");

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//i.test(value);
}

export function getBlobPathnameFromUrl(urlOrPath: string) {
  if (!urlOrPath) return "";

  if (isAbsoluteUrl(urlOrPath)) {
    try {
      return decodeURIComponent(new URL(urlOrPath).pathname).replace(
        /^\/+/,
        ""
      );
    } catch {
      return urlOrPath;
    }
  }

  return urlOrPath.split("?")[0]?.split("#")[0]?.replace(/^\/+/, "") ?? "";
}

export function getAssetUrl(pathOrUrl: string) {
  if (!pathOrUrl || isAbsoluteUrl(pathOrUrl) || pathOrUrl.startsWith("data:")) {
    return pathOrUrl;
  }

  const pathname = getBlobPathnameFromUrl(pathOrUrl);
  if (!blobBaseUrl) return `/${pathname}`;

  return `${blobBaseUrl}/${pathname}`;
}

export function getProductSlugFromImageUrl(urlOrPath: string) {
  const pathname = getBlobPathnameFromUrl(urlOrPath);
  return (
    pathname
      .split("/")
      .pop()
      ?.replace(/\.[^/.]+$/, "") ?? ""
  );
}
