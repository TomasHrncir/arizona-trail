import { motion } from "framer-motion";
import { useId } from "react";

/**
 * A tumbleweed that rolls across the bottom of the screen,
 * rotating and gently bouncing, then pauses off-screen and repeats.
 */
export function Tumbleweed({
  duration = 14,
  delay = 4,
  size = 70,
  yOffsetPct = 88,
}: {
  duration?: number;
  delay?: number;
  size?: number;
  yOffsetPct?: number;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        top: `${yOffsetPct}%`,
        left: 0,
        width: size,
        height: size,
      }}
      initial={{ x: "-10vw" }}
      animate={{
        x: ["-10vw", "110vw"],
        y: [0, -14, 0, -10, 0, -12, 0],
      }}
      transition={{
        x: {
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: 10,
          ease: "linear",
        },
        y: {
          duration: 1.4,
          delay,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        },
      }}
    >
      {/* Trailing dust puffs — sit behind the tumbleweed */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: "60%",
          top: "35%",
          width: size * 1.8,
          height: size * 0.4,
        }}
      >
        <svg viewBox="0 0 100 22" className="h-full w-full">
          <g fill="#EFE3C4">
            <ellipse cx="85" cy="14" rx="10" ry="4" opacity="0.55" />
            <ellipse cx="65" cy="12" rx="12" ry="5" opacity="0.42" />
            <ellipse cx="42" cy="13" rx="14" ry="5" opacity="0.28" />
            <ellipse cx="18" cy="14" rx="12" ry="4" opacity="0.16" />
          </g>
        </svg>
      </div>

      <motion.div
        className="relative h-full w-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.8,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <TumbleweedSVG uid={uid} />
      </motion.div>
    </motion.div>
  );
}

function TumbleweedSVG({ uid }: { uid: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className="h-full w-full">
      <defs>
        <radialGradient id={`tw-${uid}`} cx="0" cy="0" r="1">
          <stop offset="0%" stopColor="#B87333" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#6B3A18" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#3E1E0A" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <g fill="none" stroke={`url(#tw-${uid})`} strokeWidth="1.8" strokeLinecap="round">
        {/* tangled twigs */}
        {Array.from({ length: 22 }).map((_, i) => {
          const a = (i * 360) / 22;
          const r = 30 + ((i * 7919) % 12);
          const x = Math.cos((a * Math.PI) / 180) * r;
          const y = Math.sin((a * Math.PI) / 180) * r;
          const x2 = -x * 0.6 + ((i * 991) % 20) - 10;
          const y2 = -y * 0.6 + ((i * 727) % 20) - 10;
          return <line key={i} x1={x} y1={y} x2={x2} y2={y2} />;
        })}
        {/* outer messy ring */}
        <circle cx="0" cy="0" r="34" strokeDasharray="6 4 3 5 8 2" />
        <circle cx="0" cy="0" r="28" strokeDasharray="3 5 7 2" />
        <circle cx="0" cy="0" r="22" strokeDasharray="4 3 6 4" />
      </g>
    </svg>
  );
}
