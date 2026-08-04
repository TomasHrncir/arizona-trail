/**
 * A hand-coded muted Arizona desert backdrop — fully SVG, no image assets.
 * Meant to sit behind all content: sky + sun + rocks + saguaros + floor,
 * all in low-contrast, low-opacity paint so tiles and titles read clearly.
 *
 * Fills the full viewport via `preserveAspectRatio="xMidYMid slice"`.
 */
export function MutedDesert({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Sky (top ~55%) */}
      <rect x="0" y="0" width="1600" height="500" fill="#7A9A94" />
      {/* Subtle sky depth gradient for a slightly darker upper band */}
      <defs>
        <linearGradient id="sky-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#617d78" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#7A9A94" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="floor-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A6906E" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#C9B79A" stopOpacity="0" />
          <stop offset="100%" stopColor="#B39A78" stopOpacity="0.25" />
        </linearGradient>
        <radialGradient id="sun-body" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D9A05B" stopOpacity="0.45" />
          <stop offset="70%" stopColor="#D9A05B" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#D9A05B" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="center-scrim" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.18" />
          <stop offset="70%" stopColor="#000" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="1600" height="500" fill="url(#sky-depth)" />

      {/* Sun (large, dusty orange, centered above title area) */}
      <circle cx="800" cy="300" r="220" fill="url(#sun-body)" />

      {/* Faded horizontal ray streaks over the sun */}
      <g fill="#EDDFB4" opacity="0.10">
        <ellipse cx="800" cy="255" rx="380" ry="6" />
        <ellipse cx="800" cy="305" rx="440" ry="8" />
        <ellipse cx="800" cy="355" rx="380" ry="6" />
      </g>

      {/* Back mountain layer — dusty rose, low silhouette across horizon */}
      <path
        d="M0 460
           L120 400 L260 450 L400 395 L560 440
           L720 405 L880 445 L1040 400 L1200 445
           L1360 405 L1600 435
           L1600 520 L0 520 Z"
        fill="#B8877A"
        opacity="0.30"
      />

      {/* Front mountain layer — terracotta, slightly taller & wider peaks */}
      <path
        d="M0 495
           L160 445 L340 490 L520 440 L700 495
           L900 445 L1080 490 L1260 445 L1440 490
           L1600 465
           L1600 540 L0 540 Z"
        fill="#A66E55"
        opacity="0.40"
      />

      {/* Desert floor (bottom ~45%) */}
      <rect x="0" y="500" width="1600" height="400" fill="#C9B79A" />
      <rect x="0" y="500" width="1600" height="400" fill="url(#floor-shade)" />

      {/* Saguaros — left edge cluster */}
      <g fill="#5C4A3D" opacity="0.35">
        <Saguaro x={70} baseY={560} scale={1.05} arms="LR" />
        <Saguaro x={170} baseY={575} scale={0.75} arms="L" />
        <Saguaro x={260} baseY={565} scale={0.9} arms="R" />
      </g>
      {/* Saguaros — right edge cluster */}
      <g fill="#5C4A3D" opacity="0.35">
        <Saguaro x={1360} baseY={570} scale={0.85} arms="R" />
        <Saguaro x={1480} baseY={560} scale={1.1} arms="LR" />
        <Saguaro x={1560} baseY={585} scale={0.7} arms="L" />
      </g>

      {/* A few small bushes scattered along the floor */}
      <g fill="#5C4A3D" opacity="0.22">
        <Bush x={340} baseY={680} scale={0.9} />
        <Bush x={520} baseY={720} scale={0.7} />
        <Bush x={1100} baseY={700} scale={0.8} />
        <Bush x={1280} baseY={740} scale={0.9} />
        <Bush x={90} baseY={760} scale={1.0} />
        <Bush x={1520} baseY={760} scale={0.95} />
      </g>

      {/* Central radial scrim to keep tile area readable */}
      <rect x="0" y="0" width="1600" height="900" fill="url(#center-scrim)" />
    </svg>
  );
}

/* --- helpers --- */

function Saguaro({
  x,
  baseY,
  scale = 1,
  arms = "LR",
}: {
  x: number;
  baseY: number;
  scale?: number;
  arms?: "" | "L" | "R" | "LR";
}) {
  const h = 140;
  const w = 20;
  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
      {/* trunk */}
      <path
        d={`M ${-w / 2} 0
            L ${-w / 2} ${-h + w / 2}
            A ${w / 2} ${w / 2} 0 0 1 ${w / 2} ${-h + w / 2}
            L ${w / 2} 0 Z`}
      />
      {arms.includes("L") && (
        <path
          d={`M ${-w / 2} ${-h * 0.55}
              L ${-w / 2 - 22} ${-h * 0.55}
              L ${-w / 2 - 22} ${-h * 0.9}
              A ${8} ${8} 0 0 1 ${-w / 2 - 22 + 16} ${-h * 0.9}
              L ${-w / 2 - 22 + 16} ${-h * 0.6}
              L ${-w / 2} ${-h * 0.4} Z`}
        />
      )}
      {arms.includes("R") && (
        <path
          d={`M ${w / 2} ${-h * 0.7}
              L ${w / 2 + 20} ${-h * 0.7}
              L ${w / 2 + 20} ${-h * 0.98}
              A ${8} ${8} 0 0 1 ${w / 2 + 20 + 16} ${-h * 0.98}
              L ${w / 2 + 20 + 16} ${-h * 0.75}
              L ${w / 2} ${-h * 0.55} Z`}
        />
      )}
    </g>
  );
}

function Bush({
  x,
  baseY,
  scale = 1,
}: {
  x: number;
  baseY: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
      <ellipse cx={0} cy={0} rx={22} ry={8} />
      <ellipse cx={-10} cy={-6} rx={12} ry={7} />
      <ellipse cx={12} cy={-4} rx={10} ry={6} />
      <ellipse cx={0} cy={-10} rx={9} ry={5} />
    </g>
  );
}
