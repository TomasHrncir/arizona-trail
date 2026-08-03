export function FlagRays({ className = "" }: { className?: string }) {
  const rays = 13;
  return (
    <svg
      viewBox="0 0 800 400"
      className={className}
      preserveAspectRatio="xMidYMax slice"
    >
      <defs>
        <linearGradient id="rayGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#CE1126" />
          <stop offset="100%" stopColor="#FFB612" />
        </linearGradient>
      </defs>
      {Array.from({ length: rays }).map((_, i) => {
        const isRed = i % 2 === 0;
        const angle = -90 + (i * 180) / (rays - 1);
        const cx = 400;
        const cy = 400;
        const r = 900;
        const spread = 180 / rays / 2;
        const a1 = ((angle - spread) * Math.PI) / 180;
        const a2 = ((angle + spread) * Math.PI) / 180;
        const p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
        const p2 = [cx + r * Math.cos(a2), cy + r * Math.sin(a2)];
        return (
          <polygon
            key={i}
            points={`${cx},${cy} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`}
            fill={isRed ? "#CE1126" : "#FFB612"}
            opacity={isRed ? 0.9 : 0.85}
          />
        );
      })}
      <circle cx={400} cy={400} r={110} fill="#FFB612" />
      <circle cx={400} cy={400} r={70} fill="#CE1126" />
    </svg>
  );
}
