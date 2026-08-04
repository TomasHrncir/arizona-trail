import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toInstagramEmbedUrl } from "./instagram";

export type LightboxItem =
  | { kind: "image"; src: string; alt?: string }
  | { kind: "video"; src: string; alt?: string }
  | { kind: "instagram"; src: string };

/**
 * Full-screen media overlay with left/right navigation.
 * `index === null` means closed.
 * Keyboard: Esc closes, ← prev, → next.
 * Click on backdrop closes; click on media is swallowed.
 * Videos auto-play with sound on open; navigating away pauses them.
 */
export function Lightbox({
  items,
  index,
  onClose,
  onChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const isOpen = index !== null && index >= 0 && index < items.length;
  const current = isOpen ? items[index] : null;
  const hasPrev = isOpen && index > 0;
  const hasNext = isOpen && index < items.length - 1;

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
          {hasPrev && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(index - 1);
              }}
              aria-label="Předchozí (←)"
              className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/15 hover:bg-white/25 text-white ring-1 ring-white/30 backdrop-blur flex items-center justify-center text-3xl leading-none z-[110]"
            >
              ←
            </button>
          )}

          {current.kind === "image" && (
            <motion.img
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={current.src}
              alt={current.alt ?? ""}
              className="max-h-[92vh] max-w-[88vw] object-contain rounded-xl shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {current.kind === "video" && (
            <motion.video
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={current.src}
              autoPlay
              controls
              playsInline
              preload="auto"
              onEnded={() => {
                if (hasNext) onChange(index + 1);
              }}
              className="max-h-[92vh] max-w-[88vw] object-contain rounded-xl shadow-2xl bg-black cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {current.kind === "instagram" && (
            <motion.div
              key={current.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl overflow-hidden shadow-2xl bg-white cursor-default"
              style={{
                // Portrait aspect (Reel video + IG chrome). Fills viewport height,
                // falls back to width cap when the viewport is very narrow.
                aspectRatio: "420 / 760",
                height: "min(96vh, calc(88vw * 760 / 420))",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={toInstagramEmbedUrl(current.src)}
                title="Instagram Reel"
                className="w-full h-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </motion.div>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(index + 1);
              }}
              aria-label="Další (→)"
              className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/15 hover:bg-white/25 text-white ring-1 ring-white/30 backdrop-blur flex items-center justify-center text-3xl leading-none z-[110]"
            >
              →
            </button>
          )}

          {items.length > 1 && index !== null && (
            <div className="fixed top-5 left-1/2 -translate-x-1/2 font-mono text-white/85 text-sm bg-black/40 px-3 py-1 rounded-full ring-1 ring-white/20 backdrop-blur">
              {index + 1} / {items.length}
            </div>
          )}

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
