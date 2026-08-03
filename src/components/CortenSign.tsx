import { useId } from "react";
import type { ReactNode } from "react";

/**
 * Rusty corten steel plate — the title is laser-cut through the metal,
 * so whatever is behind the plate shines through the letters.
 * Small text ("stamped") sits on top as a normal overlay.
 */
export function CortenSign({
  title,
  subtitle,
  footer,
  icon,
  className = "",
  rotate = 0,
}: {
  title: string;
  subtitle?: string;
  footer?: string;
  icon?: ReactNode;
  className?: string;
  rotate?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const patchesId = `patches-${uid}`;
  const streaksId = `streaks-${uid}`;
  const maskId = `mask-${uid}`;

  return (
    <div
      className={`relative aspect-[3/2] w-full ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        viewBox="0 0 400 260"
        className="absolute inset-0 h-full w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.6)]"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Fine rust grain — small distributed variations */}
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

          {/* Larger cloud-like patches for uneven weathering */}
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

          {/* Cutout mask: white = keep metal, black = cut through */}
          <mask id={maskId}>
            <rect x="0" y="0" width="400" height="260" fill="white" />
            <TitleCutout title={title} />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          {/* Base warm corten color — deeper rust */}
          <rect x="6" y="6" width="388" height="248" rx="10" fill="#8E3D18" />

          {/* Large uneven weathering patches (darker) */}
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

          {/* Lighter oxidized highlight patches */}
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

          {/* Fine sandy grain for surface roughness */}
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

          {/* Vertical shading */}
          <rect
            x="6"
            y="6"
            width="388"
            height="248"
            rx="10"
            fill="url(#shade-vert)"
          />

          {/* Edge lighting */}
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

          {/* Rivets */}
          <Rivet cx={22} cy={22} />
          <Rivet cx={378} cy={22} />
          <Rivet cx={22} cy={238} />
          <Rivet cx={378} cy={238} />
        </g>

        {/* Global gradient defs (shared but harmless if duplicated) */}
        <defs>
          <linearGradient id="shade-vert" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,200,140,0.25)" />
            <stop offset="55%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Stamped overlay: icon top-left, subtitle + count bottom-center */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 pointer-events-none">
        <div className="flex items-start">
          {icon && (
            <div
              className="h-11 w-11 text-[#1A0803]"
              style={{
                filter:
                  "drop-shadow(0 1.5px 0 rgba(255,220,180,0.55)) drop-shadow(0 -1px 0 rgba(0,0,0,0.55))",
              }}
            >
              {icon}
            </div>
          )}
        </div>
        <div className="text-center">
          {subtitle && (
            <div
              className="font-stamp text-[12px] uppercase tracking-[0.18em] text-[#FFE9C7] leading-tight"
              style={{ textShadow: "0 1px 2px rgba(0,0,0,0.75)" }}
            >
              {subtitle}
            </div>
          )}
          {footer && (
            <div
              className="mt-2 font-stamp text-[10px] uppercase tracking-[0.36em] text-[#FFCB8A]"
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

function TitleCutout({ title }: { title: string }) {
  const words = title.trim().split(/\s+/);
  let line1 = title;
  let line2: string | undefined;
  if (words.length > 1 && title.length > 8) {
    const mid = Math.ceil(words.length / 2);
    line1 = words.slice(0, mid).join(" ");
    line2 = words.slice(mid).join(" ");
  }

  const twoLines = Boolean(line2);
  const size = twoLines ? 46 : title.length > 6 ? 58 : 72;

  return (
    <g fontFamily='"Rye", Georgia, serif' fontWeight="400" fill="black">
      {twoLines ? (
        <>
          <text
            x="200"
            y="120"
            textAnchor="middle"
            fontSize={size}
            dominantBaseline="middle"
          >
            {line1.toUpperCase()}
          </text>
          <text
            x="200"
            y="170"
            textAnchor="middle"
            fontSize={size}
            dominantBaseline="middle"
          >
            {line2!.toUpperCase()}
          </text>
        </>
      ) : (
        <text
          x="200"
          y="140"
          textAnchor="middle"
          fontSize={size}
          dominantBaseline="middle"
        >
          {line1.toUpperCase()}
        </text>
      )}
    </g>
  );
}
