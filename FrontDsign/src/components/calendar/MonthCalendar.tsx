import type { CalendarDay } from "../../lib/dates";

const DAY_HEADERS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type MonthCalendarProps = {
  weeks: CalendarDay[][];
  selectedISO: string;
  datesWithItems: Set<string>;
  onSelectDate: (day: CalendarDay) => void;
};

export function MonthCalendar({ weeks, selectedISO, datesWithItems, onSelectDate }: MonthCalendarProps) {
  return (
    <div className="relative h-[363.5px] w-full shrink-0 rounded-sheet">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sheet bg-[rgba(255,255,255,0.1)] backdrop-blur-[24px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sheet border border-[rgba(255,255,255,0.18)] shadow-[0px_20px_60px_0px_rgba(0,0,0,0.3)]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]" />

      <div className="relative flex size-full flex-col items-start overflow-clip rounded-[inherit]">
        <div className="grid w-full grid-cols-7 px-4 pb-2 pt-5">
          {DAY_HEADERS.map((d) => (
            <div key={d} className="flex items-center justify-center py-[2px]">
              <span className="font-['Inter:Semi_Bold',sans-serif] text-[11px] font-semibold uppercase tracking-[0.55px] text-[rgba(255,255,255,0.4)]">
                {d}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full px-4">
          <div className="h-px w-full bg-[rgba(255,255,255,0.1)]" />
        </div>

        <div className="flex w-full flex-col px-4 pb-5 pt-2">
          {weeks.map((week, ri) => (
            <div key={ri} className="grid w-full grid-cols-7">
              {week.map((day) => {
                const isSelected = day.iso === selectedISO;
                const hasItems = datesWithItems.has(day.iso);
                return (
                  <button
                    key={day.iso}
                    onClick={() => onSelectDate(day)}
                    className="flex cursor-pointer flex-col items-center justify-center gap-[2px] py-[6px]"
                  >
                    <div
                      className={`flex size-9 items-center justify-center rounded-full ${
                        isSelected ? "bg-white shadow-[0px_11px_8.25px_rgba(255,255,255,0.2)]" : ""
                      } ${day.isToday && !isSelected ? "ring-1 ring-[rgba(255,255,255,0.4)]" : ""}`}
                    >
                      <span
                        className={`text-center font-['Inter:Medium',sans-serif] text-[14px] font-medium ${
                          isSelected
                            ? "text-[15.4px] font-bold text-[#312c85]"
                            : day.inCurrentMonth
                              ? "text-[rgba(255,255,255,0.8)]"
                              : "text-[rgba(255,255,255,0.15)]"
                        }`}
                      >
                        {day.date.getDate()}
                      </span>
                    </div>
                    <div className={`size-[4px] rounded-full ${hasItems ? "bg-accent" : "bg-transparent"}`} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
