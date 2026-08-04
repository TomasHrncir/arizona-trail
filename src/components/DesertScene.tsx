import { motion } from "framer-motion";

/**
 * Mid-century desert horizon.
 * Three atmospheric mountain layers (fading with distance) topped with
 * a dominant butte for silhouette rhythm, then a warm sand plain with
 * mixed flora — saguaros, ocotillos, prickly pears and yuccas.
 * Cacti gently sway.
 */

const CACTUS_FILL = "#3D5F3A";
const CACTUS_LITE = "#547A4E";
const CACTUS_SPINE = "rgba(20, 40, 22, 0.45)";
const SHRUB_FILL = "#3E5A45";

export function DesertScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1600 620"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
    >
      <defs>
        {/* Screen-print noise — subtle grain we bake into the shape fills */}
        <filter id="screen-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="7"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.15 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        {/* Broader paper-grain for the sand — coarser, lower opacity */}
        <filter id="sand-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6 0.8"
            numOctaves="1"
            seed="13"
          />
          <feColorMatrix
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.1 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* --------- ATMOSPHERIC MOUNTAIN LAYERS --------- */}

      {/* Distant mauve — soft rolling hills, low opacity for haze */}
      <path
        d="M0 315 Q 130 285 240 305 Q 380 275 500 300 Q 640 280 780 305 Q 920 275 1060 300 Q 1220 285 1340 305 Q 1470 280 1600 300 L1600 500 L0 500 Z"
        fill="#8B5F76"
        opacity="0.42"
      />

      {/* Mid orange — with one dominant BUTTE (flat-topped mesa) breaking rhythm */}
      <path
        d="M0 385
           L110 350 L230 380 L360 340 L510 385
           L640 355
           L720 300 L900 300 L960 355
           L1080 380 L1230 345 L1370 390 L1500 360 L1600 385
           L1600 500 L0 500 Z"
        fill="#D67A3A"
        opacity="0.75"
      />

      {/* Front burnt-sienna — sharpest silhouette, full opacity */}
      <path
        d="M0 445
           Q 90 430 190 448
           L280 400
           L400 450
           Q 500 440 620 452
           L740 415
           L860 458
           Q 980 442 1100 460
           L1220 420
           L1330 458
           Q 1440 445 1560 460
           L1600 452
           L1600 500 L0 500 Z"
        fill="#A6421E"
      />

      {/* Bake a subtle noise into the front range for screen-print feel */}
      <path
        d="M0 445
           Q 90 430 190 448
           L280 400
           L400 450
           Q 500 440 620 452
           L740 415
           L860 458
           Q 980 442 1100 460
           L1220 420
           L1330 458
           Q 1440 445 1560 460
           L1600 452
           L1600 500 L0 500 Z"
        fill="#000"
        filter="url(#screen-noise)"
        opacity="0.35"
      />

      {/* --------- HAZE BAND at horizon (thin light strip) --------- */}
      <rect
        x="0"
        y="495"
        width="1600"
        height="8"
        fill="#F3D2A8"
        opacity="0.55"
      />

      {/* --------- SAND --------- */}
      <path d="M0 500 L1600 500 L1600 620 L0 620 Z" fill="#D9944A" />
      {/* Paper-grain baked into the sand */}
      <rect
        x="0"
        y="500"
        width="1600"
        height="120"
        fill="#000"
        filter="url(#sand-noise)"
        opacity="0.35"
      />
      {/* Sand shading under the front range */}
      <path
        d="M0 506 Q 400 496 800 506 T 1600 501 L 1600 522 Q 1200 514 800 522 T 0 520 Z"
        fill="#B67130"
        opacity="0.55"
      />

      {/* --------- TRAIL PATH — winding from foreground to horizon --------- */}
      <path
        d="M 780 620
           C 780 590, 720 570, 740 545
           C 760 525, 830 520, 820 500
           L 815 498"
        stroke="#F1D9A8"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
      {/* Trail narrowing to distance */}
      <path
        d="M 820 500 L 815 498"
        stroke="#F1D9A8"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />

      {/* --------- FLORA --------- */}
      <g>
        {/* Distant tiny saguaro pair (peeking above mid range) — parallax feel */}
        <Saguaro x={410} baseY={385} scale={0.35} arms={2} phase={0.4} />
        <Saguaro x={1360} baseY={395} scale={0.32} arms={1} phase={0.9} />

        {/* Mid-ground foliage — mix of species, front of the sienna range */}
        <Yucca x={110} baseY={555} scale={0.9} />
        <Saguaro x={200} baseY={555} scale={1.15} arms={2} phase={0.1} />
        <Ocotillo x={315} baseY={560} scale={0.95} phase={0.6} />
        <PricklyPear x={410} baseY={575} scale={0.9} />
        <Saguaro x={510} baseY={548} scale={1.5} arms={3} phase={0.5} />
        <Yucca x={620} baseY={578} scale={0.75} />
        <Saguaro x={720} baseY={555} scale={0.85} arms={2} phase={0.9} />

        {/* Wider gap under the butte on the right — negative space */}
        <PricklyPear x={870} baseY={572} scale={1.0} variant={2} />
        <Saguaro x={1000} baseY={548} scale={1.3} arms={3} phase={0.3} />
        <Ocotillo x={1105} baseY={555} scale={1.1} phase={1.2} />
        <Saguaro x={1220} baseY={555} scale={1.0} arms={2} phase={0.7} />
        <Yucca x={1310} baseY={578} scale={0.8} />
        <Saguaro x={1420} baseY={555} scale={1.15} arms={3} phase={1.1} />
        <PricklyPear x={1520} baseY={572} scale={0.85} />

        {/* Small foreground shrubs */}
        <Shrub x={70} baseY={605} scale={1.1} />
        <Shrub x={280} baseY={610} scale={0.85} />
        <Shrub x={560} baseY={608} scale={1.0} />
        <Shrub x={830} baseY={612} scale={0.95} />
        <Shrub x={1160} baseY={608} scale={1.05} />
        <Shrub x={1380} baseY={612} scale={0.9} />
        <Shrub x={1550} baseY={608} scale={1.0} />
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
        <rect
          x={-trunkW / 2 + 3}
          y={-trunkH + trunkW / 2 + 4}
          width={4}
          height={trunkH - trunkW / 2 - 6}
          fill={CACTUS_LITE}
          opacity="0.5"
        />
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

