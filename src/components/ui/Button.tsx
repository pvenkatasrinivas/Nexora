import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

// One place for all button styles, so every button in the app looks the same.

type Variant = "primary" | "secondary" | "accent" | "danger" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary: "border border-line bg-white text-ink hover:border-brand hover:text-brand",
  accent: "bg-marigold text-ink hover:bg-[#ffbb1f]",
  danger: "bg-danger text-white hover:bg-[#962f25]",
  ghost: "text-brand hover:bg-brand-tint",
  dark: "bg-ink text-white hover:bg-brand-dark",
};

// Every size is at least 44px tall on phones and tablets so buttons are easy to tap.
// Only on large (lg) screens, used with a mouse, do small buttons shrink to 36px.
const sizeClasses: Record<Size, string> = {
  sm: "min-h-11 px-3 text-sm lg:min-h-9",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-6 text-base",
};

/** Builds the class list. Also used for links that should look like buttons. */
export function buttonClasses(variant: Variant = "primary", size: Size = "md", fullWidth = false): string {
  return [
    "inline-flex items-center justify-center gap-2 rounded-control font-semibold transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? "w-full" : "",
  ].join(" ");
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return <button type={type} className={`${buttonClasses(variant, size, fullWidth)} ${className}`} {...props} />;
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
}

/** A Next.js <Link> that looks like a button. Use it for navigation, not actions. */
export function ButtonLink({ href, children, variant = "primary", size = "md", fullWidth, className = "" }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonClasses(variant, size, fullWidth)} ${className}`}>
      {children}
    </Link>
  );
}
