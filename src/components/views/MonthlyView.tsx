'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { ScheduleWithLog } from '@/types'
import { getSchedulesWithLogsForDates } from '@/lib/queries/logs'
import { ScheduleCard } from '@/components/schedule/ScheduleCard'
import {
  getMonthGrid,
  toDateString,
  addMonths,
  subMonths,
  isToday,
  formatMonthYear,
} from '@/lib/utils/dates'
import { cn } from '@/lib/utils/cn'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const WEEK_LABELS = ['월', '화', '수', '목', '금', '토', '일']

export function MonthlyView() {
  const [baseDate, setBaseDate] = useState(new Date())
  const [dataMap, setDataMap] = useState<Record<string, ScheduleWithLog[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const grid = getMonthGrid(baseDate)
  const dateStrings = grid.filter(Boolean).map((d) => toDateString(d!))

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
    onSwipedLeft: () => setBaseDate((d) => addMonths(d, 1)),
    onSwipedRight: () => setBaseDate((d) => subMonths(d, 1)),
    trackMouse: false,
  })

  const selectedDateStr = selectedDate ? toDateString(selectedDate) : null
  const selectedItems = selectedDateStr ? (dataMap[selectedDateStr] ?? []) : []

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">월간</h1>
        <div className="flex items-center gap-1">
          <p className="text-sm text-gray-400 mr-1">{formatMonthYear(baseDate)}</p>
          <button
            onClick={() => setBaseDate((d) => subMonths(d, 1))}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setBaseDate((d) => addMonths(d, 1))}
            className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div {...swipeHandlers}>
        <div className="grid grid-cols-7 mb-2">
          {WEEK_LABELS.map((label) => (
            <div key={label} className="text-center text-xs font-medium text-gray-400 py-1">
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {grid.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />

            const dateStr = toDateString(day)
            const items = dataMap[dateStr] ?? []
            const total = items.length
            const doneCount = items.filter((it) => it.log?.is_done).length
            const allDone = total > 0 && doneCount === total
            const today = isToday(day)

            return (
              <button
                key={dateStr}
                onClick={() => setSelectedDate(day)}
                className={cn(
                  'flex flex-col items-center rounded-xl py-2 gap-1 transition-colors',
                  today
                    ? 'bg-indigo-600'
                    : 'hover:bg-gray-100'
                )}
              >
                <span
                  className={cn(
                    'text-sm font-medium',
                    today ? 'text-white' : 'text-gray-800'
                  )}
                >
                  {day.getDate()}
                </span>
                {loading ? (
                  <div className="h-1.5 w-1.5" />
                ) : total > 0 ? (
                  <div
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      allDone
                        ? today ? 'bg-white' : 'bg-indigo-500'
                        : today ? 'bg-indigo-300' : 'bg-gray-300'
                    )}
                  />
                ) : (
                  <div className="h-1.5 w-1.5" />
                )}
              </button>
            )
          })}
        </div>
      </div>

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
