import type { InputHTMLAttributes } from "react";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={`h-[47px] w-full rounded-field border border-surface-border bg-[rgba(255,255,255,0.07)] px-4 font-['Inter:Regular','Noto_Sans_KR',sans-serif] text-[14px] text-white outline-none placeholder-ink-faint ${className}`}
    />
  );
}
