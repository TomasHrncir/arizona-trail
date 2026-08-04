import { motion } from "framer-motion";

const CACTUS_FILL = "#2E9B4E";
const CACTUS_LITE = "#4EC26B";
const CACTUS_SPINE = "rgba(20, 60, 30, 0.55)";
const AGAVE_FILL = "#1E9BB0";
const AGAVE_LITE = "#3EBAD2";

/**
 * Monument Valley desert scene inspired by the psychedelic poster palette.
 * Layers back to front:
 *   1. Distant purple ridges
 *   2. Bright red-orange Monument Valley mesas (buttes)
 *   3. Sand/trail
 *   4. Saguaros, prickly pears, barrel cacti, ocotillo (mid-ground)
 *   5. Blue agave succulents (foreground)
 */
export function DesertScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 620"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="mesa-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5A1E52" />
          <stop offset="100%" stopColor="#3A0F44" />
        </linearGradient>
        <linearGradient id="mesa-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E56230" />
          <stop offset="50%" stopColor="#C93A1A" />
          <stop offset="100%" stopColor="#8E1E12" />
        </linearGradient>
        <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5B45E" />
          <stop offset="100%" stopColor="#D9762A" />
        </linearGradient>
        <linearGradient id="trail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFDA85" />
          <stop offset="100%" stopColor="#E88F2F" />
        </linearGradient>
      </defs>

      {/* Distant purple ridges */}
      <path
        d="M0 380 L120 310 L260 360 L400 300 L560 350 L720 290 L900 340 L1080 300 L1260 350 L1440 310 L1600 340 L1600 620 L0 620 Z"
        fill="url(#mesa-far)"
        opacity="0.95"
      />

      {/* Monument Valley mesas — bright red columnar buttes */}
      <MesaCluster />

      {/* Warm sand plain */}
      <path
        d="M0 500 Q400 470 800 490 T1600 480 L1600 620 L0 620 Z"
        fill="url(#sand)"
      />

      {/* Curving trail */}
      <path
        d="M780 620
           Q 800 560 750 520
           Q 700 490 760 470
           Q 810 460 820 445
           L 900 445
           L 800 620 Z"
        fill="url(#trail)"
        opacity="0.85"
      />

      {/* Flora layers */}
      <g>
        {/* Mid-ground cacti */}
        <Ocotillo x={70} baseY={555} scale={0.9} phase={0.4} />
        <Saguaro x={220} baseY={550} scale={1.05} arms={3} phase={0.1} />
        <PricklyPear x={340} baseY={565} scale={0.85} />
        <Saguaro x={480} baseY={548} scale={1.4} arms={4} phase={0.6} />
        <Barrel x={600} baseY={572} scale={0.8} />
        <Saguaro x={720} baseY={545} scale={0.9} arms={2} phase={0.9} />
        <Ocotillo x={880} baseY={548} scale={1.1} phase={1.1} />
        <Saguaro x={1020} baseY={545} scale={1.5} arms={3} phase={0.3} />
        <PricklyPear x={1150} baseY={562} scale={1.0} variant={2} />
        <Saguaro x={1280} baseY={548} scale={1.05} arms={2} phase={0.7} />
        <Barrel x={1400} baseY={572} scale={0.9} />
        <Ocotillo x={1520} baseY={555} scale={0.95} phase={1.5} />

        {/* Foreground agaves — the blue succulents from the poster */}
        <Agave x={130} baseY={615} scale={1.15} />
        <Agave x={380} baseY={615} scale={0.9} />
        <Agave x={640} baseY={615} scale={1.05} />
        <Agave x={960} baseY={615} scale={1.2} />
        <Agave x={1240} baseY={615} scale={0.95} />
        <Agave x={1480} baseY={615} scale={1.1} />
      </g>
    </svg>
  );
}

/* ---------------- Monument Valley Mesas ---------------- */

