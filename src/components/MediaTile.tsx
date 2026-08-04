import type { MediaItem } from "../data/blocks";

/**
 * One slot in the media grid next to a text slide.
 * When `item` is undefined a dashed placeholder is drawn.
 * Images are clickable — parent slide opens them in a lightbox.
 */
export function MediaTile({
  item,
  onOpenImage,
}: {
  item?: MediaItem;
  onOpenImage?: (src: string, alt?: string) => void;
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
        onClick={() => onOpenImage?.(item.src, item.alt)}
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

  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl bg-black aspect-[4/3] relative">
      <video
        src={item.src}
        controls
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
