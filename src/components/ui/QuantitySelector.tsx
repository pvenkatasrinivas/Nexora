"use client";

// A "−  2  +" control. The buttons stop at the min and max values.

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  /** Used in the button labels, e.g. "Increase quantity of Aria Headphones". */
  itemName: string;
  size?: "sm" | "md";
}

export default function QuantitySelector({ value, min = 1, max, onChange, itemName, size = "md" }: QuantitySelectorProps) {
  const buttonSize = size === "sm" ? "h-11 w-11 lg:h-9 lg:w-9" : "h-11 w-11";
  const buttonClasses = `${buttonSize} grid place-items-center text-lg font-bold text-ink transition-colors hover:bg-brand-tint disabled:cursor-not-allowed disabled:opacity-40`;

  return (
    <div className="inline-flex items-center overflow-hidden rounded-control border border-line bg-white">
      <button
        type="button"
        className={buttonClasses}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${itemName}`}
      >
        −
      </button>
      <span className="min-w-10 text-center text-sm font-semibold tabular-nums" aria-live="polite">
        <span className="sr-only">Quantity </span>
        {value}
      </span>
      <button
        type="button"
        className={buttonClasses}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${itemName}`}
      >
        +
      </button>
    </div>
  );
}
