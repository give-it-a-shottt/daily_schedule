import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ko } from "date-fns/locale";

export type CalendarDay = {
  date: Date;
  iso: string;
  inCurrentMonth: boolean;
  isToday: boolean;
};

/** Monday-start 6-row month grid, matching the existing Mo~Su calendar UI. */
export function buildMonthGrid(monthAnchor: Date): CalendarDay[][] {
  const monthStart = startOfMonth(monthAnchor);
  const monthEnd = endOfMonth(monthAnchor);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: gridStart, end: gridEnd }).map(
    (date): CalendarDay => ({
      date,
      iso: toISODate(date),
      inCurrentMonth: isSameMonth(date, monthAnchor),
      isToday: isToday(date),
    }),
  );

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function toISODate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function nextMonth(anchor: Date): Date {
  return addMonths(anchor, 1);
}

export function previousMonth(anchor: Date): Date {
  return subMonths(anchor, 1);
}

export function formatMonthTitle(anchor: Date): string {
  return format(anchor, "yyyy년 M월", { locale: ko });
}

export function formatKoreanDay(date: Date): string {
  return format(date, "M월 d일", { locale: ko });
}

export function isSameDate(a: Date, b: Date): boolean {
  return isSameDay(a, b);
}

export { addDays };
