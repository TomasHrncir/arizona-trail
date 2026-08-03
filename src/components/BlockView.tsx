import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Block } from "../data/blocks";
import { Slide } from "./Slide";
import { DesertScene } from "./DesertScene";

const accentBg: Record<Block["accent"], string> = {
  red: "from-az-red/90 via-az-plum to-az-night",
  gold: "from-az-gold/80 via-az-copper to-az-night",
  blue: "from-az-blue via-az-plum to-az-night",
  copper: "from-az-copper/90 via-az-rust to-az-night",
  cactus: "from-az-cactus via-[#2E4A1F] to-az-night",
  plum: "from-az-plum via-az-night to-black",
  rust: "from-az-rust via-az-plum to-az-night",
};

export function BlockView({
  block,
  onBack,
}: {
  block: Block;
  onBack: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const total = block.slides.length;

  const next = useCallback(() => {
    setDir(1);
    setIdx((i) => Math.min(i + 1, total - 1));
  }, [total]);
  const prev = useCallback(() => {
    setDir(-1);
    setIdx((i) => Math.max(i - 1, 0));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape" || e.key === "Home") {
        e.preventDefault();
        onBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, onBack]);

  const slide = block.slides[idx];

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-b ${accentBg[block.accent]} grain`}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-40 pointer-events-none">
        <DesertScene className="w-full h-full" />
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-5">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-white/90 backdrop-blur ring-1 ring-white/20 transition"
        >
          <span className="text-xl">←</span>
          <span className="text-sm uppercase tracking-widest">Hub</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-3xl">{block.icon}</span>
          <div className="text-white">
            <div className="font-display text-lg leading-none">
              {block.title}
            </div>
            <div className="text-xs text-white/70 italic">{block.subtitle}</div>
          </div>
        </div>

        <div className="text-white/80 text-sm font-mono">
          {idx + 1} / {total}
        </div>
      </div>

      {/* Slide stage */}
      <div className="absolute inset-0 pt-20 pb-24">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={slide.id}
            custom={dir}
            initial={{ x: dir * 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: dir * -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <Slide slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-6 pb-5">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 backdrop-blur ring-1 ring-white/20 h-14 w-14 flex items-center justify-center text-white text-2xl transition"
          aria-label="Předchozí"
        >
          ←
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {block.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              className={`h-2 rounded-full transition-all ${
                i === idx
                  ? "w-8 bg-az-gold"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={idx === total - 1}
          className="rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 backdrop-blur ring-1 ring-white/20 h-14 w-14 flex items-center justify-center text-white text-2xl transition"
          aria-label="Další"
        >
          →
        </button>
      </div>
    </div>
  );
}
