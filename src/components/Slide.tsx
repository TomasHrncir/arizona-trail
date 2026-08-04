import { useMemo, useState } from "react";
import type { MediaItem, Slide as SlideType } from "../data/blocks";
import { MediaTile } from "./MediaTile";
import { Lightbox, type LightboxItem } from "./Lightbox";
import { LighterPack } from "./LighterPack";

/**
 * Presentation slide.
 * Design goals:
 *  - Big, high-contrast white text (readable during projection)
 *  - Generous padding, single measure column for text (~65ch)
 *  - Rye for display, Fraunces for body
 *  - Consistent max-width, centered
 */
export function Slide({ slide }: { slide: SlideType }) {
  switch (slide.layout) {
    case "title":
      return <TitleSlide slide={slide} />;
    case "text":
      return <TextSlide slide={slide} />;
    case "text-image":
      return <TextImageSlide slide={slide} />;
    case "image":
      return <ImageSlide slide={slide} />;
    case "video":
      return <VideoSlide slide={slide} />;
    case "quote":
      return <QuoteSlide slide={slide} />;
    case "stats":
      return <StatsSlide slide={slide} />;
    default:
      return <TextSlide slide={slide} />;
  }
}

/* ----------------------------- shared shell ----------------------------- */

function Stage({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="h-full w-full overflow-y-auto">
      <div
        className={`min-h-full w-full flex items-center justify-center px-12 md:px-16 py-8 ${className}`}
      >
        <div className="w-full max-w-6xl">{children}</div>
      </div>
    </div>
  );
}

/* ------------------------------- variants ------------------------------ */

function TitleSlide({ slide }: { slide: SlideType }) {
  return (
    <Stage className="text-center">
      <div className="flex flex-col items-center">
        <h1
          className="font-display text-white text-6xl md:text-8xl leading-[0.95] tracking-wide uppercase"
          style={{
            textShadow:
              "0 4px 0 rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.55)",
          }}
        >
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="mt-8 font-body text-2xl md:text-3xl italic text-az-sand max-w-3xl leading-snug">
            {slide.subtitle}
          </p>
        )}
        <div className="mt-10 h-1 w-32 rounded bg-az-gold" />
      </div>
    </Stage>
  );
}

