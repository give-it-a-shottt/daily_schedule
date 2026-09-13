import { useEffect, type ReactNode } from "react";

type BottomSheetProps = {
  eyebrow: string;
  title: string;
  onClose: () => void;
  headerExtra?: ReactNode;
  children: ReactNode;
};

export function BottomSheet({ eyebrow, title, onClose, headerExtra, children }: BottomSheetProps) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        onClick={onClose}
        aria-hidden
        className="absolute inset-0 bg-black/55 animate-[sheet-backdrop-in_0.2s_ease-out]"
      />

      <div
        className="relative z-10 flex w-full max-h-[88vh] flex-col items-start overflow-y-auto rounded-tl-sheet rounded-tr-sheet border-t border-surface-border shadow-[0px_-20px_60px_0px_rgba(0,0,0,0.5)] animate-[sheet-slide-up_0.25s_cubic-bezier(0.32,0.72,0,1)]"
        style={{
          background: "linear-gradient(159.84deg, rgba(49,46,129,0.98) 46.43%, rgba(30,27,75,0.99) 87.03%)",
        }}
      >
        <div className="flex w-full items-start justify-center pb-1 pt-3">
          <div className="h-[5px] w-10 rounded-full bg-[rgba(255,255,255,0.2)]" />
        </div>

        <div className="flex w-full items-center justify-between px-6 pb-4 pt-3">
          <div className="flex flex-col items-start">
            <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] text-[11px] font-semibold uppercase tracking-[0.8px] text-[rgba(255,255,255,0.3)]">
              {eyebrow}
            </p>
            <p className="mt-[2px] font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] text-[22px] font-bold text-white">
              {title}
            </p>
          </div>
          <div className="flex items-center gap-[10px]">
            {headerExtra}
            <button
              onClick={onClose}
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-surface"
            >
              <svg fill="none" height="14" viewBox="0 0 14 14" width="14">
                <path
                  d="M1 1L13 13M13 1L1 13"
                  stroke="white"
                  strokeLinecap="round"
                  strokeOpacity="0.6"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="w-full px-6">
          <div className="h-px w-full bg-[rgba(255,255,255,0.1)]" />
        </div>

        {children}
      </div>
    </div>
  );
}
