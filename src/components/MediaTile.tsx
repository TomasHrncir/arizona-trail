import type { MediaItem } from "../data/blocks";

/**
 * One slot in the media grid next to a text slide.
 * When `item` is undefined a dashed placeholder is drawn.
 * All media kinds are clickable and open in the lightbox.
 */
export function MediaTile({
  item,
  onOpen,
}: {
  item?: MediaItem;
  onOpen?: (src: string) => void;
}) {
  if (!item) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-white/25 bg-white/5 aspect-[4/3] flex flex-col items-center justify-center text-white/40 gap-2 p-4">
        <svg viewBox="0 0 24 24" className="h-8 w-8 opacity-60">
          <path
            d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm3 2v10l4-4 3 3 3-4 3 3V8H7z"
            fill="currentColor"
          />
        </svg>
        <div className="font-stamp text-[10px] uppercase tracking-widest">
          obrázek / video
        </div>
      </div>
    );
  }

  if (item.kind === "image") {
    return (
      <button
        type="button"
        onClick={() => onOpen?.(item.src)}
        aria-label={item.alt ?? "Zvětšit obrázek"}
        className="group relative rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl bg-black/30 aspect-[4/3] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-az-gold"
      >
        <img
          src={item.src}
          alt={item.alt ?? ""}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/25 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-white/95">
            <path
              d="M11 4a7 7 0 105.29 11.71l3.5 3.5 1.42-1.42-3.5-3.5A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10zm-1 2v2H8v2h2v2h2v-2h2v-2h-2V8h-2z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
    );
  }

  if (item.kind === "video") {
    return (
      <button
        type="button"
        onClick={() => onOpen?.(item.src)}
        aria-label="Přehrát video"
        className="group relative rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl bg-black aspect-[4/3] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-az-gold"
      >
        <video
          src={item.src}
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/45 transition-colors">
          <div className="h-16 w-16 rounded-full bg-white/25 group-hover:bg-white/40 backdrop-blur flex items-center justify-center ring-2 ring-white/50">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white translate-x-[2px]">
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  // Instagram Reel — gradient tile with IG icon + play, opens iframe in lightbox
  return (
    <button
      type="button"
      onClick={() => onOpen?.(item.src)}
      aria-label="Přehrát Instagram Reel"
      className="group relative rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl aspect-[4/3] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-az-gold"
      style={{
        background:
          "conic-gradient(from 45deg at 30% 110%, #FFD35F 0deg, #FF6E44 70deg, #E1306C 150deg, #C13584 210deg, #833AB4 280deg, #5851DB 340deg, #FFD35F 360deg)",
      }}
    >
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex flex-col items-center justify-center gap-3">
        <svg viewBox="0 0 24 24" className="h-10 w-10 text-white drop-shadow-md">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
        <div className="h-12 w-12 rounded-full bg-white/35 group-hover:bg-white/55 backdrop-blur flex items-center justify-center ring-2 ring-white/60">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white translate-x-[2px]">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </div>
        <div className="font-stamp text-[10px] uppercase tracking-widest text-white/90">
          Instagram Reel
        </div>
      </div>
    </button>
  );
}