function TextSlide({ slide }: { slide: SlideType }) {
  const media = slide.media ?? [];
  const hasMedia = media.length > 0;

  // All media (images + videos) are shown in the lightbox in slide order.
  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      media.map((m) => {
        if (m.kind === "image")
          return { kind: "image" as const, src: m.src, alt: m.alt };
        if (m.kind === "video")
          return { kind: "video" as const, src: m.src };
        return { kind: "instagram" as const, src: m.src };
      }),
    [media],
  );
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const openMedia = (src: string) => {
    const i = lightboxItems.findIndex((it) => it.src === src);
    setOpenIdx(i >= 0 ? i : null);
  };

  // No media → center text alone, no grid, no placeholders.
  if (!hasMedia && !slide.lighterpack) {
    return (
      <Stage className="text-center">
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          {slide.title && (
            <h2
              className="font-display text-white text-5xl md:text-6xl leading-tight uppercase"
              style={{
                textShadow:
                  "0 3px 0 rgba(0,0,0,0.35), 0 6px 20px rgba(0,0,0,0.5)",
              }}
            >
              {slide.title}
            </h2>
          )}
          {slide.body && (
            <div className="mt-8 font-body text-white text-xl md:text-2xl leading-relaxed space-y-4">
              {slide.body.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          )}
          {slide.source && (
            <a
              href={slide.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 font-stamp text-xs uppercase tracking-widest text-az-gold/90 hover:text-az-gold underline decoration-az-gold/40 hover:decoration-az-gold underline-offset-4"
            >
              zdroj: {slide.source.label ?? new URL(slide.source.url).hostname}
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </Stage>
    );
  }

  return (
    <Stage>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 md:gap-14 items-center">
        <div className="text-left">
          {slide.title && (
            <h2
              className="font-display text-white text-4xl md:text-5xl leading-tight uppercase"
              style={{
                textShadow:
                  "0 3px 0 rgba(0,0,0,0.35), 0 6px 20px rgba(0,0,0,0.5)",
              }}
            >
              {slide.title}
            </h2>
          )}
          {slide.body && (
            <div className="mt-6 font-body text-white text-lg md:text-xl leading-relaxed space-y-4">
              {slide.body.split(/\n{2,}/).map((para, i) => (
                <p key={i} className="whitespace-pre-line">
                  {para}
                </p>
              ))}
            </div>
          )}
          {slide.source && (
            <a
              href={slide.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 font-stamp text-xs uppercase tracking-widest text-az-gold/90 hover:text-az-gold underline decoration-az-gold/40 hover:decoration-az-gold underline-offset-4"
            >
              zdroj: {slide.source.label ?? new URL(slide.source.url).hostname}
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>

        <MediaGrid items={media} onOpen={openMedia} />
      </div>

      {slide.lighterpack && (
        <div className="mt-8 w-full">
          <LighterPack id={slide.lighterpack} />
        </div>
      )}

      <Lightbox
        items={lightboxItems}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onChange={setOpenIdx}
      />
    </Stage>
  );
}

function MediaGrid({
  items,
  onOpen,
}: {
  items: MediaItem[];
  onOpen: (src: string) => void;
}) {
  // No media specified → keep 4 placeholders (authoring hint).
  if (items.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {[0, 1, 2, 3].map((i) => (
          <MediaTile key={i} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  // 1 item — a single big tile
  if (items.length === 1) {
    return (
      <div className="grid grid-cols-1">
        <MediaTile item={items[0]} onOpen={onOpen} />
      </div>
    );
  }

  // 2 items — stacked vertically to fill the height next to the text
  if (items.length === 2) {
    return (
      <div className="grid grid-cols-1 gap-4 md:gap-5">
        {items.map((it, i) => (
          <MediaTile key={i} item={it} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  // 3 items — one big on the left spanning both rows, two stacked on the right
  if (items.length === 3) {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-4 md:gap-5 [grid-auto-flow:row_dense]">
        <div className="row-span-2 h-full">
          <div className="h-full">
            <MediaTile item={items[0]} onOpen={onOpen} />
          </div>
        </div>
        <MediaTile item={items[1]} onOpen={onOpen} />
        <MediaTile item={items[2]} onOpen={onOpen} />
      </div>
    );
  }

  // 4 items — clean 2×2 grid
  if (items.length === 4) {
    return (
      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {items.map((it, i) => (
          <MediaTile key={i} item={it} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  // 5–6 items — 3 columns
  if (items.length <= 6) {
    return (
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {items.map((it, i) => (
          <MediaTile key={i} item={it} onOpen={onOpen} />
        ))}
      </div>
    );
  }

  // 7+ items — 3 columns, more compact gaps
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((it, i) => (
        <MediaTile key={i} item={it} onOpen={onOpen} />
      ))}
    </div>
  );
}

function TextImageSlide({ slide }: { slide: SlideType }) {
  return (
    <Stage>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          {slide.title && (
            <h2
              className="font-display text-white text-4xl md:text-5xl leading-tight uppercase"
              style={{ textShadow: "0 3px 0 rgba(0,0,0,0.35)" }}
            >
              {slide.title}
            </h2>
          )}
          {slide.body && (
            <p className="mt-6 font-body text-white text-xl md:text-2xl leading-relaxed">
              {slide.body}
            </p>
          )}
        </div>
        <div className="rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl aspect-[4/3] bg-black/30">
          {slide.image ? (
            <img
              src={slide.image}
              alt={slide.imageAlt ?? ""}
              className="w-full h-full object-cover"
            />
          ) : (
            <Placeholder label="obrázek" />
          )}
        </div>
      </div>
    </Stage>
  );
}

function ImageSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full flex flex-col p-12">
      <div className="flex-1 rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-black/30">
        {slide.image ? (
          <img
            src={slide.image}
            alt={slide.imageAlt ?? ""}
            className="w-full h-full object-cover"
          />
        ) : (
          <Placeholder label="obrázek" />
        )}
      </div>
      {slide.title && (
        <div className="text-center mt-6">
          <div className="font-display text-white text-3xl uppercase">
            {slide.title}
          </div>
        </div>
      )}
    </div>
  );
}

function VideoSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full flex flex-col p-12">
      <div className="flex-1 rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-black">
        {slide.video ? (
          <video
            src={slide.video}
            controls
            className="w-full h-full object-contain bg-black"
          />
        ) : (
          <Placeholder label="video" />
        )}
      </div>
      {slide.title && (
        <div className="text-center mt-6">
          <div className="font-display text-white text-3xl uppercase">
            {slide.title}
          </div>
        </div>
      )}
    </div>
  );
}

function QuoteSlide({ slide }: { slide: SlideType }) {
  return (
    <Stage className="text-center">
      <div className="flex flex-col items-center">
        <div className="font-display text-[8rem] leading-none text-az-gold/60">
          "
        </div>
        <blockquote className="font-body italic text-white text-3xl md:text-4xl max-w-4xl leading-snug -mt-6">
          {slide.quote}
        </blockquote>
        {slide.quoteBy && (
          <div className="mt-8 font-stamp uppercase tracking-widest text-az-sand text-base">
            — {slide.quoteBy}
          </div>
        )}
      </div>
    </Stage>
  );
}

function StatsSlide({ slide }: { slide: SlideType }) {
  const media = slide.media ?? [];
  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      media.map((m) => {
        if (m.kind === "image")
          return { kind: "image" as const, src: m.src, alt: m.alt };
        if (m.kind === "video")
          return { kind: "video" as const, src: m.src };
        return { kind: "instagram" as const, src: m.src };
      }),
    [media],
  );
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const openMedia = (src: string) => {
    const i = lightboxItems.findIndex((it) => it.src === src);
    setOpenIdx(i >= 0 ? i : null);
  };

  return (
    <Stage className="text-center">
      <div className="flex flex-col items-center">
        {slide.title && (
          <h2
            className="font-display text-white text-4xl md:text-5xl mb-6 uppercase"
            style={{ textShadow: "0 3px 0 rgba(0,0,0,0.35)" }}
          >
            {slide.title}
          </h2>
        )}
        <div
          className={`grid grid-cols-1 gap-4 md:gap-6 w-full mx-auto ${
            slide.stats && slide.stats.length === 1
              ? "md:grid-cols-1 max-w-md"
              : slide.stats && slide.stats.length === 2
                ? "md:grid-cols-2 max-w-3xl"
                : "md:grid-cols-3"
          }`}
        >
          {slide.stats?.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/10 backdrop-blur px-4 py-6 text-center ring-1 ring-white/20"
            >
              <div className="font-display text-az-gold text-3xl md:text-4xl leading-tight">
                {s.value}
              </div>
              <div className="mt-2 font-body text-white/90 italic text-base">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        {slide.mapEmbed && (
          <div className="mt-6 w-full rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-black/30 aspect-[16/8]">
            <iframe
              src={slide.mapEmbed}
              title="Mapa trasy"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              /* No allow-top-navigation → iframe cannot redirect the whole tab */
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              allowFullScreen
            />
          </div>
        )}
        {media.length > 0 && (
          <div className="mt-6 w-full max-w-4xl">
            <MediaGrid items={media} onOpen={openMedia} />
          </div>
        )}
      </div>

      <Lightbox
        items={lightboxItems}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onChange={setOpenIdx}
      />
    </Stage>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-white/50 italic font-body">
      [ {label} — přidej do slide.image / slide.video ]
    </div>
  );
}
