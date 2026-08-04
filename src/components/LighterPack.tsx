import { useEffect, useRef, useState } from "react";

/**
 * LighterPack gear list embed.
 * Injects lighterpack.com/e/<id> script which renders into a matching <div id="<id>">.
 * Their script only runs once — we reload it if the id changes.
 */
export function LighterPack({ id }: { id: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    setFailed(false);
    // Clean any previous render (StrictMode / navigation)
    containerRef.current.innerHTML = "";
    const script = document.createElement("script");
    script.src = `https://lighterpack.com/e/${id}`;
    script.async = true;
    script.onerror = () => setFailed(true);
    // LighterPack looks up by document.getElementById(id) so leave the div in DOM
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [id]);

  return (
    <div className="w-full mt-4 rounded-2xl bg-white/95 text-[#1a1a1a] shadow-2xl ring-1 ring-white/20 overflow-hidden">
      <div className="p-4 md:p-6">
        <div id={id} ref={containerRef} />
        {failed && (
          <a
            href={`https://lighterpack.com/r/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center font-stamp uppercase tracking-widest text-sm text-blue-600 underline"
          >
            Otevřít gear list na LighterPack ↗
          </a>
        )}
      </div>
    </div>
  );
}
