import { motion } from "framer-motion";

/**
 * A stationary side-view cow (Holstein-ish) drawn with real bovine anatomy:
 * deep chest, prominent withers, sloped back, hanging belly, four separate
 * legs with knees + cloven hooves, wide floppy ears and short outward-curving
 * horns behind them.
 *
 * Animations (looped):
 *  • Tail: mostly hangs, flicks a few times, occasional bigger swat.
 *  • Ear: rare quick twitch.
 *  • Chest: subtle slow breathing.
 *
 * Coordinates are internal to the cow (0,0 = ground under the belly).
 * `flip` mirrors the whole cow horizontally.
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
  const HIDE = "#F4EEE3"; // creamy white hide
  const HIDE_SHADE = "#D9CFBE"; // underbelly shading
  const SPOT = "#2A1D14"; // Holstein spots (dark brown/black)
  const HOOF = "#1E140E";
  const MUZZLE = "#D69A88";
  const EAR_INNER = "#B58A7A";
  const HORN = "#C9B586";

  const dir = flip ? -1 : 1;

  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale * dir}, ${scale})`}>
      {/* -------- LEGS (drawn first, behind body) -------- */}
      {/* Far rear leg (visually behind) */}
      <g fill={HIDE_SHADE}>
        <path d="M -34 -6 L -34 8 L -30 8 L -30 -6 Z" />
        {/* knee bulge */}
        <ellipse cx={-32} cy={-6} rx={3} ry={2} />
        {/* upper leg */}
        <path d="M -34 -30 L -30 -30 L -30 -6 L -34 -6 Z" />
        {/* hoof */}
        <path d="M -35 8 L -29 8 L -29 12 L -35 12 Z" fill={HOOF} />
        {/* cloven split */}
        <line
          x1={-32}
          y1={8}
          x2={-32}
          y2={12}
          stroke={HIDE_SHADE}
          strokeWidth={0.8}
        />
      </g>

      {/* Far front leg */}
      <g fill={HIDE_SHADE}>
        <path d="M 26 -30 L 30 -30 L 30 8 L 26 8 Z" />
        <ellipse cx={28} cy={-6} rx={3} ry={2} />
        <path d="M 25 8 L 31 8 L 31 12 L 25 12 Z" fill={HOOF} />
        <line x1={28} y1={8} x2={28} y2={12} stroke={HIDE_SHADE} strokeWidth={0.8} />
      </g>

      {/* -------- BODY -------- */}
      {/* Deep chest + sloped back silhouette */}
      <path
        d="
          M -32 -30
          C -34 -38, -30 -44, -22 -46
          C -14 -48, -6 -48, 2 -46
          C 10 -44, 18 -42, 24 -38
          C 30 -34, 32 -30, 30 -26
          C 30 -18, 28 -12, 26 -6
          C 24 -2, 20 0, 14 2
          C 6 4, -6 4, -14 2
          C -22 0, -28 -2, -32 -8
          C -34 -14, -34 -22, -32 -30 Z
        "
        fill={HIDE}
      />

      {/* Under-belly shading */}
      <path
        d="M -22 -2 C -12 2, 6 2, 20 -2 C 18 6, -14 6, -22 -2 Z"
        fill={HIDE_SHADE}
        opacity={0.75}
      />

      {/* Withers/shoulder hump */}
      <path
        d="M 18 -46 C 22 -50, 26 -50, 28 -44 C 26 -38, 22 -38, 18 -42 Z"
        fill={HIDE}
      />

      {/* -------- HOLSTEIN SPOTS -------- */}
      <g fill={SPOT}>
        <path d="M -20 -40 C -14 -44, -6 -44, -2 -40 C -6 -34, -14 -34, -20 -40 Z" />
        <path d="M 6 -32 C 12 -34, 18 -32, 20 -28 C 16 -24, 8 -26, 6 -32 Z" />
        <path d="M -26 -20 C -20 -22, -14 -20, -14 -14 C -20 -12, -28 -14, -26 -20 Z" />
      </g>

      {/* -------- UDDER + TEATS -------- */}
      <ellipse cx={-4} cy={5} rx={10} ry={5} fill={HIDE} />
      <ellipse cx={-4} cy={5} rx={10} ry={5} fill={HIDE_SHADE} opacity={0.5} />
      <circle cx={-8} cy={8} r={1.2} fill={MUZZLE} />
      <circle cx={0} cy={8} r={1.2} fill={MUZZLE} />

      {/* -------- NEAR LEGS (front over body) -------- */}
      {/* Near rear leg */}
      <g fill={HIDE}>
        <rect x={-28} y={-30} width={5} height={38} />
        <ellipse cx={-25.5} cy={-6} rx={3.3} ry={2.4} />
        <path d="M -29 8 L -22 8 L -22 12 L -29 12 Z" fill={HOOF} />
        <line x1={-25.5} y1={8} x2={-25.5} y2={12} stroke={HIDE_SHADE} strokeWidth={0.8} />
      </g>

      {/* Near front leg */}
      <g fill={HIDE}>
        <rect x={19} y={-30} width={5} height={38} />
        <ellipse cx={21.5} cy={-6} rx={3.3} ry={2.4} />
        <path d="M 18 8 L 25 8 L 25 12 L 18 12 Z" fill={HOOF} />
        <line x1={21.5} y1={8} x2={21.5} y2={12} stroke={HIDE_SHADE} strokeWidth={0.8} />
      </g>

      {/* -------- NECK + HEAD -------- */}
      {/* Neck */}
      <path
        d="M 22 -44 C 30 -46, 38 -46, 44 -44 L 46 -30 C 40 -28, 32 -28, 26 -30 Z"
        fill={HIDE}
      />

      {/* Head — elongated with prominent muzzle */}
      <path
        d="
          M 40 -46
          C 48 -50, 58 -48, 62 -42
          C 64 -36, 62 -30, 58 -26
          C 54 -22, 46 -22, 42 -26
          C 40 -32, 38 -40, 40 -46 Z
        "
        fill={HIDE}
      />

      {/* Forehead spot */}
      <path
        d="M 46 -44 C 50 -46, 54 -45, 55 -42 C 53 -39, 48 -40, 46 -44 Z"
        fill={SPOT}
      />

      {/* Muzzle (wide pink nose area) */}
      <ellipse cx={58} cy={-28} rx={6.5} ry={5} fill={MUZZLE} />
      {/* Nostrils */}
      <ellipse cx={60} cy={-30} rx={1} ry={1.4} fill={SPOT} />
      <ellipse cx={60} cy={-25} rx={1} ry={1.4} fill={SPOT} />
      {/* Mouth line */}
      <path
        d="M 55 -24 Q 58 -22 62 -24"
        stroke={SPOT}
        strokeWidth={0.7}
        fill="none"
      />

      {/* Eye */}
      <ellipse cx={50} cy={-38} rx={1.8} ry={2.2} fill={SPOT} />
      <circle cx={50.5} cy={-38.8} r={0.6} fill="white" />
      {/* Eyelashes hint */}
      <path
        d="M 48 -40 L 47 -41 M 50 -40.5 L 50 -41.5 M 52 -40 L 53 -41"
        stroke={SPOT}
        strokeWidth={0.5}
      />

      {/* -------- EARS -------- */}
      {/* Far ear (behind head) */}
      <path
        d="M 42 -50 C 40 -56, 46 -58, 48 -52 C 48 -50, 46 -48, 42 -50 Z"
        fill={HIDE_SHADE}
        stroke={SPOT}
        strokeWidth={0.5}
      />

      {/* Near ear — twitches occasionally */}
      <motion.g
        style={{ transformOrigin: `48px -46px` }}
        animate={{ rotate: [0, 0, 0, 0, 0, -22, 3, -8, 0, 0, 0, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeOut",
          times: [0, 0.3, 0.5, 0.6, 0.7, 0.73, 0.76, 0.8, 0.85, 0.9, 0.95, 1],
        }}
      >
        <path
          d="M 44 -46 C 46 -56, 56 -54, 56 -47 C 54 -43, 47 -43, 44 -46 Z"
          fill={HIDE}
          stroke={SPOT}
          strokeWidth={0.6}
        />
        <path
          d="M 46 -47 C 48 -52, 54 -51, 54 -47 C 52 -45, 48 -45, 46 -47 Z"
          fill={EAR_INNER}
        />
      </motion.g>

      {/* -------- HORNS (short, curved outward) -------- */}
      <path
        d="M 44 -49 C 42 -54, 39 -55, 38 -52 C 39 -51, 42 -50, 44 -49 Z"
        fill={HORN}
        stroke={SPOT}
        strokeWidth={0.5}
      />
      <path
        d="M 52 -50 C 54 -55, 57 -55, 58 -52 C 56 -51, 54 -50, 52 -50 Z"
        fill={HORN}
        stroke={SPOT}
        strokeWidth={0.5}
      />

      {/* -------- TAIL -------- */}
      {/* Tail with realistic lazy wag: mostly hangs, occasional flick + swat */}
      <motion.g
        style={{ transformOrigin: `-32px -34px` }}
        animate={{
          rotate: [
            0, 0, 0, 0, 0,           // hangs still
            -6, 4, -3, 0, 0,          // small flick
            0, 0, 0, 0,               // pause
            -14, 8, -10, 3, 0, 0,     // bigger swat
            0, 0, 0, 0, 0,            // rest
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Tail base attaches near the rump */}
        <path
          d="M -30 -34 C -36 -30, -42 -20, -44 -6"
          stroke={HIDE}
          strokeWidth={3.2}
          fill="none"
          strokeLinecap="round"
        />
        {/* Bushy tail tuft at end */}
        <path
          d="M -44 -6 C -47 -3, -49 2, -47 6 C -45 4, -43 2, -42 -2 Z"
          fill={SPOT}
        />
        <path
          d="M -46 -2 L -49 4 M -44 0 L -46 6 M -42 -2 L -43 4"
          stroke={SPOT}
          strokeWidth={0.9}
          strokeLinecap="round"
        />
      </motion.g>

      {/* -------- BREATHING (subtle chest expansion) -------- */}
      <motion.ellipse
        cx={16}
        cy={-24}
        rx={10}
        ry={6}
        fill={HIDE}
        opacity={0}
        animate={{ opacity: [0, 0.08, 0] }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </g>
  );
}
