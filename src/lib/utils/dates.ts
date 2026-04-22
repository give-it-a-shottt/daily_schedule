import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns'
import { ko } from 'date-fns/locale'

export function toDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function formatDisplay(date: Date): string {
  return format(date, 'M월 d일 (EEE)', { locale: ko })
}

export function formatMonthYear(date: Date): string {
  return format(date, 'yyyy년 M월', { locale: ko })
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  const period = hour < 12 ? '오전' : '오후'
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return `${period} ${displayHour}:${m}`
}

export function getWeekDays(baseDate: Date): Date[] {
  const start = startOfWeek(baseDate, { weekStartsOn: 1 })
  const end = endOfWeek(baseDate, { weekStartsOn: 1 })
  return eachDayOfInterval({ start, end })
}

export function getMonthDays(baseDate: Date): Date[] {
  const start = startOfMonth(baseDate)
  const end = endOfMonth(baseDate)
  return eachDayOfInterval({ start, end })
}

export function getMonthGrid(baseDate: Date): (Date | null)[] {
  const days = getMonthDays(baseDate)
  const firstDay = days[0]
  const dayOfWeek = firstDay.getDay()
  const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const grid: (Date | null)[] = Array(offset).fill(null)
  grid.push(...days)
  while (grid.length % 7 !== 0) grid.push(null)
  return grid
}

export { addWeeks, subWeeks, addMonths, subMonths, isSameDay, isToday, parseISO }
