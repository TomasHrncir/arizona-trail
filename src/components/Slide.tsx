import { useMemo, useState } from "react";
import type { MediaItem, Slide as SlideType } from "../data/blocks";
import { MediaTile } from "./MediaTile";
import { Lightbox, type LightboxImage } from "./Lightbox";

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
    <div
      className={`h-full w-full flex items-center justify-center px-12 md:px-16 py-8 ${className}`}
    >
      <div className="w-full max-w-6xl">{children}</div>
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
  const images: LightboxImage[] = useMemo(
    () =>
      media
        .filter((m): m is Extract<MediaItem, { kind: "image" }> => m.kind === "image")
        .map((m) => ({ src: m.src, alt: m.alt })),
    [media],
  );
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const openImage = (src: string) => {
    const i = images.findIndex((im) => im.src === src);
    setOpenIdx(i >= 0 ? i : null);
  };

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
                <p key={i}>{para}</p>
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

        <MediaGrid items={media} onOpenImage={openImage} />
      </div>

      <Lightbox
        images={images}
        index={openIdx}
        onClose={() => setOpenIdx(null)}
        onChange={setOpenIdx}
      />
    </Stage>
  );
}

function MediaGrid({
  items,
  onOpenImage,
}: {
  items: MediaItem[];
  onOpenImage: (src: string, alt?: string) => void;
}) {
  const slots: (MediaItem | undefined)[] = [
    items[0],
    items[1],
    items[2],
    items[3],
  ];
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {slots.map((it, i) => (
        <MediaTile key={i} item={it} onOpenImage={onOpenImage} />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
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
      </div>
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
