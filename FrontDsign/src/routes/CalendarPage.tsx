import { useMemo, useState } from "react";
import { MonthCalendar } from "../components/calendar/MonthCalendar";
import { MonthNavHeader } from "../components/calendar/MonthNavHeader";
import { AddScheduleFormSheet } from "../components/sheets/AddScheduleFormSheet";
import { DayScheduleSheet } from "../components/sheets/DayScheduleSheet";
import { useDeleteScheduleItem, useScheduleRange, useSetScheduleItemCompleted } from "../hooks/useSchedule";
import { buildMonthGrid, formatKoreanDay, toISODate, type CalendarDay } from "../lib/dates";
import type { ScheduleItem } from "../types";

type SheetState = "none" | "day" | "add";

export function CalendarPage() {
  const [monthAnchor, setMonthAnchor] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [sheet, setSheet] = useState<SheetState>("none");

  const weeks = useMemo(() => buildMonthGrid(monthAnchor), [monthAnchor]);
  const rangeStartISO = weeks[0][0].iso;
  const rangeEndISO = weeks[weeks.length - 1][6].iso;
  const selectedISO = toISODate(selectedDate);

  const { data: items = [] } = useScheduleRange(rangeStartISO, rangeEndISO);
  const toggleCompleted = useSetScheduleItemCompleted();
  const deleteItem = useDeleteScheduleItem();

  const itemsByDate = useMemo(() => {
    const map = new Map<string, ScheduleItem[]>();
    for (const item of items) {
      const list = map.get(item.date) ?? [];
      list.push(item);
      map.set(item.date, list);
    }
    return map;
  }, [items]);

  const datesWithItems = useMemo(() => new Set(itemsByDate.keys()), [itemsByDate]);
  const selectedItems = itemsByDate.get(selectedISO) ?? [];

  const handleSelectDate = (day: CalendarDay) => {
    setSelectedDate(day.date);
    setSheet("day");
  };

  return (
    <div
      className="flex min-h-screen w-full flex-col items-stretch"
      style={{
        background:
          "linear-gradient(140.82deg, rgb(30,27,75) 8.49%, rgb(49,46,129) 37.55%, rgb(67,56,202) 62.45%, rgb(96,45,213) 82.84%)",
      }}
    >
      <div className="flex flex-col items-center gap-6 px-5 pb-10 pt-8">
        <MonthNavHeader
          monthAnchor={monthAnchor}
          onPrev={() => setMonthAnchor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
          onNext={() => setMonthAnchor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
        />

        <MonthCalendar
          weeks={weeks}
          selectedISO={selectedISO}
          datesWithItems={datesWithItems}
          onSelectDate={handleSelectDate}
        />

        <div className="flex w-full items-center gap-3 px-1">
          <div className="flex flex-1 flex-col items-start rounded-card border border-surface-border bg-surface px-4 py-3">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[10px] font-semibold uppercase tracking-[1px] text-ink-muted">
              Selected
            </p>
            <p className="mt-[2px] font-['Inter:Semi_Bold',sans-serif] text-[16px] font-semibold text-white">
              {formatKoreanDay(selectedDate)}
            </p>
          </div>
          <div className="flex flex-1 flex-col items-start rounded-card border border-surface-border bg-surface px-4 py-3">
            <p className="font-['Inter:Semi_Bold',sans-serif] text-[10px] font-semibold uppercase tracking-[1px] text-ink-muted">
              Schedule
            </p>
            <p className="mt-[2px] font-['Inter:Semi_Bold',sans-serif] text-[16px] font-semibold text-white">
              {selectedItems.length}개 일정
            </p>
          </div>
        </div>

        <button
          onClick={() => setSheet("day")}
          className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-card py-4"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-card backdrop-blur-[20px]"
            style={{ background: "linear-gradient(170.59deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-card border border-[rgba(255,255,255,0.3)] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.2)]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.25)]" />
          <svg fill="none" height="18" viewBox="0 0 18 18" width="18" className="relative">
            <path d="M9 3.75V14.25M3.75 9H14.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.875" />
          </svg>
          <span className="relative font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] text-[17px] font-bold tracking-[-0.425px] text-white">
            학습등록
          </span>
        </button>
      </div>

      {sheet === "day" && (
        <DayScheduleSheet
          date={selectedDate}
          items={selectedItems}
          onClose={() => setSheet("none")}
          onAddSchedule={() => setSheet("add")}
          onToggleCompleted={(item) => toggleCompleted.mutate({ id: item.id, completed: !item.completed })}
          onDelete={(item) => deleteItem.mutate(item.id)}
        />
      )}
      {sheet === "add" && (
        <AddScheduleFormSheet
          selectedDate={selectedDate}
          onClose={() => setSheet("day")}
          onCreated={() => setSheet("day")}
        />
      )}
    </div>
  );
}
