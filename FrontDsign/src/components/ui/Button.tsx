import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dashed";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-accent text-white",
  secondary: "bg-surface text-ink-muted",
  ghost: "bg-transparent text-ink-muted",
  dashed: "bg-transparent border border-dashed border-surface-border text-ink-muted",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  icon?: ReactNode;
};

export function Button({ variant = "primary", icon, className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex h-[45px] w-full cursor-pointer items-center justify-center gap-2 rounded-card font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] text-[14px] font-bold transition-opacity active:opacity-80 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}
