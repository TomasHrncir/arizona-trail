import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type LightboxImage = { src: string; alt?: string };

/**
 * Full-screen image overlay with left/right navigation.
 * `index === null` means closed.
 * Keyboard: Esc closes, ← prev, → next.
 * Click on backdrop closes; click on image is swallowed.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const isOpen = index !== null && index >= 0 && index < images.length;
  const current = isOpen ? images[index] : null;
  const hasPrev = isOpen && index > 0;
  const hasNext = isOpen && index < images.length - 1;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowRight" && hasNext) {
        e.stopPropagation();
        onChange(index + 1);
      } else if (e.key === "ArrowLeft" && hasPrev) {
        e.stopPropagation();
        onChange(index - 1);
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKey, { capture: true } as any);
  }, [isOpen, index, hasPrev, hasNext, onChange, onClose]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          onClick={onClose}
        >
          {/* Prev arrow */}
          {hasPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(index - 1);
              }}
              aria-label="Předchozí obrázek (←)"
              className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/15 hover:bg-white/25 text-white ring-1 ring-white/30 backdrop-blur flex items-center justify-center text-3xl leading-none z-[110]"
            >
              ←
            </button>
          )}

          {/* Image */}
          <motion.img
            key={current.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            src={current.src}
            alt={current.alt ?? ""}
            className="max-h-[92vh] max-w-[88vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next arrow */}
          {hasNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(index + 1);
              }}
              aria-label="Další obrázek (→)"
              className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/15 hover:bg-white/25 text-white ring-1 ring-white/30 backdrop-blur flex items-center justify-center text-3xl leading-none z-[110]"
            >
              →
            </button>
          )}

          {/* Counter */}
          {images.length > 1 && index !== null && (
            <div className="fixed top-5 left-1/2 -translate-x-1/2 font-mono text-white/85 text-sm bg-black/40 px-3 py-1 rounded-full ring-1 ring-white/20 backdrop-blur">
              {index + 1} / {images.length}
            </div>
          )}

          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Zavřít (Esc)"
            className="fixed top-5 right-5 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 text-white ring-1 ring-white/30 backdrop-blur flex items-center justify-center text-xl leading-none z-[110]"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
