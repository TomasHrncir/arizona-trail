import { motion } from "framer-motion";
import type { Block } from "../data/blocks";
import { DesertScene } from "./DesertScene";
import { CortenSign } from "./CortenSign";
import { BLOCK_ICONS } from "./BlockIcons";
import { Tumbleweed } from "./Tumbleweed";
import { DustMotes } from "./DustMotes";

export function Hub({
  blocks,
  onOpen,
}: {
  blocks: Block[];
  onOpen: (blockId: string) => void;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-sunset grain">
      {/* Dust particles floating up */}
      <DustMotes />

      {/* Desert horizon */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] pointer-events-none">
        <DesertScene className="w-full h-full" />
      </div>

      {/* Tumbleweeds rolling */}
      <Tumbleweed duration={16} delay={3} size={72} yOffsetPct={87} />
      <Tumbleweed duration={22} delay={12} size={48} yOffsetPct={82} />

      <div className="relative z-10 flex h-full flex-col px-10 py-6">
        <header className="text-center pt-2 pb-2">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="font-display text-white text-5xl md:text-6xl tracking-wide drop-shadow-[0_4px_0_rgba(0,0,0,0.35)] uppercase"
          >
            Arizona Trail
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-1 text-lg text-az-sand italic"
          >
            1 300 kilometrů od Mexika k Utahu — a co jsem si odnesl
          </motion.p>
        </header>

        <main className="flex-1 flex items-center justify-center">
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
                    footer={`${b.slides.length} slidů`}
                    icon={Icon ? <Icon /> : undefined}
                  />
                </motion.button>
              );
            })}
          </div>
        </main>

        <footer className="text-center text-white/70 text-sm pb-1 font-stamp uppercase tracking-widest">
          Klikni na ceduli · šipky ← → mezi slidy · Esc zpět
        </footer>
      </div>
    </div>
  );
}
