import { motion } from "framer-motion";

/**
 * A single stationary side-view cow.
 * Head + body are static, tail wags on a loop, one ear twitches occasionally.
 * Rendered inside the DesertScene SVG (viewBox 1600×620).
 *
 * `x` / `baseY` — position in DesertScene coordinates.
 * `scale` — overall size multiplier.
 * `flip` — true = looking left (default), false = looking right.
 */
export function Cow({
  x,
  baseY,
  scale = 1,
  flip = false,
}: {
  x: number;
  baseY: number;
  scale?: number;
  flip?: boolean;
}) {
  const bodyFill = "#F1EBE1"; // creamy white
  const spotFill = "#3A2A22"; // dark brown
  const hoofFill = "#2A1E18";
  const noseFill = "#E6B2A3";

  const dir = flip ? -1 : 1;

  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale * dir}, ${scale})`}>
      {/* Rear legs */}
      <rect x={-28} y={-6} width={7} height={28} rx={2} fill={bodyFill} />
      <rect x={-28} y={18} width={7} height={5} rx={1.5} fill={hoofFill} />
      <rect x={-16} y={-6} width={7} height={28} rx={2} fill={bodyFill} />
      <rect x={-16} y={18} width={7} height={5} rx={1.5} fill={hoofFill} />

      {/* Front legs */}
      <rect x={20} y={-6} width={7} height={28} rx={2} fill={bodyFill} />
      <rect x={20} y={18} width={7} height={5} rx={1.5} fill={hoofFill} />
      <rect x={32} y={-6} width={7} height={28} rx={2} fill={bodyFill} />
      <rect x={32} y={18} width={7} height={5} rx={1.5} fill={hoofFill} />

      {/* Body */}
      <ellipse cx={4} cy={-14} rx={34} ry={18} fill={bodyFill} />

      {/* Spots */}
      <ellipse cx={-8} cy={-18} rx={8} ry={6} fill={spotFill} />
      <ellipse cx={16} cy={-10} rx={7} ry={5} fill={spotFill} />
      <ellipse cx={-20} cy={-8} rx={5} ry={4} fill={spotFill} />

      {/* Udder (subtle bulge under body) */}
      <ellipse cx={-4} cy={3} rx={9} ry={4} fill={bodyFill} />
      <circle cx={-8} cy={5} r={1.2} fill={noseFill} />
      <circle cx={-1} cy={5} r={1.2} fill={noseFill} />

      {/* Neck + head */}
      <path
        d={`M 30 -22
            Q 40 -26 46 -30
            Q 54 -32 58 -28
            L 60 -18
            Q 60 -12 54 -10
            L 44 -8
            Q 34 -10 30 -14 Z`}
        fill={bodyFill}
      />

      {/* Muzzle */}
      <ellipse cx={58} cy={-16} rx={5} ry={4} fill={noseFill} />
      {/* Nostrils */}
      <circle cx={59} cy={-17} r={0.8} fill={spotFill} />
      <circle cx={59} cy={-14} r={0.8} fill={spotFill} />

      {/* Eye */}
      <circle cx={52} cy={-25} r={1.6} fill={spotFill} />
      <circle cx={52.5} cy={-25.5} r={0.5} fill="white" />

      {/* Ear that twitches */}
      <motion.g
        style={{ transformOrigin: `48px -30px` }}
        animate={{ rotate: [0, 0, 0, 0, -18, 0, 0, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.55, 0.62, 0.68, 0.72, 0.78, 0.9, 1],
        }}
      >
        <path
          d="M 44 -30 Q 46 -38 52 -36 Q 54 -32 50 -30 Z"
          fill={bodyFill}
          stroke={spotFill}
          strokeWidth={0.6}
        />
      </motion.g>

      {/* Horns */}
      <path
        d="M 46 -32 Q 44 -38 48 -38"
        stroke={spotFill}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 54 -32 Q 56 -38 52 -38"
        stroke={spotFill}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />

      {/* Tail — wags */}
      <motion.g
        style={{ transformOrigin: `-32px -20px` }}
        animate={{ rotate: [-8, 22, -8] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M -32 -20 Q -46 -12 -50 4"
          stroke={bodyFill}
          strokeWidth={3.5}
          fill="none"
          strokeLinecap="round"
        />
        {/* Tail tuft */}
        <ellipse cx={-50} cy={6} rx={3} ry={5} fill={spotFill} />
      </motion.g>
    </g>
  );
}
