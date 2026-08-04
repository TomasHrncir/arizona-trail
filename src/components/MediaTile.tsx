import type { MediaItem } from "../data/blocks";

/**
 * One slot in the media grid next to a text slide.
 * When `item` is undefined a dashed placeholder is drawn so the layout is
 * always the same 2×2 grid — the user can drop content in later.
 */
export function MediaTile({ item }: { item?: MediaItem }) {
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
      <figure className="rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl bg-black/30 aspect-[4/3] relative">
        <img
          src={item.src}
          alt={item.alt ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {item.caption && <Caption>{item.caption}</Caption>}
      </figure>
    );
  }

  return (
    <figure className="rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-xl bg-black aspect-[4/3] relative">
      <video
        src={item.src}
        controls
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      {item.caption && <Caption>{item.caption}</Caption>}
    </figure>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <figcaption className="absolute bottom-0 inset-x-0 bg-black/55 backdrop-blur-sm text-white/90 text-sm px-3 py-1.5 font-body">
      {children}
    </figcaption>
  );
}
