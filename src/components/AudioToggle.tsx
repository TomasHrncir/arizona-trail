import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Background ambient audio for the presentation.
 * Fixed speaker button bottom-right. Starts muted (browser autoplay policy).
 * Keyboard: M toggles.
 */
export function AudioToggle({
  src = "/audio/desert.mp3",
  targetVolume = 0.35,
}: {
  src?: string;
  targetVolume?: number;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hasFile, setHasFile] = useState(true);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0;
    el.loop = true;
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.play()
        .then(() => {
          // fade volume in
          const start = performance.now();
          const step = () => {
            const t = Math.min(1, (performance.now() - start) / 900);
            el.volume = t * targetVolume;
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        })
        .catch((err) => {
          console.warn("Audio play blocked or missing:", err);
          setHasFile(false);
          setPlaying(false);
        });
    } else {
      // fade out then pause
      const start = performance.now();
      const from = el.volume;
      const step = () => {
        const t = Math.min(1, (performance.now() - start) / 500);
        el.volume = from * (1 - t);
        if (t < 1) requestAnimationFrame(step);
        else el.pause();
      };
      requestAnimationFrame(step);
    }
  }, [playing, targetVolume]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <motion.button
        onClick={() => setPlaying((p) => !p)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 h-10 w-10 rounded-full bg-black/40 backdrop-blur ring-1 ring-white/30 text-white flex items-center justify-center shadow-lg hover:bg-black/60 transition-colors"
        aria-label={playing ? "Vypnout hudbu (M)" : "Zapnout hudbu (M)"}
        title={playing ? "Vypnout hudbu (M)" : "Zapnout hudbu (M)"}
      >
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          {playing ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
        </span>
        {!hasFile && (
          <span className="absolute -top-1 -right-1 rounded-full bg-az-red text-[9px] px-1 py-0.5 font-stamp">
            !
          </span>
        )}
      </motion.button>
    </>
  );
}

function SpeakerOnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M4 10v4a1 1 0 001 1h3l4 4V5L8 9H5a1 1 0 00-1 1z" />
      <path
        d="M16 8.5a5 5 0 010 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M18.5 6a8 8 0 010 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
      <path d="M4 10v4a1 1 0 001 1h3l4 4V5L8 9H5a1 1 0 00-1 1z" />
      <path
        d="M16 9l6 6M22 9l-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
