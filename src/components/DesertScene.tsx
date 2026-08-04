import { motion } from "framer-motion";
import { Cow } from "./Cow";

/**
 * Mid-century minimalist desert.
 * Flat layered mountains (purple back, orange mid, burnt-sienna front),
 * a warm sandy ground plane, and dark-green saguaros + small shrubs.
 * Cacti gently sway (animation preserved).
 */

const CACTUS_FILL = "#3D5F3A";
const CACTUS_LITE = "#547A4E";
const CACTUS_SPINE = "rgba(20, 40, 22, 0.45)";
const SHRUB_FILL = "#3E5A45";

export function DesertScene({
  className = "",
  onCowClick,
}: {
  className?: string;
  onCowClick?: () => void;
}) {
  return (
    <svg
      viewBox="0 0 1600 620"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      {/* Distant purple-mauve range (furthest layer) */}
      <path
        d="M0 300 L120 260 L240 310 L400 240 L520 300 L680 250 L840 310 L980 260 L1160 300 L1320 250 L1460 300 L1600 270 L1600 500 L0 500 Z"
        fill="#8B5F76"
      />

      {/* Mid orange range */}
      <path
        d="M0 380 L180 320 L340 380 L500 330 L680 400 L860 340 L1040 400 L1220 340 L1400 400 L1600 360 L1600 500 L0 500 Z"
        fill="#D67A3A"
      />

      {/* Front burnt-sienna range */}
      <path
        d="M0 440 L220 380 L400 450 L580 400 L780 460 L980 400 L1180 460 L1380 400 L1600 450 L1600 500 L0 500 Z"
        fill="#A6421E"
      />

      {/* Warm sandy ground */}
      <path d="M0 500 L1600 500 L1600 620 L0 620 Z" fill="#D9944A" />

      {/* Subtle sand-shadow just under the front range */}
      <path
        d="M0 505 Q 400 495 800 505 T 1600 500 L 1600 520 Q 1200 512 800 520 T 0 518 Z"
        fill="#B67130"
        opacity="0.55"
      />

      <g>
        {/* Saguaros in front of mountains */}
        <Saguaro x={200} baseY={555} scale={1.05} arms={2} phase={0.1} />
        <Saguaro x={430} baseY={550} scale={1.35} arms={3} phase={0.5} />
        <Saguaro x={720} baseY={555} scale={0.9} arms={2} phase={0.9} />
        <Saguaro x={980} baseY={548} scale={1.25} arms={3} phase={0.3} />
        <Saguaro x={1210} baseY={555} scale={1.0} arms={2} phase={0.7} />
        <Saguaro x={1420} baseY={555} scale={1.1} arms={3} phase={1.1} />

        {/* Lone cow between saguaros — stares, tail wags, ear twitches */}
        <Cow x={870} baseY={578} scale={1.15} flip={false} onClick={onCowClick} />

        {/* Small dark-green shrubs (foreground clumps) */}
        <Shrub x={90} baseY={600} scale={1.1} />
        <Shrub x={310} baseY={605} scale={0.85} />
        <Shrub x={560} baseY={608} scale={1.0} />
        <Shrub x={830} baseY={610} scale={0.95} />
        <Shrub x={1100} baseY={606} scale={1.05} />
        <Shrub x={1330} baseY={610} scale={0.9} />
        <Shrub x={1540} baseY={605} scale={1.0} />
      </g>
    </svg>
  );
}

/* ---------------- Saguaro ---------------- */

