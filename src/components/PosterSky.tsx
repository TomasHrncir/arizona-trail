/**
 * Muted mid-century desert sky: sage background with cream cloud bands,
 * an off-center warm sun with a soft glow, and a few distant bird silhouettes.
 */
export function PosterSky({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E67E3A" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#E67E3A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#E67E3A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sun glow (soft, big) */}
      <circle cx="1080" cy="220" r="280" fill="url(#sun-glow)" />
      {/* Sun body — moved to ~68% left, above the middle-right butte */}
      <circle cx="1080" cy="220" r="72" fill="#E67E3A" />
      {/* Tiny inner highlight for depth */}
      <ellipse cx="1058" cy="196" rx="26" ry="14" fill="#F7B268" opacity="0.65" />

      {/* Cream cloud bands — flat, slightly organic */}
      <g fill="#EFE3C4">
        <path d="M60 200 Q 260 178 460 200 Q 620 220 780 200 L 780 220 Q 620 240 460 220 Q 260 198 60 220 Z" opacity="0.85" />
        <path d="M240 380 Q 460 358 680 380 Q 820 396 960 380 L 960 400 Q 820 416 680 400 Q 460 380 240 400 Z" opacity="0.7" />
      </g>

      {/* Distant birds — small V silhouettes, cluster of 3 */}
      <g
        stroke="#3E5A45"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      >
        <path d="M 420 300 q 6 -6 12 0 q 6 -6 12 0" />
        <path d="M 470 320 q 5 -5 10 0 q 5 -5 10 0" />
        <path d="M 510 290 q 5 -5 10 0 q 5 -5 10 0" />
      </g>
    </svg>
  );
}
