/**
 * The vivid Monument Valley poster sky: gradient bands, a huge sun,
 * scattered stars in the upper night portion, and a subtle cloud stripe.
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
          <stop offset="0%" stopColor="#FFE07A" />
          <stop offset="40%" stopColor="#FF9E3A" />
          <stop offset="80%" stopColor="#FF6A1E" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF4E1E" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sun-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFC145" />
          <stop offset="60%" stopColor="#FF7A1A" />
          <stop offset="100%" stopColor="#E64512" />
        </linearGradient>
      </defs>

      {/* Stars (upper portion) */}
      <g fill="#FFF6D8">
        {STAR_POSITIONS.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={0.75 + (i % 3) * 0.08} />
        ))}
      </g>

      {/* Sun glow */}
      <circle cx="800" cy="280" r="340" fill="url(#sun-glow)" opacity="0.7" />
      {/* Sun body */}
      <circle cx="800" cy="280" r="145" fill="url(#sun-body)" />
      {/* Sun highlight */}
      <ellipse cx="770" cy="240" rx="55" ry="28" fill="#FFE9AA" opacity="0.6" />

      {/* Cloud stripes (thin coral-turquoise bands) */}
      <g>
        <path
          d="M0 170 Q 400 150 800 170 T 1600 165 L 1600 195 Q 1200 175 800 200 T 0 195 Z"
          fill="#5FD9E0"
          opacity="0.7"
        />
        <path
          d="M0 400 Q 500 385 1000 410 T 1600 400 L 1600 425 Q 1200 410 800 430 T 0 425 Z"
          fill="#FF88A6"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

const STAR_POSITIONS: [number, number, number][] = [
  [80, 40, 1.6], [180, 90, 1.1], [270, 60, 1.8], [360, 30, 1.3],
  [440, 100, 1.5], [520, 55, 1.1], [610, 90, 1.7], [700, 45, 1.2],
  [900, 60, 1.4], [980, 100, 1.6], [1080, 45, 1.2], [1170, 90, 1.8],
  [1260, 50, 1.3], [1340, 100, 1.5], [1440, 60, 1.6], [1520, 100, 1.2],
  [120, 160, 1.1], [340, 180, 1.4], [560, 170, 1.2], [780, 190, 1.5],
  [1000, 175, 1.1], [1220, 185, 1.3], [1440, 175, 1.6],
];
