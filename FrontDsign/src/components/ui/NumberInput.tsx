import type { InputHTMLAttributes } from "react";

type NumberInputProps = InputHTMLAttributes<HTMLInputElement> & {
  suffix?: string;
};

export function NumberInput({ suffix, className = "", ...rest }: NumberInputProps) {
  return (
    <div className="relative h-[47px] w-full">
      <input
        type="number"
        min={0}
        {...rest}
        className={`h-full w-full rounded-field border border-surface-border bg-[rgba(255,255,255,0.07)] pl-4 pr-10 font-['Inter:Regular',sans-serif] text-[14px] text-white outline-none placeholder-ink-faint ${className}`}
      />
      {suffix && (
        <span className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 font-['Inter:Regular','Noto_Sans_KR',sans-serif] text-[13px] text-ink-faint">
          {suffix}
        </span>
      )}
    </div>
  );
}
