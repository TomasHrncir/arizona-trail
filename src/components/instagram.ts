/**
 * Turn a normal Instagram Reel/post permalink into the /embed URL.
 * Accepts:
 *   https://www.instagram.com/username/reel/SHORTCODE/
 *   https://www.instagram.com/reel/SHORTCODE/
 *   https://www.instagram.com/p/SHORTCODE/
 */
export function toInstagramEmbedUrl(url: string): string {
  const m = url.match(/\/(?:reel|reels|p)\/([^\/?#]+)/i);
  if (!m) return url;
  return `https://www.instagram.com/reel/${m[1]}/embed/captioned`;
}
