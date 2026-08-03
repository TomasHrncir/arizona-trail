import { motion } from "framer-motion";

const CACTUS_FILL = "#2E4520";
const CACTUS_HIGHLIGHT = "rgba(180, 210, 130, 0.22)";

/**
 * Desert horizon: distant mountains, two dune layers,
 * and a scattered mix of saguaros, prickly pears, barrel cacti and ocotillo.
 * Cacti gently sway.
 */
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
        <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B2A5A" />
          <stop offset="100%" stopColor="#3E1A3D" />
        </linearGradient>
      </defs>

      <path
        d="M0 320 L200 220 L360 280 L520 210 L720 300 L900 200 L1080 280 L1280 220 L1600 300 L1600 500 L0 500 Z"
        fill="url(#mtn)"
        opacity="0.9"
      />
      <path
        d="M0 380 Q400 300 800 360 T1600 340 L1600 500 L0 500 Z"
        fill="url(#dune1)"
      />
      <path
        d="M0 450 Q400 400 900 440 T1600 430 L1600 500 L0 500 Z"
        fill="url(#dune2)"
      />

      <g>
        <Ocotillo x={80} baseY={455} scale={1.0} phase={0.4} />
        <PricklyPear x={200} baseY={462} scale={0.75} />
        <Saguaro x={310} baseY={452} scale={1.15} arms={3} phase={0.1} />
        <Barrel x={430} baseY={470} scale={0.9} />
        <Saguaro x={540} baseY={456} scale={0.85} arms={2} phase={0.7} />
        <PricklyPear x={680} baseY={468} scale={0.95} variant={2} />
        <Ocotillo x={820} baseY={452} scale={1.15} phase={1.1} />
        <Saguaro x={960} baseY={450} scale={1.3} arms={4} phase={0.3} />
        <Barrel x={1080} baseY={472} scale={0.7} />
        <Saguaro x={1180} baseY={455} scale={0.9} arms={2} phase={0.9} />
        <PricklyPear x={1290} baseY={465} scale={0.85} />
        <Saguaro x={1400} baseY={452} scale={1.05} arms={3} phase={0.55} />
        <Ocotillo x={1520} baseY={455} scale={0.9} phase={1.5} />
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
  const trunkH = 160;
  const trunkW = 22;

  const armConfigs: {
    side: "L" | "R";
    startY: number;
    height: number;
    reach: number;
  }[] = [
    { side: "L", startY: 0.55, height: 0.55, reach: 26 },
    { side: "R", startY: 0.72, height: 0.50, reach: 24 },
    { side: "L", startY: 0.86, height: 0.30, reach: 20 },
    { side: "R", startY: 0.40, height: 0.28, reach: 18 },
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
        {/* Trunk — flat bottom, rounded top */}
        <path
          d={`M ${-trunkW / 2} 0
              L ${-trunkW / 2} ${-trunkH + trunkW / 2}
              A ${trunkW / 2} ${trunkW / 2} 0 0 1 ${trunkW / 2} ${-trunkH + trunkW / 2}
              L ${trunkW / 2} 0 Z`}
          fill={CACTUS_FILL}
        />
        {/* Ribs */}
        {[-6, 0, 6].map((rx) => (
          <line
            key={rx}
            x1={rx}
            y1={-trunkH + 24}
            x2={rx}
            y2={-6}
            stroke={CACTUS_HIGHLIGHT}
            strokeWidth={1.5}
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
  const armW = 14;
  const dir = side === "L" ? -1 : 1;
  const attachX = dir * (trunkW / 2 - 2);
  const startY = -trunkH * startYRatio;
  const armH = trunkH * heightRatio;
  const bendY = startY + 6;
  const outerX = attachX + dir * reach;
  const topY = startY - armH;

  // Arm: horizontal stub coming out of trunk, elbow up, vertical rounded segment
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
        <ellipse cx={0} cy={-16} rx={20} ry={22} fill={CACTUS_FILL} />
        <ellipse cx={-16} cy={-40} rx={14} ry={18} fill={CACTUS_FILL} />
        <ellipse cx={18} cy={-44} rx={13} ry={17} fill={CACTUS_FILL} />
        {variant === 2 && (
          <ellipse cx={0} cy={-62} rx={11} ry={14} fill={CACTUS_FILL} />
        )}
        {/* prickles */}
        {[[-8, -14], [6, -12], [-16, -38], [12, -42], [0, -28], [-4, -50]].map(
          ([px, py], i) => (
            <circle key={i} cx={px} cy={py} r={0.9} fill={CACTUS_HIGHLIGHT} />
          )
        )}
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
        d={`M -22 0
            Q -28 -18 -22 -36
            Q -14 -48 0 -48
            Q 14 -48 22 -36
            Q 28 -18 22 0
            Z`}
        fill={CACTUS_FILL}
      />
      {/* ribs */}
      {[-14, -7, 0, 7, 14].map((rx) => (
        <path
          key={rx}
          d={`M ${rx} -4 Q ${rx * 1.1} -24 ${rx * 0.85} -42`}
          stroke={CACTUS_HIGHLIGHT}
          strokeWidth={1.3}
          fill="none"
        />
      ))}
      {/* flower */}
      <circle cx={0} cy={-48} r={3} fill="#E63A2E" />
      <circle cx={-3} cy={-49} r={1.6} fill="#FFB612" />
      <circle cx={3} cy={-49} r={1.6} fill="#FFB612" />
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
  const stalks = [-24, -12, -2, 8, 18, 30];
  const heights = [95, 120, 135, 130, 118, 100];
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
                strokeWidth={2.4}
                fill="none"
                strokeLinecap="round"
              />
              {/* tiny leaves along stalk */}
              {[0.3, 0.55, 0.8].map((t, j) => {
                const px = sx + tilt * t * 0.6;
                const py = -h * t;
                return (
                  <ellipse
                    key={j}
                    cx={px + (j % 2 ? 2 : -2)}
                    cy={py}
                    rx={1.6}
                    ry={0.9}
                    fill="#4C6B26"
                    transform={`rotate(${j % 2 ? 25 : -25} ${px} ${py})`}
                  />
                );
              })}
              {/* red flame tip */}
              <path
                d={`M ${sx + tilt - 2} ${-h + 4}
                    Q ${sx + tilt} ${-h - 6}
                    ${sx + tilt + 2} ${-h + 4} Z`}
                fill="#C11E1E"
              />
            </g>
          );
        })}
        <ellipse cx={2} cy={2} rx={22} ry={4} fill="#3E2916" />
      </g>
    </motion.g>
  );
}
