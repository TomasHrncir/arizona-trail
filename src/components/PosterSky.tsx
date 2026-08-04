/**
 * Muted mid-century desert sky: sage background with cream cloud bands
 * and a small warm orange sun. No stars, no glow — the vibe is quiet.
 */
export function PosterSky({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Small warm sun */}
      <circle cx="1250" cy="180" r="70" fill="#E67E3A" />

      {/* Cream cloud bands — flat, slightly organic */}
      <g fill="#EFE3C4">
        <path d="M60 200 Q 260 178 460 200 Q 620 220 780 200 L 780 220 Q 620 240 460 220 Q 260 198 60 220 Z" opacity="0.85" />
        <path d="M900 220 Q 1080 198 1260 218 Q 1360 232 1500 218 L 1500 238 Q 1360 252 1260 238 Q 1080 218 900 240 Z" opacity="0.8" />
        <path d="M180 380 Q 400 360 620 380 Q 760 396 900 380 L 900 400 Q 760 416 620 400 Q 400 380 180 400 Z" opacity="0.7" />
      </g>
    </svg>
  );
}
