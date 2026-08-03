import { motion } from "framer-motion";

/**
 * Warm dust motes floating up through the sunset light.
 * Cheap decorative layer — 20 small dots with individual drift.
 */
export function DustMotes({ count = 22 }: { count?: number }) {
  const motes = Array.from({ length: count }, (_, i) => {
    const seed = i * 9973;
    const left = (seed % 100);
    const size = 1.6 + ((seed >> 3) % 3);
    const duration = 8 + ((seed >> 5) % 8);
    const delay = (seed >> 7) % 12;
    const drift = ((seed >> 9) % 40) - 20;
    return { i, left, size, duration, delay, drift };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m) => (
        <motion.div
          key={m.i}
          className="absolute rounded-full bg-[#FFE1B0]"
          style={{
            left: `${m.left}%`,
            bottom: "-10px",
            width: m.size,
            height: m.size,
            opacity: 0,
            filter: "blur(0.6px)",
          }}
          animate={{
            y: ["0vh", "-70vh"],
            x: [0, m.drift],
            opacity: [0, 0.9, 0.6, 0],
          }}
          transition={{
            duration: m.duration,
            delay: m.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
