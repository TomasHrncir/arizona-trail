import { motion } from "framer-motion";

/**
 * A tiny looping animation shown behind slides in a BlockView.
 * Themed per block: hiker, sun/moon cycle, water drop, steam, snake, truck,
 * compass and lightning.
 * Sits in the bottom horizon area of the slide by default so it doesn't
 * interfere with reading; a couple of variants target different regions.
 */
export function BlockAnimation({ blockId }: { blockId: string }) {
  switch (blockId) {
    case "intro":
      return <Hiker />;
    case "den":
      return <SunMoon />;
    case "voda":
      return <WaterDrop />;
    case "strava":
      return <Steam />;
    case "zvirata":
      return <Snake />;
    case "lide":
      return <Pickup />;
    case "vybaveni":
      return <Compass />;
    case "prihody":
      return <Lightning />;
    default:
      return null;
  }
}

/* ============================================================ */
/*                       Individual scenes                       */
/* ============================================================ */

/** Small stick hiker walking left→right with a bob and switching leg. */
function Hiker() {
  return (
    <motion.div
      className="pointer-events-none absolute z-[5]"
      style={{ bottom: "6vh", left: 0, width: 60, height: 80 }}
      initial={{ x: "-12vw" }}
      animate={{
        x: ["-12vw", "112vw"],
        y: [0, -4, 0, -4, 0, -4, 0],
      }}
      transition={{
        x: { duration: 26, repeat: Infinity, ease: "linear", delay: 3, repeatDelay: 6 },
        y: {
          duration: 0.9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        },
      }}
    >
      <svg viewBox="0 0 60 80" className="h-full w-full">
        <g stroke="#F5E6C9" strokeWidth="2" fill="none" strokeLinecap="round">
          {/* head */}
          <circle cx="30" cy="14" r="6" fill="#F5E6C9" />
          {/* body */}
          <line x1="30" y1="20" x2="30" y2="46" />
          {/* backpack */}
          <rect x="20" y="22" width="14" height="20" rx="3" fill="#F5E6C9" opacity="0.85" />
          {/* arms holding poles */}
          <line x1="30" y1="28" x2="44" y2="46" />
          <line x1="30" y1="28" x2="18" y2="46" />
          {/* trekking poles */}
          <line x1="44" y1="46" x2="48" y2="72" strokeWidth="1.5" />
          <line x1="18" y1="46" x2="14" y2="72" strokeWidth="1.5" />
          {/* legs alternating */}
          <motion.line
            x1="30"
            y1="46"
            x2="24"
            y2="70"
            animate={{ x2: [24, 36, 24] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1="30"
            y1="46"
            x2="36"
            y2="70"
            animate={{ x2: [36, 24, 36] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </motion.div>
  );
}

/** A sun that arcs across the top of the screen, becoming a pale moon on the return. */
function SunMoon() {
  return (
    <motion.div
      className="pointer-events-none absolute z-[5]"
      style={{ top: 0, left: 0, width: "100%", height: "40vh" }}
    >
      <motion.div
        className="absolute h-16 w-16 rounded-full"
        style={{ top: 0, left: 0 }}
        animate={{
          x: ["5vw", "50vw", "95vw"],
          y: ["30vh", "6vh", "30vh"],
          backgroundColor: ["#FFB562", "#FFE1A8", "#E6E9EE"],
          boxShadow: [
            "0 0 40px 12px rgba(255,181,98,0.45)",
            "0 0 60px 20px rgba(255,225,168,0.35)",
            "0 0 30px 8px rgba(230,233,238,0.25)",
          ],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </motion.div>
  );
}

/** A blue drop falling with a growing ripple where it lands. */
function WaterDrop() {
  return (
    <div
      className="pointer-events-none absolute z-[5]"
      style={{ bottom: "10vh", left: "18%", width: 40, height: "60vh" }}
    >
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        animate={{ y: ["-40vh", "60vh"], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeIn",
          repeatDelay: 2.4,
          times: [0, 0.05, 0.9, 1],
        }}
      >
        <svg viewBox="0 0 20 30" width="16" height="22">
          <path
            d="M10 2 Q 4 14 4 20 A 6 6 0 0 0 16 20 Q 16 14 10 2 Z"
            fill="#7CB6D8"
            opacity="0.85"
          />
        </svg>
      </motion.div>
      {/* ripple where drop lands */}
      <motion.svg
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 0 }}
        viewBox="0 0 60 20"
        width="80"
        height="26"
        animate={{ opacity: [0, 0.7, 0] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 1.9,
        }}
      >
        <motion.ellipse
          cx="30"
          cy="10"
          rx="6"
          ry="2"
          fill="none"
          stroke="#7CB6D8"
          strokeWidth="1.5"
          animate={{ rx: [4, 26], ry: [1.5, 5], opacity: [0.9, 0] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: 3,
            delay: 1.9,
          }}
        />
      </motion.svg>
    </div>
  );
}

/** Stove silhouette with three curly steam wisps rising and fading. */
function Steam() {
  const wisps = [
    { delay: 0, x: -12 },
    { delay: 1.2, x: 0 },
    { delay: 2.1, x: 10 },
  ];
  return (
    <div
      className="pointer-events-none absolute z-[5]"
      style={{ bottom: "8vh", right: "12%", width: 120, height: 200 }}
    >
      {/* stove */}
      <svg
        viewBox="0 0 120 60"
        className="absolute bottom-0 left-0 h-[60px] w-full"
      >
        <ellipse cx="60" cy="46" rx="34" ry="6" fill="#3A2A1C" opacity="0.75" />
        <rect
          x="34"
          y="30"
          width="52"
          height="18"
          rx="4"
          fill="#5C4A3D"
          opacity="0.85"
        />
        <circle cx="52" cy="30" r="4" fill="#B87333" />
        <circle cx="68" cy="30" r="4" fill="#B87333" />
      </svg>

      {/* steam wisps */}
      {wisps.map((w, i) => (
        <motion.svg
          key={i}
          viewBox="-20 -60 40 80"
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 55, width: 40, height: 80 }}
          animate={{
            y: [-10, -70],
            opacity: [0, 0.6, 0],
            x: [w.x, w.x + 6, w.x],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeOut",
            delay: w.delay,
          }}
        >
          <path
            d="M0 20 Q -8 8 0 -4 Q 8 -20 0 -36 Q -6 -48 0 -60"
            stroke="#EFE3C4"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </motion.svg>
      ))}
    </div>
  );
}

/** A wavy snake sliding across near the horizon. */
function Snake() {
  return (
    <motion.div
      className="pointer-events-none absolute z-[5]"
      style={{ bottom: "10vh", left: 0, width: 220, height: 40 }}
      initial={{ x: "-20vw" }}
      animate={{ x: "115vw" }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        delay: 4,
        repeatDelay: 8,
      }}
    >
      <motion.svg
        viewBox="0 0 220 40"
        className="h-full w-full"
        animate={{ y: [0, -2, 0, -2, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="snake-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B6B3F" />
            <stop offset="100%" stopColor="#3A2A1C" />
          </linearGradient>
        </defs>
        <path
          d="M 4 20
             C 24 4, 44 4, 64 20
             S 104 36, 124 20
             S 164 4, 184 20
             L 200 20"
          stroke="url(#snake-body)"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* head */}
        <ellipse cx="204" cy="20" rx="7" ry="5" fill="#3A2A1C" />
        <circle cx="207" cy="18" r="1" fill="#F5E6C9" />
        {/* tongue */}
        <motion.path
          d="M 211 20 L 216 18 M 211 20 L 216 22"
          stroke="#B31E1E"
          strokeWidth="1"
          strokeLinecap="round"
          animate={{ opacity: [0, 1, 0, 0] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
}

/** A retro pickup truck driving across the horizon. */
function Pickup() {
  return (
    <motion.div
      className="pointer-events-none absolute z-[5]"
      style={{ bottom: "9vh", left: 0, width: 130, height: 60 }}
      initial={{ x: "-15vw" }}
      animate={{ x: "115vw" }}
      transition={{
        duration: 18,
        repeat: Infinity,
        ease: "linear",
        delay: 5,
        repeatDelay: 8,
      }}
    >
      <svg viewBox="0 0 130 60" className="h-full w-full">
        <g fill="#5C4A3D">
          {/* cabin */}
          <path d="M 20 30 L 30 14 L 62 14 L 66 30 Z" />
          {/* bed */}
          <rect x="66" y="22" width="46" height="18" />
          {/* body base */}
          <rect x="14" y="30" width="102" height="14" rx="2" />
          {/* window */}
          <path d="M 32 18 L 60 18 L 62 28 L 34 28 Z" fill="#F5E6C9" opacity="0.55" />
        </g>
        {/* wheels */}
        <motion.g
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "30px 46px" }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="30" cy="46" r="7" fill="#1F160E" />
          <line
            x1="30"
            y1="40"
            x2="30"
            y2="52"
            stroke="#3A2A1C"
            strokeWidth="1"
          />
        </motion.g>
        <motion.g
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "98px 46px" }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="98" cy="46" r="7" fill="#1F160E" />
          <line
            x1="98"
            y1="40"
            x2="98"
            y2="52"
            stroke="#3A2A1C"
            strokeWidth="1"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
}

/** A vintage compass whose needle wobbles trying to find north. */
function Compass() {
  return (
    <div
      className="pointer-events-none absolute z-[5]"
      style={{ bottom: "12vh", left: "5%", width: 120, height: 120 }}
    >
      <svg viewBox="-60 -60 120 120" className="h-full w-full">
        {/* outer ring */}
        <circle
          cx="0"
          cy="0"
          r="52"
          stroke="#F5E6C9"
          strokeWidth="3"
          fill="rgba(0,0,0,0.15)"
        />
        {/* cardinals */}
        <g fill="#F5E6C9" fontSize="10" fontFamily="Rye, serif" textAnchor="middle">
          <text x="0" y="-38">N</text>
          <text x="42" y="4">E</text>
          <text x="0" y="46">S</text>
          <text x="-42" y="4">W</text>
        </g>
        {/* needle */}
        <motion.g
          animate={{ rotate: [-14, 10, -6, 4, -2, 0, -8, 12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <polygon points="0,-30 6,0 0,4 -6,0" fill="#CE1126" />
          <polygon points="0,30 6,0 0,-4 -6,0" fill="#F5E6C9" />
        </motion.g>
        {/* center pin */}
        <circle cx="0" cy="0" r="3" fill="#3A2A1C" />
      </svg>
    </div>
  );
}

/** An occasional lightning bolt with a brief bright flash overlay. */
function Lightning() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      {/* full-screen flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        animate={{ opacity: [0, 0, 0, 0.35, 0, 0.15, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.7, 0.8, 0.82, 0.86, 0.9, 1],
          delay: 3,
        }}
      />
      {/* zigzag bolt */}
      <motion.svg
        viewBox="0 0 100 200"
        className="absolute"
        style={{ top: "8vh", right: "18%", width: 60, height: 140 }}
        animate={{ opacity: [0, 0, 0, 1, 0, 0.6, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.7, 0.8, 0.82, 0.86, 0.9, 1],
          delay: 3,
        }}
      >
        <path
          d="M 50 0 L 30 60 L 55 70 L 25 140 L 60 90 L 40 80 L 70 30 Z"
          fill="#FFF5C4"
          stroke="#FFD35F"
          strokeWidth="2"
          strokeLinejoin="miter"
        />
      </motion.svg>
    </div>
  );
}
