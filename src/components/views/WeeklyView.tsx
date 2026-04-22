'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { ScheduleWithLog } from '@/types'
import { getSchedulesWithLogsForDates } from '@/lib/queries/logs'
import { ScheduleCard } from '@/components/schedule/ScheduleCard'
import {
  getWeekDays,
  toDateString,
  addWeeks,
  subWeeks,
  isSameDay,
  isToday,
  formatMonthYear,
} from '@/lib/utils/dates'
import { cn } from '@/lib/utils/cn'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일']

export function WeeklyView() {
  const [baseDate, setBaseDate] = useState(new Date())
  const [dataMap, setDataMap] = useState<Record<string, ScheduleWithLog[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const weekDays = getWeekDays(baseDate)
  const dateStrings = weekDays.map(toDateString)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getSchedulesWithLogsForDates(dateStrings)
      setDataMap(data)
    } finally {
      setLoading(false)
    }
  }, [dateStrings.join(',')])

  useEffect(() => {
    load()
  }, [load])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setBaseDate((d) => addWeeks(d, 1)),
    onSwipedRight: () => setBaseDate((d) => subWeeks(d, 1)),
    trackMouse: false,
  })

  const selectedDateStr = selectedDate ? toDateString(selectedDate) : null
  const selectedItems = selectedDateStr ? (dataMap[selectedDateStr] ?? []) : []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">주간</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-400">{formatMonthYear(baseDate)}</p>
          <button
            onClick={() => setBaseDate((d) => subWeeks(d, 1))}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setBaseDate((d) => addWeeks(d, 1))}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div {...swipeHandlers} className="grid grid-cols-7 gap-1.5">
        {weekDays.map((day, i) => {
          const dateStr = toDateString(day)
          const items = dataMap[dateStr] ?? []
          const doneCount = items.filter((it) => it.log?.is_done).length
          const total = items.length
          const today = isToday(day)

          return (
            <button
              key={dateStr}
              onClick={() => setSelectedDate(day)}
              className={cn(
                'flex flex-col items-center rounded-2xl py-3 gap-1.5 transition-colors',
                today ? 'bg-indigo-600' : 'bg-white border border-gray-100'
              )}
            >
              <span className={cn('text-[10px] font-medium', today ? 'text-indigo-200' : 'text-gray-400')}>
                {DAY_LABELS[i]}
              </span>
              <span className={cn('text-base font-bold', today ? 'text-white' : 'text-gray-900')}>
                {day.getDate()}
              </span>
              {total > 0 ? (
                <div className="flex flex-col items-center gap-0.5">
                  <span className={cn('text-[9px]', today ? 'text-indigo-200' : 'text-gray-400')}>
                    {doneCount}/{total}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: Math.min(total, 3) }).map((_, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'h-1 w-1 rounded-full',
                          idx < doneCount
                            ? today ? 'bg-white' : 'bg-indigo-500'
                            : today ? 'bg-indigo-400' : 'bg-gray-200'
                        )}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-6" />
              )}
            </button>
          )
        })}
      </div>

      {loading && (
        <div className="flex flex-col gap-3 mt-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      <Sheet open={!!selectedDate} onOpenChange={(open) => !open && setSelectedDate(null)}>
        <SheetContent className="max-h-[75vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {selectedDate
                ? `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`
                : ''}
            </SheetTitle>
          </SheetHeader>
          {selectedItems.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">일정이 없어요</p>
          ) : (
            <div className="flex flex-col gap-3 pb-4">
              {selectedItems.map((item) => (
                <ScheduleCard key={item.id} item={item} onToggle={load} />
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