function MesaCluster() {
  return (
    <g fill="url(#mesa-red)">
      {/* Wide left mesa */}
      <path d="M-40 380 L20 340 L180 340 L200 380 L200 510 L-40 510 Z" />
      {/* Tall thin left butte */}
      <path d="M240 320 L280 285 L310 285 L340 320 L340 510 L240 510 Z" />
      {/* Chunky middle-left */}
      <path d="M420 360 L450 330 L560 330 L590 360 L590 510 L420 510 Z" />
      {/* Central skinny buttes */}
      <path d="M690 300 L720 265 L745 265 L770 300 L770 510 L690 510 Z" />
      <path d="M810 340 L830 315 L865 315 L885 340 L885 510 L810 510 Z" />
      {/* Right chunky mesa */}
      <path d="M960 310 L1000 275 L1160 275 L1200 310 L1200 510 L960 510 Z" />
      {/* Right skinny butte */}
      <path d="M1260 355 L1285 325 L1315 325 L1340 355 L1340 510 L1260 510 Z" />
      {/* Far right wide mesa */}
      <path d="M1400 335 L1430 305 L1600 305 L1640 335 L1640 510 L1400 510 Z" />

      {/* Vertical striations for texture */}
      <g stroke="#7A1810" strokeWidth="1.5" fill="none" opacity="0.55">
        <line x1="60" y1="365" x2="60" y2="510" />
        <line x1="120" y1="360" x2="120" y2="510" />
        <line x1="160" y1="360" x2="160" y2="510" />
        <line x1="280" y1="310" x2="280" y2="510" />
        <line x1="480" y1="360" x2="480" y2="510" />
        <line x1="520" y1="355" x2="520" y2="510" />
        <line x1="720" y1="300" x2="720" y2="510" />
        <line x1="1020" y1="300" x2="1020" y2="510" />
        <line x1="1080" y1="295" x2="1080" y2="510" />
        <line x1="1140" y1="295" x2="1140" y2="510" />
        <line x1="1440" y1="325" x2="1440" y2="510" />
        <line x1="1520" y1="320" x2="1520" y2="510" />
        <line x1="1580" y1="320" x2="1580" y2="510" />
      </g>

      {/* Highlights on left edges */}
      <g fill="#F58C4E" opacity="0.5">
        <path d="M20 340 L28 350 L28 505 L20 505 Z" />
        <path d="M280 285 L288 295 L288 505 L280 505 Z" />
        <path d="M720 265 L727 275 L727 505 L720 505 Z" />
        <path d="M1000 275 L1010 285 L1010 505 L1000 505 Z" />
      </g>
    </g>
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
  const trunkW = 26;

  const armConfigs: {
    side: "L" | "R";
    startY: number;
    height: number;
    reach: number;
  }[] = [
    { side: "L", startY: 0.55, height: 0.55, reach: 30 },
    { side: "R", startY: 0.72, height: 0.5, reach: 28 },
    { side: "L", startY: 0.86, height: 0.3, reach: 22 },
    { side: "R", startY: 0.4, height: 0.28, reach: 20 },
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
        {/* Left-edge highlight */}
        <path
          d={`M ${-trunkW / 2 + 3} 0
              L ${-trunkW / 2 + 3} ${-trunkH + trunkW / 2}
              A ${trunkW / 2 - 3} ${trunkW / 2 - 3} 0 0 1 ${trunkW / 2 - 3} ${-trunkH + trunkW / 2}
              L ${trunkW / 2 - 3} ${-trunkH + trunkW / 2 + 8}
              L ${-trunkW / 2 + 3} ${-trunkH + trunkW / 2 + 8} Z`}
          fill={CACTUS_LITE}
          opacity="0.35"
        />
        {/* Ribs */}
        {[-8, -3, 3, 8].map((rx) => (
          <line
            key={rx}
            x1={rx}
            y1={-trunkH + 26}
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
  const armW = 16;
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

/* ---------------- Prickly Pear ---------------- */

function PricklyPear({
  x,
  baseY,
  scale = 1,
  variant = 1,
}: {
  x: number;
  baseY: number;
  scale?: number;
  variant?: 1 | 2;
}) {
  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${baseY}px` }}
      animate={{ rotate: [-0.5, 0.5, -0.5] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
        <ellipse cx={0} cy={-16} rx={22} ry={24} fill={CACTUS_FILL} />
        <ellipse cx={-18} cy={-44} rx={16} ry={20} fill={CACTUS_FILL} />
        <ellipse cx={20} cy={-48} rx={15} ry={19} fill={CACTUS_FILL} />
        {variant === 2 && (
          <ellipse cx={0} cy={-66} rx={12} ry={16} fill={CACTUS_FILL} />
        )}
        {/* Yellow flower */}
        <circle cx={-18} cy={-60} r={3} fill="#FFCE3E" />
        {variant === 2 && (
          <circle cx={4} cy={-78} r={3} fill="#FFCE3E" />
        )}
        {/* Highlights */}
        <ellipse cx={-6} cy={-24} rx={5} ry={7} fill={CACTUS_LITE} opacity="0.4" />
        <ellipse cx={-22} cy={-50} rx={4} ry={5} fill={CACTUS_LITE} opacity="0.4" />
        <ellipse cx={16} cy={-54} rx={4} ry={5} fill={CACTUS_LITE} opacity="0.4" />
      </g>
    </motion.g>
  );
}

/* ---------------- Barrel Cactus ---------------- */

function Barrel({
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
      <path
        d={`M -24 0
            Q -30 -20 -24 -38
            Q -16 -50 0 -50
            Q 16 -50 24 -38
            Q 30 -20 24 0
            Z`}
        fill={CACTUS_FILL}
      />
      {/* Ribs */}
      {[-16, -8, 0, 8, 16].map((rx) => (
        <path
          key={rx}
          d={`M ${rx} -4 Q ${rx * 1.1} -25 ${rx * 0.85} -44`}
          stroke={CACTUS_SPINE}
          strokeWidth={1.2}
          fill="none"
        />
      ))}
      {/* Highlight */}
      <ellipse cx={-10} cy={-30} rx={4} ry={12} fill={CACTUS_LITE} opacity="0.4" />
      {/* Flower */}
      <circle cx={0} cy={-50} r={3.5} fill="#F04E4E" />
      <circle cx={-3} cy={-51} r={1.8} fill="#FFCE3E" />
      <circle cx={3} cy={-51} r={1.8} fill="#FFCE3E" />
    </g>
  );
}

/* ---------------- Ocotillo ---------------- */

function Ocotillo({
  x,
  baseY,
  scale = 1,
  phase = 0,
}: {
  x: number;
  baseY: number;
  scale?: number;
  phase?: number;
}) {
  const stalks = [-26, -14, -3, 8, 20, 32];
  const heights = [105, 130, 145, 140, 128, 110];
  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${baseY}px` }}
      animate={{ rotate: [-1.4, 1.4, -1.4] }}
      transition={{
        duration: 4.5 + phase,
        repeat: Infinity,
        ease: "easeInOut",
        delay: phase,
      }}
    >
      <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
        {stalks.map((sx, i) => {
          const h = heights[i];
          const tilt = (sx - 3) * 0.4;
          return (
            <g key={i}>
              <path
                d={`M ${sx} 0 Q ${sx + tilt * 0.4} ${-h * 0.5} ${sx + tilt} ${-h}`}
                stroke="#3E2916"
                strokeWidth={2.8}
                fill="none"
                strokeLinecap="round"
              />
              {[0.25, 0.5, 0.75].map((t, j) => {
                const px = sx + tilt * t * 0.6;
                const py = -h * t;
                return (
                  <ellipse
                    key={j}
                    cx={px + (j % 2 ? 2 : -2)}
                    cy={py}
                    rx={1.8}
                    ry={1}
                    fill="#4EC26B"
                    transform={`rotate(${j % 2 ? 25 : -25} ${px} ${py})`}
                  />
                );
              })}
              <path
                d={`M ${sx + tilt - 2.5} ${-h + 5}
                    Q ${sx + tilt} ${-h - 8}
                    ${sx + tilt + 2.5} ${-h + 5} Z`}
                fill="#F04E4E"
              />
            </g>
          );
        })}
        <ellipse cx={2} cy={2} rx={26} ry={5} fill="#3E2916" />
      </g>
    </motion.g>
  );
}

/* ---------------- Agave (blue foreground succulent) ---------------- */

function Agave({
  x,
  baseY,
  scale = 1,
}: {
  x: number;
  baseY: number;
  scale?: number;
}) {
  const leaves = [
    { angle: -80, length: 60 },
    { angle: -55, length: 75 },
    { angle: -30, length: 85 },
    { angle: -5, length: 90 },
    { angle: 20, length: 85 },
    { angle: 45, length: 75 },
    { angle: 70, length: 60 },
    { angle: -105, length: 45 },
    { angle: 95, length: 45 },
  ];

  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
      {leaves.map((l, i) => (
        <AgaveLeaf key={i} angle={l.angle} length={l.length} />
      ))}
      {/* Center rosette */}
      <ellipse cx={0} cy={0} rx={12} ry={5} fill={AGAVE_FILL} />
      <ellipse cx={-2} cy={-2} rx={6} ry={3} fill={AGAVE_LITE} opacity="0.6" />
    </g>
  );
}

function AgaveLeaf({ angle, length }: { angle: number; length: number }) {
  const rad = (angle * Math.PI) / 180;
  const tipX = Math.sin(rad) * length;
  const tipY = -Math.cos(rad) * length;
  const w = 12;
  const perpX = Math.cos(rad) * w;
  const perpY = Math.sin(rad) * w;

  return (
    <g>
      <path
        d={`M 0 0
            L ${perpX * 0.5} ${perpY * 0.5}
            Q ${tipX + perpX * 0.3} ${tipY + perpY * 0.3} ${tipX} ${tipY}
            Q ${tipX - perpX * 0.3} ${tipY - perpY * 0.3} ${-perpX * 0.5} ${-perpY * 0.5}
            Z`}
        fill={AGAVE_FILL}
      />
      <path
        d={`M 0 -2
            Q ${tipX * 0.5} ${tipY * 0.55} ${tipX * 0.95} ${tipY * 0.98}`}
        stroke={AGAVE_LITE}
        strokeWidth={1.2}
        fill="none"
        opacity="0.65"
      />
    </g>
  );
}
