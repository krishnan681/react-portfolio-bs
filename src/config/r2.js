// Cloudflare R2 CDN Configuration
// Replace with your custom domain (e.g. 'https://media.yourdomain.com') or your public R2 URL (e.g. 'https://pub-xxxxxx.r2.dev')
export const R2_BASE_URL = (
  import.meta.env.VITE_R2_BASE_URL || "https://pub-929e0750c1ea49e9bf9b05c56df33240.r2.dev"
).replace(/\/+$/, "");

/**
 * Returns the full Cloudflare R2 URL for a given asset path.
 * If the path is already a full URL or blob, returns it as-is.
 * If path is missing, returns fallback or empty string.
 */
export const getR2Url = (path) => {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${R2_BASE_URL}/${cleanPath}`;
};

export default getR2Url;
