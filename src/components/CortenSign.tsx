import { useId } from "react";
import type { ReactNode } from "react";

/**
 * Rusty corten steel plate.
 * Title, subtitle and footer are rendered as HTML overlay for maximum readability.
 * SVG handles only the plate itself: rust texture + rivets.
 */
export function CortenSign({
  title,
  subtitle,
  footer,
  icon,
  className = "",
}: {
  title: string;
  subtitle?: string;
  footer?: string;
  icon?: ReactNode;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const patchesId = `patches-${uid}`;
  const streaksId = `streaks-${uid}`;

  // Adjust title size to word count so long titles still fit
  const words = title.trim().split(/\s+/);
  const titleClass =
    words.length >= 4
      ? "text-lg md:text-xl"
      : words.length === 3
      ? "text-xl md:text-2xl"
      : words.length === 2
      ? "text-2xl md:text-3xl"
      : "text-3xl md:text-4xl";

  return (
    <div className={`relative aspect-[3/2] w-full ${className}`}>
      <svg
        viewBox="0 0 400 260"
        className="absolute inset-0 h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.6)]"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id={patchesId} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed={(uid.length * 7) % 100}
            />
            <feColorMatrix
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.6 0"
            />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>

          <filter id={streaksId} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves="3"
              seed={(uid.length + 11) % 50}
            />
            <feColorMatrix
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1.4 -0.5"
            />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>

          <linearGradient id={`shade-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,200,140,0.25)" />
            <stop offset="55%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </linearGradient>
        </defs>

        <rect x="6" y="6" width="388" height="248" rx="10" fill="#8E3D18" />
        <rect
          x="6"
          y="6"
          width="388"
          height="248"
          rx="10"
          fill="#3E1508"
          filter={`url(#${streaksId})`}
          opacity="0.75"
        />
        <rect
          x="6"
          y="6"
          width="388"
          height="248"
          rx="10"
          fill="#C96A2A"
          filter={`url(#${streaksId})`}
          opacity="0.6"
          transform="translate(24 12)"
        />
        <rect
          x="6"
          y="6"
          width="388"
          height="248"
          rx="10"
          fill="#2A0F04"
          filter={`url(#${patchesId})`}
          opacity="0.35"
        />
        <rect
          x="6"
          y="6"
          width="388"
          height="248"
          rx="10"
          fill={`url(#shade-${uid})`}
        />

        <rect
          x="6"
          y="6"
          width="388"
          height="248"
          rx="10"
          fill="none"
          stroke="rgba(255,180,110,0.35)"
          strokeWidth="1.2"
        />
        <rect
          x="8"
          y="8"
          width="384"
          height="244"
          rx="9"
          fill="none"
          stroke="rgba(0,0,0,0.6)"
          strokeWidth="1"
        />

        <Rivet cx={22} cy={22} />
        <Rivet cx={378} cy={22} />
        <Rivet cx={22} cy={238} />
        <Rivet cx={378} cy={238} />
      </svg>

      {/* HTML overlay: icon (top-center), title (centered), subtitle + footer (bottom) */}
      <div className="absolute inset-0 flex flex-col p-4 pointer-events-none">
        <div className="flex items-start justify-center h-9">
          {icon && (
            <div
              className="h-9 w-9 text-[#1A0803]"
              style={{
                filter:
                  "drop-shadow(0 1px 0 rgba(255,220,180,0.55)) drop-shadow(0 -1px 0 rgba(0,0,0,0.55))",
              }}
            >
              {icon}
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center px-2 min-h-0">
          <h3
            className={`font-display text-white text-center leading-[1.05] uppercase ${titleClass}`}
            style={{
              textShadow:
                "0 2px 0 rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.55)",
            }}
          >
            {title}
          </h3>
        </div>

        <div className="text-center pt-1">
          {subtitle && (
            <div
              className="font-stamp text-[11px] uppercase tracking-[0.18em] text-[#FFE9C7] leading-tight"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.75)" }}
            >
              {subtitle}
            </div>
          )}
          {footer && (
            <div
              className="mt-1.5 font-stamp text-[9px] uppercase tracking-[0.36em] text-[#FFCB8A]"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.7)" }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Rivet({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#1F0A03" />
      <circle cx={cx - 1} cy={cy - 1} r={4} fill="#6C2E10" />
      <circle cx={cx - 1.5} cy={cy - 1.5} r={1.5} fill="#B36130" opacity="0.7" />
    </g>
  );
}
