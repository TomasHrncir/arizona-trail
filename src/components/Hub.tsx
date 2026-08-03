import { motion } from "framer-motion";
import type { Block } from "../data/blocks";
import { FlagRays } from "./FlagRays";
import { DesertScene } from "./DesertScene";

const accentBg: Record<Block["accent"], string> = {
  red: "from-az-red to-az-rust",
  gold: "from-az-gold to-az-copper",
  blue: "from-az-blue to-az-plum",
  copper: "from-az-copper to-az-rust",
  cactus: "from-az-cactus to-[#3E5D2A]",
  plum: "from-az-plum to-az-night",
  rust: "from-az-rust to-az-red",
};

export function Hub({
  blocks,
  onOpen,
}: {
  blocks: Block[];
  onOpen: (blockId: string) => void;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-sunset grain">
      <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-95">
        <FlagRays className="absolute inset-x-0 bottom-[-50%] w-full h-[200%]" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-95">
        <DesertScene className="w-full h-full" />
      </div>

      <div className="relative z-10 flex h-full flex-col px-10 py-8">
        <header className="text-center pt-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-display text-6xl tracking-wide text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.25)]"
          >
            ARIZONA TRAIL
          </motion.h1>
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-2 text-lg text-az-sand italic"
          >
            1 300 kilometrů od Mexika k Utahu — a co jsem si odnesl
          </motion.p>
        </header>

        <main className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-6xl w-full">
            {blocks.map((b, i) => (
              <motion.button
                key={b.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpen(b.id)}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${accentBg[b.accent]} p-5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/20 backdrop-blur transition-shadow hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]`}
              >
                <div className="text-5xl mb-3 drop-shadow">{b.icon}</div>
                <div className="font-display text-white text-xl leading-tight">
                  {b.title}
                </div>
                {b.subtitle && (
                  <div className="mt-1 text-sm text-white/85 italic">
                    {b.subtitle}
                  </div>
                )}
                <div className="mt-4 text-xs uppercase tracking-widest text-white/70">
                  {b.slides.length} slidů →
                </div>
                <div className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-white/10 blur-xl transition-opacity opacity-0 group-hover:opacity-100" />
              </motion.button>
            ))}
          </div>
        </main>

        <footer className="text-center text-white/70 text-sm pb-2">
          Klikni na blok, pak šipkami ← → mezi slidy. Esc zpět sem.
        </footer>
      </div>
    </div>
  );
}
