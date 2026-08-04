import type { ComponentType, SVGProps } from "react";
import type { Slide as SlideType } from "../data/blocks";

type IconComp = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Presentation slide.
 * Design goals:
 *  - Big, high-contrast white text (readable during projection)
 *  - Generous padding, single measure column for text (~65ch)
 *  - Rye for display, Fraunces for body
 *  - Consistent max-width, centered
 */
export function Slide({
  slide,
  blockIcon,
}: {
  slide: SlideType;
  blockIcon?: IconComp;
}) {
  switch (slide.layout) {
    case "title":
      return <TitleSlide slide={slide} blockIcon={blockIcon} />;
    case "text":
      return <TextSlide slide={slide} blockIcon={blockIcon} />;
    case "text-image":
      return <TextImageSlide slide={slide} />;
    case "image":
      return <ImageSlide slide={slide} />;
    case "video":
      return <VideoSlide slide={slide} />;
    case "quote":
      return <QuoteSlide slide={slide} />;
    case "stats":
      return <StatsSlide slide={slide} blockIcon={blockIcon} />;
    default:
      return <TextSlide slide={slide} blockIcon={blockIcon} />;
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
      className={`h-full w-full flex items-center justify-center px-16 md:px-24 py-10 ${className}`}
    >
      <div className="w-full max-w-5xl">{children}</div>
    </div>
  );
}

/** Big gold block-icon rendered above the title on every slide that has one. */
function BlockBadge({ Icon }: { Icon: IconComp }) {
  return (
    <div
      className="mb-6 md:mb-8 h-20 w-20 md:h-24 md:w-24 mx-auto text-az-gold"
      style={{
        filter:
          "drop-shadow(0 2px 0 rgba(0,0,0,0.5)) drop-shadow(0 6px 16px rgba(0,0,0,0.35))",
      }}
    >
      <Icon />
    </div>
  );
}

/* ------------------------------- variants ------------------------------ */

function TitleSlide({
  slide,
  blockIcon: Icon,
}: {
  slide: SlideType;
  blockIcon?: IconComp;
}) {
  return (
    <Stage className="text-center">
      <div className="flex flex-col items-center">
        {Icon && <BlockBadge Icon={Icon} />}
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

function TextSlide({
  slide,
  blockIcon: Icon,
}: {
  slide: SlideType;
  blockIcon?: IconComp;
}) {
  return (
    <Stage>
      <div className="flex flex-col items-center text-center">
        {Icon && <BlockBadge Icon={Icon} />}
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
          <p className="mt-8 font-body text-white text-2xl md:text-3xl leading-relaxed max-w-4xl">
            {slide.body}
          </p>
        )}
      </div>
    </Stage>
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
      {(slide.title || slide.caption) && (
        <div className="text-center mt-6">
          {slide.title && (
            <div className="font-display text-white text-3xl uppercase">
              {slide.title}
            </div>
          )}
          {slide.caption && (
            <div className="font-body text-az-sand italic text-lg mt-2">
              {slide.caption}
            </div>
          )}
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
      {(slide.title || slide.caption) && (
        <div className="text-center mt-6">
          {slide.title && (
            <div className="font-display text-white text-3xl uppercase">
              {slide.title}
            </div>
          )}
          {slide.caption && (
            <div className="font-body text-az-sand italic text-lg mt-2">
              {slide.caption}
            </div>
          )}
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

function StatsSlide({
  slide,
  blockIcon: Icon,
}: {
  slide: SlideType;
  blockIcon?: IconComp;
}) {
  return (
    <Stage className="text-center">
      <div className="flex flex-col items-center">
        {Icon && <BlockBadge Icon={Icon} />}
        {slide.title && (
          <h2
            className="font-display text-white text-5xl md:text-6xl mb-12 uppercase"
            style={{ textShadow: "0 3px 0 rgba(0,0,0,0.35)" }}
          >
            {slide.title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {slide.stats?.map((s, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white/10 backdrop-blur px-6 py-10 text-center ring-1 ring-white/20"
            >
              <div className="font-display text-az-gold text-4xl md:text-5xl leading-tight">
                {s.value}
              </div>
              <div className="mt-3 font-body text-white/90 italic text-lg">
                {s.label}
              </div>
            </div>
          ))}
        </div>
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
