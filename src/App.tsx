import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Hub } from "./components/Hub";
import { BlockView } from "./components/BlockView";
import { blocks } from "./data/blocks";
import "./App.css";

function App() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = activeId ? blocks.find((b) => b.id === activeId) : null;

  return (
    <div className="h-full w-full">
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={`block-${active.id}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35 }}
            className="h-full w-full"
          >
            <BlockView block={active} onBack={() => setActiveId(null)} />
          </motion.div>
        ) : (
          <motion.div
            key="hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Hub blocks={blocks} onOpen={(id) => setActiveId(id)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
