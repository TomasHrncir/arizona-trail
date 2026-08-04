import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen image overlay.
 * Close by clicking anywhere, tapping the ✕, or pressing Esc.
 */
export function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null;
  alt?: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () =>
      window.removeEventListener("keydown", onKey, { capture: true } as any);
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          onClick={onClose}
        >
          <motion.img
            key={src}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            src={src}
            alt={alt ?? ""}
            className="max-h-[92vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Zavřít (Esc)"
            className="fixed top-5 right-5 h-11 w-11 rounded-full bg-white/15 hover:bg-white/25 text-white ring-1 ring-white/30 backdrop-blur flex items-center justify-center text-xl leading-none"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
