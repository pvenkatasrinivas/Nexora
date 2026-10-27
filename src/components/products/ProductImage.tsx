import type { ProductIcon } from "@/types";

// Draws a product picture with SVG shapes on a coloured background.
// Using drawings instead of photo files means pictures can never be "broken",
// and they stay sharp on every screen size.

const CREAM = "#FFF7E6";

/** One simple drawing per icon, on a 200 x 200 canvas. */
function IconShapes({ icon, color }: { icon: ProductIcon; color: string }) {
  switch (icon) {
    case "headphones":
      return (
        <g>
          <path d="M60 116 A40 40 0 0 1 140 116" fill="none" stroke={CREAM} strokeWidth="12" strokeLinecap="round" />
          <rect x="46" y="104" width="28" height="46" rx="12" fill={CREAM} />
          <rect x="126" y="104" width="28" height="46" rx="12" fill={CREAM} />
        </g>
      );
    case "watch":
      return (
        <g>
          <rect x="84" y="38" width="32" height="124" rx="10" fill={CREAM} opacity="0.6" />
          <circle cx="100" cy="100" r="38" fill={CREAM} />
          <circle cx="100" cy="100" r="29" fill={color} />
          <path d="M100 100 V80 M100 100 L114 108" stroke={CREAM} strokeWidth="5" strokeLinecap="round" />
        </g>
      );
    case "phone":
      return (
        <g>
          <rect x="66" y="36" width="68" height="128" rx="14" fill={CREAM} />
          <rect x="75" y="50" width="50" height="92" rx="5" fill={color} opacity="0.85" />
          <circle cx="100" cy="153" r="4" fill={color} />
        </g>
      );
    case "speaker":
      return (
        <g>
          <rect x="62" y="42" width="76" height="116" rx="18" fill={CREAM} />
          <circle cx="100" cy="118" r="24" fill={color} />
          <circle cx="100" cy="118" r="9" fill={CREAM} />
          <circle cx="100" cy="70" r="10" fill={color} />
        </g>
      );
    case "tshirt":
      return (
        <path
          d="M72 50 L88 44 Q100 58 112 44 L128 50 L156 76 L140 94 L130 86 L130 158 L70 158 L70 86 L60 94 L44 76 Z"
          fill={CREAM}
        />
      );
    case "sneaker":
      return (
        <g>
          <path d="M40 124 L42 90 Q62 92 78 78 L94 96 Q122 104 150 112 Q164 117 164 132 L164 138 L40 138 Z" fill={CREAM} />
          <rect x="38" y="140" width="128" height="10" rx="5" fill={CREAM} opacity="0.7" />
          <path d="M84 96 L94 88 M96 101 L106 93 M108 105 L118 97" stroke={color} strokeWidth="4" strokeLinecap="round" />
        </g>
      );
    case "bag":
      return (
        <g>
          <path d="M80 82 V66 Q80 50 100 50 Q120 50 120 66 V82" fill="none" stroke={CREAM} strokeWidth="9" strokeLinecap="round" />
          <rect x="54" y="78" width="92" height="82" rx="10" fill={CREAM} />
          <rect x="54" y="98" width="92" height="8" fill={color} opacity="0.35" />
        </g>
      );
    case "lamp":
      return (
        <g>
          <path d="M76 52 H124 L140 96 H60 Z" fill={CREAM} />
          <rect x="95" y="96" width="10" height="56" fill={CREAM} opacity="0.8" />
          <rect x="70" y="150" width="60" height="12" rx="6" fill={CREAM} />
          <path d="M80 106 L70 124 M120 106 L130 124" stroke={CREAM} strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        </g>
      );
    case "mug":
      return (
        <g>
          <path d="M86 40 Q80 50 86 58 M102 36 Q96 48 102 58" fill="none" stroke={CREAM} strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          <rect x="58" y="68" width="68" height="84" rx="12" fill={CREAM} />
          <path d="M126 86 H138 Q150 86 150 102 V112 Q150 128 138 128 H126" fill="none" stroke={CREAM} strokeWidth="10" />
        </g>
      );
    case "plant":
      return (
        <g>
          <path d="M100 118 Q76 92 84 48 Q104 84 100 118" fill={CREAM} opacity="0.9" />
          <path d="M100 118 Q126 96 128 60 Q104 84 100 118" fill={CREAM} opacity="0.75" />
          <path d="M100 118 Q70 112 56 82 Q90 90 100 118" fill={CREAM} opacity="0.6" />
          <path d="M66 118 H134 L124 162 H76 Z" fill={CREAM} />
        </g>
      );
    case "bottle":
      return (
        <g>
          <rect x="88" y="34" width="24" height="16" rx="4" fill={CREAM} opacity="0.75" />
          <rect x="92" y="48" width="16" height="14" fill={CREAM} />
          <rect x="70" y="60" width="60" height="104" rx="16" fill={CREAM} />
          <rect x="70" y="94" width="60" height="34" fill={color} opacity="0.4" />
        </g>
      );
    case "dumbbell":
      return (
        <g>
          <rect x="48" y="94" width="104" height="12" rx="5" fill={CREAM} />
          <rect x="40" y="70" width="20" height="60" rx="6" fill={CREAM} />
          <rect x="140" y="70" width="20" height="60" rx="6" fill={CREAM} />
          <rect x="62" y="80" width="12" height="40" rx="4" fill={CREAM} opacity="0.75" />
          <rect x="126" y="80" width="12" height="40" rx="4" fill={CREAM} opacity="0.75" />
        </g>
      );
    case "book":
      return (
        <g>
          <rect x="58" y="42" width="88" height="116" rx="6" fill={CREAM} />
          <rect x="58" y="42" width="16" height="116" fill={color} opacity="0.3" />
          <path d="M88 70 H130 M88 84 H124" stroke={color} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        </g>
      );
  }
}

interface ProductImageProps {
  icon: ProductIcon;
  color: string;
  /** Text read out by screen readers, usually the product name. Leave empty for decorative use. */
  label?: string;
  /** Fill the parent box completely (cropping the edges), like CSS object-fit: cover. */
  cover?: boolean;
  className?: string;
}

export default function ProductImage({ icon, color, label, cover = false, className = "" }: ProductImageProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio={cover ? "xMidYMid slice" : undefined}
      className={`block w-full ${cover ? "h-full" : "h-auto"} ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <rect width="200" height="200" fill={color} />
      {/* soft circle in the corner for depth */}
      <circle cx="168" cy="30" r="78" fill="#FFFFFF" opacity="0.07" />
      <IconShapes icon={icon} color={color} />
    </svg>
  );
}
