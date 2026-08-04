/**
 * Turn a normal Instagram Reel/post permalink into the /embed URL.
 * Preserves the original path type (/p/ posts stay /p/, /reel/ reels stay /reel/).
 * Accepts:
 *   https://www.instagram.com/username/reel/SHORTCODE/
 *   https://www.instagram.com/reel/SHORTCODE/
 *   https://www.instagram.com/p/SHORTCODE/
 */
export function toInstagramEmbedUrl(url: string): string {
  const m = url.match(/\/(reel|reels|p)\/([^\/?#]+)/i);
  if (!m) return url;
  const kind = m[1].toLowerCase() === "reels" ? "reel" : m[1].toLowerCase();
  return `https://www.instagram.com/${kind}/${m[2]}/embed/captioned`;
}
