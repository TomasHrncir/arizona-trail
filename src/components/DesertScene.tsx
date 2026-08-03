export function DesertScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 500"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="dune1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9A55C" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
        <linearGradient id="dune2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4C39A" />
          <stop offset="100%" stopColor="#D9A55C" />
        </linearGradient>
      </defs>
      {/* Distant mountains */}
      <path
        d="M0 320 L200 220 L360 280 L520 210 L720 300 L900 200 L1080 280 L1280 220 L1600 300 L1600 500 L0 500 Z"
        fill="#6B2A5A"
        opacity="0.7"
      />
      {/* Middle dune */}
      <path
        d="M0 380 Q400 300 800 360 T1600 340 L1600 500 L0 500 Z"
        fill="url(#dune1)"
      />
      {/* Front dune */}
      <path
        d="M0 450 Q400 400 900 440 T1600 430 L1600 500 L0 500 Z"
        fill="url(#dune2)"
      />
      {/* Saguaros */}
      <g fill="#3E5D2A" opacity="0.9">
        <SaguaroSVG x={150} scale={1.1} />
        <SaguaroSVG x={420} scale={0.7} />
        <SaguaroSVG x={780} scale={1.3} />
        <SaguaroSVG x={1150} scale={0.9} />
        <SaguaroSVG x={1420} scale={1.05} />
      </g>
    </svg>
  );
}

function SaguaroSVG({ x, scale = 1 }: { x: number; scale?: number }) {
  const baseY = 440;
  const h = 130 * scale;
  const w = 24 * scale;
  return (
    <g transform={`translate(${x}, ${baseY}) scale(${scale})`}>
      <rect x={-w / 2} y={-h} width={w} height={h} rx={w / 2} />
      <rect x={-w / 2 - 22} y={-h * 0.55} width={w * 0.8} height={h * 0.4} rx={w / 2} />
      <rect x={-w / 2 - 22} y={-h * 0.6} width={w * 0.8} height={12} rx={w / 2} />
      <rect x={w / 2 + 4} y={-h * 0.7} width={w * 0.8} height={h * 0.5} rx={w / 2} />
      <rect x={w / 2 + 4} y={-h * 0.75} width={w * 0.8} height={12} rx={w / 2} />
    </g>
  );
}
