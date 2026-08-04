import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Block } from "../data/blocks";
import { Slide } from "./Slide";
import { DesertScene } from "./DesertScene";
import { BlockAnimation } from "./BlockAnimation";

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

  /* Swipe navigation on touch devices */
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (dx < 0) next();
    else prev();
  };

  const slide = block.slides[idx];

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-b ${accentBg[block.accent]} grain`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-40 pointer-events-none">
        <DesertScene className="w-full h-full" />
      </div>

      {/* Themed looping animation for this block */}
      <BlockAnimation blockId={block.id} />

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-4 md:px-6 pt-4 md:pt-5">
        <button
          onClick={onBack}
          aria-label="Zpět na hub (Esc)"
          title="Zpět (Esc)"
          className="group flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 h-9 w-9 md:h-10 md:w-10 text-white/90 backdrop-blur ring-1 ring-white/20 transition"
        >
          <span className="text-lg md:text-xl leading-none">←</span>
        </button>

        <div className="text-white/80 text-xs md:text-sm font-mono">
          {idx + 1} / {total}
        </div>
      </div>

      {/* Slide stage */}
      <div className="absolute inset-0 pt-16 md:pt-20 pb-20 md:pb-24">
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
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between px-3 md:px-6 pb-4 md:pb-5">
        <button
          onClick={prev}
          disabled={idx === 0}
          className="rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 backdrop-blur ring-1 ring-white/20 h-11 w-11 md:h-14 md:w-14 flex items-center justify-center text-white text-xl md:text-2xl transition"
          aria-label="Předchozí"
        >
          ←
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {block.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              className={`h-1.5 md:h-2 rounded-full transition-all ${
                i === idx
                  ? "w-6 md:w-8 bg-az-gold"
                  : "w-1.5 md:w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={idx === total - 1}
          className="rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 backdrop-blur ring-1 ring-white/20 h-11 w-11 md:h-14 md:w-14 flex items-center justify-center text-white text-xl md:text-2xl transition"
          aria-label="Další"
        >
          →
        </button>
      </div>
    </div>
  );
}
