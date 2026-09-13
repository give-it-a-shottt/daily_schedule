type Option<T extends string> = { value: T; label: string };

type SegmentedToggleProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function SegmentedToggle<T extends string>({ options, value, onChange }: SegmentedToggleProps<T>) {
  return (
    <div className="flex w-full gap-1 rounded-field border border-surface-border bg-[rgba(255,255,255,0.05)] p-1">
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex-1 cursor-pointer rounded-[10px] py-[9px] font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] text-[13px] font-semibold transition-colors ${
              active ? "bg-accent text-white" : "text-ink-muted"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
