import { useState } from "react";
import { motion } from "framer-motion";
import type { Block } from "../data/blocks";
import { DesertScene } from "./DesertScene";
import { CortenSign } from "./CortenSign";
import { BLOCK_ICONS } from "./BlockIcons";
import { Tumbleweed } from "./Tumbleweed";
import { DustMotes } from "./DustMotes";
import { PosterSky } from "./PosterSky";
import { Lightbox, type LightboxItem } from "./Lightbox";

const COW_REEL: LightboxItem = {
  kind: "instagram",
  src: "https://www.instagram.com/p/DZkrf6Ftdgx/",
};

export function Hub({
  blocks,
  onOpen,
}: {
  blocks: Block[];
  onOpen: (blockId: string) => void;
}) {
  const [cowOpen, setCowOpen] = useState(false);

  return (
    <div
      className="relative h-full w-full overflow-hidden grain"
      style={{
        background:
          "linear-gradient(180deg, #B8CFC4 0%, #C4D6C9 45%, #D9C5A6 62%, #E4B98A 74%, #D9944A 100%)",
      }}
    >
      {/* Sky with sun + stars + cloud bands */}
      <div className="absolute inset-0 pointer-events-none">
        <PosterSky className="w-full h-full" />
      </div>

      {/* Dust particles floating up */}
      <DustMotes />

      {/* Desert horizon (Monument Valley mesas + cacti + agaves).
          Cow inside is clickable — opens IG reel in the lightbox. */}
      <div className="absolute inset-x-0 bottom-0 h-[55%] pointer-events-none">
        <DesertScene
          className="w-full h-full"
          onCowClick={() => setCowOpen(true)}
        />
      </div>

      {/* Tumbleweeds rolling */}
      <Tumbleweed duration={16} delay={3} size={72} yOffsetPct={87} />
      <Tumbleweed duration={22} delay={12} size={48} yOffsetPct={82} />

      <div className="relative z-10 flex h-full flex-col justify-center items-center px-10 py-6">
        <header className="text-center mb-[100px]">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="font-display text-[#4A2418] text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase leading-none"
            style={{ textShadow: "0 2px 0 rgba(255,240,215,0.55)" }}
          >
            Arizona Trail
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-2 text-lg md:text-xl italic text-[#5C3520]"
          >
            1 000 km od Mexika k Utahu
          </motion.p>
        </header>

        <main className="w-full flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-6xl w-full">
            {blocks.map((b, i) => {
              const Icon = BLOCK_ICONS[b.id];
              return (
                <motion.button
                  key={b.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpen(b.id)}
                  className="group focus:outline-none focus-visible:ring-4 focus-visible:ring-az-gold/60 rounded-2xl"
                  aria-label={`${b.title} — ${b.slides.length} slidů`}
                >
                  <CortenSign
                    title={b.title}
                    subtitle={b.subtitle}
                    icon={Icon ? <Icon /> : undefined}
                  />
                </motion.button>
              );
            })}
          </div>
        </main>
      </div>

      <Lightbox
        items={[COW_REEL]}
        index={cowOpen ? 0 : null}
        onClose={() => setCowOpen(false)}
        onChange={() => undefined}
      />
    </div>
  );
}
