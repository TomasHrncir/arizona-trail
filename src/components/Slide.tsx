import type { Slide as SlideType } from "../data/blocks";

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

function TitleSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-12">
      <h1 className="font-display text-white text-7xl md:text-8xl leading-none drop-shadow-[0_6px_0_rgba(0,0,0,0.3)]">
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="mt-6 text-2xl italic text-az-sand max-w-3xl">
          {slide.subtitle}
        </p>
      )}
      <div className="mt-10 h-1 w-32 rounded bg-az-gold" />
    </div>
  );
}

function TextSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full flex flex-col justify-center px-16 max-w-5xl mx-auto">
      {slide.title && (
        <h2 className="font-display text-white text-5xl md:text-6xl mb-6">
          {slide.title}
        </h2>
      )}
      {slide.body && (
        <p className="text-2xl leading-relaxed text-az-sand max-w-3xl">
          {slide.body}
        </p>
      )}
    </div>
  );
}

function TextImageSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full grid grid-cols-2 gap-10 items-center px-16">
      <div>
        {slide.title && (
          <h2 className="font-display text-white text-5xl mb-4">{slide.title}</h2>
        )}
        {slide.body && (
          <p className="text-xl leading-relaxed text-az-sand">{slide.body}</p>
        )}
      </div>
      <div className="rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl aspect-[4/3] bg-black/20">
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
  );
}

function ImageSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full flex flex-col p-10">
      <div className="flex-1 rounded-3xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-black/20">
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
        <div className="text-center mt-4">
          {slide.title && (
            <div className="font-display text-white text-3xl">{slide.title}</div>
          )}
          {slide.caption && (
            <div className="text-az-sand italic mt-1">{slide.caption}</div>
          )}
        </div>
      )}
    </div>
  );
}

function VideoSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full flex flex-col p-10">
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
        <div className="text-center mt-4">
          {slide.title && (
            <div className="font-display text-white text-3xl">{slide.title}</div>
          )}
          {slide.caption && (
            <div className="text-az-sand italic mt-1">{slide.caption}</div>
          )}
        </div>
      )}
    </div>
  );
}

function QuoteSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center px-16">
      <div className="text-9xl leading-none text-az-gold/60 font-display">"</div>
      <blockquote className="font-body italic text-white text-4xl max-w-4xl -mt-6">
        {slide.quote}
      </blockquote>
      {slide.quoteBy && (
        <div className="mt-6 text-az-sand text-xl">— {slide.quoteBy}</div>
      )}
    </div>
  );
}

function StatsSlide({ slide }: { slide: SlideType }) {
  return (
    <div className="h-full flex flex-col justify-center items-center px-16">
      {slide.title && (
        <h2 className="font-display text-white text-5xl mb-10 text-center">
          {slide.title}
        </h2>
      )}
      <div className="grid grid-cols-3 gap-8 max-w-5xl w-full">
        {slide.stats?.map((s, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white/10 backdrop-blur px-6 py-8 text-center ring-1 ring-white/20"
          >
            <div className="font-display text-az-gold text-4xl md:text-5xl leading-tight">
              {s.value}
            </div>
            <div className="mt-2 text-az-sand italic">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center text-white/50 italic">
      [ {label} — přidej do slide.image / slide.video ]
    </div>
  );
}
