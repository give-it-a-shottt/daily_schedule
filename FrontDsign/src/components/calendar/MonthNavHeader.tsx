import { formatMonthTitle } from "../../lib/dates";

type MonthNavHeaderProps = {
  monthAnchor: Date;
  onPrev: () => void;
  onNext: () => void;
};

function ChevronIcon({ flip }: { flip?: boolean }) {
  return (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 14 14"
      width="14"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M8.75 2.5L4.375 7L8.75 11.5"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        strokeOpacity={flip ? 1 : 0.6}
      />
    </svg>
  );
}

export function MonthNavHeader({ monthAnchor, onPrev, onNext }: MonthNavHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between px-1">
      <div className="flex flex-col items-start">
        <p className="font-['Inter:Medium',sans-serif] text-[12px] font-medium uppercase tracking-[1.2px] text-ink-muted">
          Calendar
        </p>
        <p className="text-[30px] font-bold leading-[36px] tracking-[-0.75px] text-white font-['Inter:Bold',sans-serif]">
          {formatMonthTitle(monthAnchor)}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={onPrev}
          aria-label="이전 달"
          className="flex size-9 cursor-pointer items-center justify-center rounded-full"
        >
          <ChevronIcon />
        </button>
        <button
          onClick={onNext}
          aria-label="다음 달"
          className="flex size-9 cursor-pointer items-center justify-center rounded-full"
        >
          <ChevronIcon flip />
        </button>
      </div>
    </div>
  );
}