function Saguaro({
  x,
  baseY,
  scale = 1,
  arms = 2,
  phase = 0,
}: {
  x: number;
  baseY: number;
  scale?: number;
  arms?: 0 | 1 | 2 | 3 | 4;
  phase?: number;
}) {
  const trunkH = 175;
  const trunkW = 28;

  const armConfigs: {
    side: "L" | "R";
    startY: number;
    height: number;
    reach: number;
  }[] = [
    { side: "L", startY: 0.55, height: 0.55, reach: 32 },
    { side: "R", startY: 0.72, height: 0.5, reach: 30 },
    { side: "L", startY: 0.86, height: 0.3, reach: 24 },
    { side: "R", startY: 0.4, height: 0.28, reach: 22 },
  ];

  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${baseY}px` }}
      animate={{ rotate: [-0.6, 0.6, -0.6] }}
      transition={{
        duration: 6 + phase * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: phase,
      }}
    >
      <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
        <path
          d={`M ${-trunkW / 2} 0
              L ${-trunkW / 2} ${-trunkH + trunkW / 2}
              A ${trunkW / 2} ${trunkW / 2} 0 0 1 ${trunkW / 2} ${-trunkH + trunkW / 2}
              L ${trunkW / 2} 0 Z`}
          fill={CACTUS_FILL}
        />
        {/* subtle highlight on the left edge */}
        <rect
          x={-trunkW / 2 + 3}
          y={-trunkH + trunkW / 2 + 4}
          width={4}
          height={trunkH - trunkW / 2 - 6}
          fill={CACTUS_LITE}
          opacity="0.5"
        />
        {/* ribs */}
        {[-9, -3, 3, 9].map((rx) => (
          <line
            key={rx}
            x1={rx}
            y1={-trunkH + 28}
            x2={rx}
            y2={-6}
            stroke={CACTUS_SPINE}
            strokeWidth={1.2}
          />
        ))}

        {armConfigs.slice(0, arms).map((cfg, i) => (
          <SaguaroArm
            key={i}
            side={cfg.side}
            trunkW={trunkW}
            trunkH={trunkH}
            startYRatio={cfg.startY}
            heightRatio={cfg.height}
            reach={cfg.reach}
          />
        ))}
      </g>
    </motion.g>
  );
}

function SaguaroArm({
  side,
  trunkW,
  trunkH,
  startYRatio,
  heightRatio,
  reach,
}: {
  side: "L" | "R";
  trunkW: number;
  trunkH: number;
  startYRatio: number;
  heightRatio: number;
  reach: number;
}) {
  const armW = 18;
  const dir = side === "L" ? -1 : 1;
  const attachX = dir * (trunkW / 2 - 2);
  const startY = -trunkH * startYRatio;
  const armH = trunkH * heightRatio;
  const bendY = startY + 6;
  const outerX = attachX + dir * reach;
  const topY = startY - armH;

  return (
    <path
      d={`
        M ${attachX} ${startY - armW / 2}
        Q ${attachX + dir * (reach * 0.4)} ${startY - armW / 2 - 2}
          ${outerX - dir * armW / 2} ${startY - armW / 2}
        L ${outerX - dir * armW / 2} ${topY + armW / 2}
        A ${armW / 2} ${armW / 2} 0 0 ${side === "L" ? 0 : 1}
          ${outerX + dir * armW / 2} ${topY + armW / 2}
        L ${outerX + dir * armW / 2} ${bendY + armW / 2}
        Q ${outerX + dir * armW / 2} ${bendY + armW * 1.6}
          ${attachX} ${startY + armW / 2}
        Z
      `}
      fill={CACTUS_FILL}
    />
  );
}

/* ---------------- Little shrub cluster ---------------- */

function Shrub({
  x,
  baseY,
  scale = 1,
}: {
  x: number;
  baseY: number;
  scale?: number;
}) {
  // 5-6 slender leaves radiating from a base — like an agave silhouette
  // but in dark forest green so it blends with the mid-century look.
  const leaves = [
    { angle: -60, length: 22 },
    { angle: -30, length: 30 },
    { angle: 0, length: 34 },
    { angle: 30, length: 30 },
    { angle: 60, length: 22 },
    { angle: -85, length: 15 },
    { angle: 85, length: 15 },
  ];
  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
      {leaves.map((l, i) => {
        const rad = (l.angle * Math.PI) / 180;
        const tipX = Math.sin(rad) * l.length;
        const tipY = -Math.cos(rad) * l.length;
        return (
          <path
            key={i}
            d={`M 0 0 L ${tipX - 2} ${tipY + 2} L ${tipX} ${tipY} L ${tipX + 2} ${tipY + 2} Z`}
            fill={SHRUB_FILL}
          />
        );
      })}
    </g>
  );
}
