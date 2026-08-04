import { motion } from "framer-motion";

/**
 * A clean side-view cow drawn as a readable silhouette.
 * Emphasis on clarity from a distance: solid body + separated legs +
 * elongated head with wide muzzle + short horns + hanging tail.
 *
 * Origin (0,0) is the ground under the middle of the belly.
 * X grows toward the head (right when flip=false).
 *
 * Animations:
 *  - Tail: lazy wag with pauses (12s loop, no metronome look)
 *  - Ear: rare quick flick (roughly every 9s)
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
  const HIDE = "#F4EEE3";
  const HIDE_SHADE = "#D6C6AF";
  const SPOT = "#2A1D14";
  const HOOF = "#1E140E";
  const MUZZLE = "#D69A88";
  const HORN = "#C9B586";
  const EAR_INNER = "#B58A7A";

  const dir = flip ? -1 : 1;

  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale * dir}, ${scale})`}>
      {/* ---------- FAR (background) LEGS ---------- */}
      <Leg x={-22} shade />
      <Leg x={22} shade />

      {/* ---------- BODY ---------- */}
      {/* One continuous silhouette: back → rump → belly → chest */}
      <path
        d="
          M -32 -20
          C -34 -32, -22 -38, -12 -38
          L 14 -38
          C 24 -38, 32 -34, 34 -26
          L 34 -8
          C 34 -2, 30 2, 24 2
          L -20 2
          C -28 2, -34 -6, -34 -14
          Z
        "
        fill={HIDE}
      />
      {/* Withers hump — subtle bump on top-front of back */}
      <path
        d="M 14 -38 C 20 -42, 28 -42, 32 -36 C 30 -32, 22 -32, 14 -34 Z"
        fill={HIDE}
      />
      {/* Belly shading */}
      <path
        d="M -22 0 C -8 4, 12 4, 22 0 C 20 2, -18 2, -22 0 Z"
        fill={HIDE_SHADE}
      />

      {/* ---------- SPOTS (Holstein) ---------- */}
      <g fill={SPOT}>
        <path d="M -22 -30 C -14 -34, -4 -34, -2 -28 C -6 -22, -18 -22, -22 -30 Z" />
        <path d="M 6 -22 C 14 -24, 22 -22, 22 -16 C 18 -12, 8 -14, 6 -22 Z" />
        <path d="M -26 -12 C -20 -14, -14 -12, -14 -6 C -20 -4, -28 -6, -26 -12 Z" />
      </g>

      {/* ---------- UDDER ---------- */}
      <ellipse cx={-4} cy={4} rx={8} ry={3.5} fill={HIDE} />
      <ellipse cx={-4} cy={4} rx={8} ry={3.5} fill={HIDE_SHADE} opacity={0.6} />
      <circle cx={-8} cy={6.5} r={1} fill={MUZZLE} />
      <circle cx={-2} cy={6.5} r={1} fill={MUZZLE} />

      {/* ---------- NEAR (front) LEGS ---------- */}
      <Leg x={-18} />
      <Leg x={26} />

      {/* ---------- NECK + HEAD ---------- */}
      {/* Neck rises from front-top of body toward head */}
      <path
        d="M 24 -34 C 30 -38, 38 -38, 44 -34 L 46 -22 C 40 -20, 30 -22, 24 -26 Z"
        fill={HIDE}
      />
      {/* Head — box with tapered muzzle */}
      <path
        d="
          M 40 -36
          C 48 -40, 58 -40, 62 -34
          L 62 -22
          C 60 -18, 50 -16, 44 -18
          L 40 -22
          Z
        "
        fill={HIDE}
      />
      {/* Muzzle (wider at the very tip) */}
      <ellipse cx={60} cy={-22} rx={5} ry={4} fill={MUZZLE} />
      {/* Nostrils */}
      <ellipse cx={61} cy={-24} rx={0.9} ry={1.2} fill={SPOT} />
      <ellipse cx={61} cy={-20} rx={0.9} ry={1.2} fill={SPOT} />
      {/* Mouth line */}
      <path
        d="M 56 -18 Q 60 -16 63 -18"
        stroke={SPOT}
        strokeWidth={0.6}
        fill="none"
        strokeLinecap="round"
      />
      {/* Forehead patch */}
      <path
        d="M 48 -36 C 52 -38, 56 -37, 57 -34 C 54 -32, 50 -33, 48 -36 Z"
        fill={SPOT}
      />
      {/* Eye */}
      <ellipse cx={52} cy={-30} rx={1.4} ry={1.7} fill={SPOT} />
      <circle cx={52.4} cy={-30.6} r={0.5} fill="white" />

      {/* ---------- EARS ---------- */}
      {/* Far ear (offset behind) */}
      <path
        d="M 42 -40 C 40 -46, 46 -48, 48 -42 Z"
        fill={HIDE_SHADE}
        stroke={SPOT}
        strokeWidth={0.5}
      />

      {/* Near ear — twitches occasionally */}
      <motion.g
        style={{ transformOrigin: `48px -38px` }}
        animate={{ rotate: [0, 0, 0, 0, 0, -22, 4, -10, 0, 0, 0, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeOut",
          times: [0, 0.3, 0.5, 0.6, 0.7, 0.73, 0.76, 0.8, 0.85, 0.9, 0.95, 1],
        }}
      >
        <path
          d="M 44 -38 C 46 -46, 56 -46, 55 -38 C 52 -35, 47 -35, 44 -38 Z"
          fill={HIDE}
          stroke={SPOT}
          strokeWidth={0.5}
        />
        <path
          d="M 46 -39 C 48 -43, 53 -43, 53 -39 C 51 -37, 48 -37, 46 -39 Z"
          fill={EAR_INNER}
        />
      </motion.g>

      {/* ---------- HORNS (short, outward-curving) ---------- */}
      <path
        d="M 45 -40 Q 41 -44, 40 -41 Q 42 -40, 45 -40 Z"
        fill={HORN}
        stroke={SPOT}
        strokeWidth={0.5}
      />
      <path
        d="M 52 -40 Q 56 -44, 57 -41 Q 55 -40, 52 -40 Z"
        fill={HORN}
        stroke={SPOT}
        strokeWidth={0.5}
      />

      {/* ---------- TAIL ---------- */}
      <motion.g
        style={{ transformOrigin: `-32px -28px` }}
        animate={{
          rotate: [
            0, 0, 0, 0, 0, // idle
            -6, 5, -3, 0, 0, // small flick
            0, 0, 0, 0, // pause
            -14, 8, -10, 4, 0, 0, // bigger swat
            0, 0, 0, 0, 0, // rest
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Long thin tail hanging from the rump */}
        <path
          d="M -32 -28 C -38 -20, -42 -10, -44 2"
          stroke={HIDE}
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
        />
        {/* Bushy tuft at end */}
        <path
          d="M -44 2 C -47 5, -48 10, -46 12 C -44 10, -42 6, -42 2 Z"
          fill={SPOT}
        />
      </motion.g>
    </g>
  );

  /* ---- helper: one leg (upper part + hoof + cloven split) ---- */
  function Leg({ x: lx, shade = false }: { x: number; shade?: boolean }) {
    const legFill = shade ? HIDE_SHADE : HIDE;
    return (
      <g>
        {/* Upper leg */}
        <rect x={lx - 2.4} y={-6} width={4.8} height={16} fill={legFill} />
        {/* Knee */}
        <ellipse cx={lx} cy={-6} rx={2.8} ry={1.8} fill={legFill} />
        {/* Hoof */}
        <rect x={lx - 3} y={10} width={6} height={4} fill={HOOF} rx={0.5} />
        {/* Cloven split */}
        <line
          x1={lx}
          y1={10}
          x2={lx}
          y2={14}
          stroke={legFill}
          strokeWidth={0.7}
        />
      </g>
    );
  }
}
