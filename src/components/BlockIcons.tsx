import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: "0 0 100 100",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
};

// Rough silhouette of Arizona state with a dotted trail line down its middle.
export function IconArizona(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* Simplified AZ outline */}
      <path d="M15 12 L85 12 L85 55 L92 62 L92 88 L58 88 L52 82 L15 82 Z" />
      {/* Dotted trail cutout — negative space via evenodd */}
      <g fill="rgba(0,0,0,0.4)">
        <circle cx="50" cy="22" r="1.6" />
        <circle cx="52" cy="30" r="1.6" />
        <circle cx="51" cy="38" r="1.6" />
        <circle cx="53" cy="46" r="1.6" />
        <circle cx="55" cy="54" r="1.6" />
        <circle cx="58" cy="62" r="1.6" />
        <circle cx="62" cy="70" r="1.6" />
        <circle cx="66" cy="78" r="1.6" />
      </g>
    </svg>
  );
}

// Sun over horizon (mountain)
export function IconSun(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="50" cy="42" r="16" />
      {/* rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 50 + Math.cos(rad) * 22;
        const y1 = 42 + Math.sin(rad) * 22;
        const x2 = 50 + Math.cos(rad) * 32;
        const y2 = 42 + Math.sin(rad) * 32;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      {/* Horizon mountains */}
      <path d="M2 82 L22 60 L40 78 L60 55 L82 78 L98 68 L98 92 L2 92 Z" />
    </svg>
  );
}

// Water drop
export function IconDrop(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M50 8 C 30 38, 22 55, 22 66 C 22 82, 34 92, 50 92 C 66 92, 78 82, 78 66 C 78 55, 70 38, 50 8 Z" />
    </svg>
  );
}

// Simple tortilla/wrap seen from side
export function IconFood(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 55 C 30 44, 70 44, 88 55 L 82 74 C 66 82, 34 82, 18 74 Z" />
      <path
        d="M20 62 C 40 55, 60 55, 80 62"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

// Lizard silhouette (side view, tail curled)
export function IconLizard(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* body + head + tail curved */}
      <path d="M78 46
              Q 88 44 90 52
              Q 90 58 82 58
              L 70 60
              Q 60 66 44 62
              Q 30 60 22 68
              Q 14 76 20 84
              Q 26 90 32 82
              Q 34 78 30 74
              Q 34 70 44 74
              Q 60 78 74 68
              Q 82 66 82 58 Z" />
      {/* front leg */}
      <path d="M56 62 L 52 78 L 60 78 L 62 66 Z" />
      {/* back leg */}
      <path d="M32 66 L 26 82 L 34 82 L 38 68 Z" />
      {/* eye */}
      <circle cx="84" cy="50" r="1.6" fill="rgba(255,220,180,0.9)" />
    </svg>
  );
}

// Cowboy hat
export function IconHat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M28 58 C 30 40, 34 30, 40 26 C 44 24, 46 32, 46 42 L 54 42 C 54 32, 56 24, 60 26 C 66 30, 70 40, 72 58 Z" />
      <path d="M8 60 C 22 68, 78 68, 92 60 C 82 74, 18 74, 8 60 Z" />
      <path
        d="M28 58 L 72 58"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

// Lightning bolt
export function IconBolt(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M56 8 L26 54 L46 54 L38 92 L74 42 L52 42 Z" />
    </svg>
  );
}

// Backpack
export function IconPack(props: IconProps) {
  return (
    <svg {...base} {...props}>
      {/* strap loop */}
      <path
        d="M42 16 C 42 8, 58 8, 58 16"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      {/* main body */}
      <rect x="24" y="20" width="52" height="66" rx="10" />
      {/* pocket */}
      <rect x="34" y="50" width="32" height="22" rx="4" fill="rgba(0,0,0,0.28)" />
      {/* buckle line */}
      <rect x="34" y="34" width="32" height="4" fill="rgba(0,0,0,0.28)" />
    </svg>
  );
}

export const BLOCK_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  intro: IconArizona,
  den: IconSun,
  voda: IconDrop,
  strava: IconFood,
  zvirata: IconLizard,
  lide: IconHat,
  prihody: IconBolt,
  vybaveni: IconPack,
};
