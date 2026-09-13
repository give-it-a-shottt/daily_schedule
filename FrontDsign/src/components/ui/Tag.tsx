export function Tag({ children }: { children: string }) {
  return (
    <div className="ml-2 shrink-0 rounded-full border border-[rgba(129,140,248,0.3)] bg-accent-soft px-[10px] py-[4px]">
      <span className="font-['Inter:Medium','Noto_Sans_KR:Bold',sans-serif] text-[12px] font-medium text-[rgba(255,255,255,0.7)]">
        {children}
      </span>
    </div>
  );
}