/* ---------------- Ocotillo (whip-like stems with red tips) ---------------- */

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
  const stems = [
    { angle: -22, h: 110 },
    { angle: -8, h: 130 },
    { angle: 6, h: 125 },
    { angle: 20, h: 115 },
    { angle: -30, h: 90 },
    { angle: 30, h: 95 },
  ];
  return (
    <motion.g
      style={{ transformOrigin: `${x}px ${baseY}px` }}
      animate={{ rotate: [-0.8, 0.8, -0.8] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: phase,
      }}
    >
      <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
        {stems.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180;
          const tipX = Math.sin(rad) * s.h;
          const tipY = -Math.cos(rad) * s.h;
          return (
            <g key={i}>
              <path
                d={`M 0 0 Q ${tipX * 0.35} ${tipY * 0.55} ${tipX} ${tipY}`}
                stroke={CACTUS_FILL}
                strokeWidth={2.4}
                fill="none"
                strokeLinecap="round"
              />
              {/* red flame tip — accent, small enough not to break palette */}
              <circle cx={tipX} cy={tipY} r={2.2} fill="#A6421E" />
            </g>
          );
        })}
        <ellipse cx={0} cy={2} rx={9} ry={3} fill={CACTUS_FILL} />
      </g>
    </motion.g>
  );
}

/* ---------------- Prickly pear (opuncie) ---------------- */

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
      animate={{ rotate: [-0.4, 0.4, -0.4] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
    >
      <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
        {/* base pad */}
        <ellipse cx={0} cy={-15} rx={17} ry={20} fill={CACTUS_FILL} />
        {/* upper pads */}
        <ellipse cx={-13} cy={-38} rx={12} ry={15} fill={CACTUS_FILL} />
        <ellipse cx={14} cy={-42} rx={11} ry={14} fill={CACTUS_FILL} />
        {variant === 2 && (
          <ellipse cx={2} cy={-58} rx={9} ry={12} fill={CACTUS_FILL} />
        )}
        {/* subtle highlights */}
        <ellipse cx={-5} cy={-20} rx={4} ry={6} fill={CACTUS_LITE} opacity="0.4" />
        <ellipse cx={-16} cy={-42} rx={3} ry={4} fill={CACTUS_LITE} opacity="0.4" />
      </g>
    </motion.g>
  );
}

/* ---------------- Yucca (spiky rosette) ---------------- */

function Yucca({
  x,
  baseY,
  scale = 1,
}: {
  x: number;
  baseY: number;
  scale?: number;
}) {
  const leaves = [
    { angle: -85, length: 26 },
    { angle: -60, length: 34 },
    { angle: -30, length: 40 },
    { angle: 0, length: 46 },
    { angle: 30, length: 40 },
    { angle: 60, length: 34 },
    { angle: 85, length: 26 },
    { angle: -45, length: 30 },
    { angle: 45, length: 30 },
  ];
  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
      {leaves.map((l, i) => {
        const rad = (l.angle * Math.PI) / 180;
        const tipX = Math.sin(rad) * l.length;
        const tipY = -Math.cos(rad) * l.length;
        // slender pointy leaf
        return (
          <path
            key={i}
            d={`M 0 0
                L ${tipX - Math.cos(rad) * 3} ${tipY - Math.sin(rad) * 3}
                L ${tipX} ${tipY}
                L ${tipX + Math.cos(rad) * 3} ${tipY + Math.sin(rad) * 3}
                Z`}
            fill={SHRUB_FILL}
          />
        );
      })}
      <ellipse cx={0} cy={2} rx={7} ry={3} fill={SHRUB_FILL} />
    </g>
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
