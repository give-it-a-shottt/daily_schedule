'use client'

import { useState, useEffect, useCallback } from 'react'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { ScheduleWithLog } from '@/types'
import { getSchedulesWithLogsForDate } from '@/lib/queries/logs'
import { ScheduleCard } from '@/components/schedule/ScheduleCard'
import { toDateString, formatDisplay } from '@/lib/utils/dates'

export function TodayView() {
  const today = toDateString(new Date())
  const [items, setItems] = useState<ScheduleWithLog[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const data = await getSchedulesWithLogsForDate(today)
      setItems(data)
    } finally {
      setLoading(false)
    }
  }, [today])

  useEffect(() => {
    load()
  }, [load])

  const done = items.filter((i) => i.log?.is_done).length
  const total = items.length

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-400">{formatDisplay(new Date())}</p>
          <h1 className="text-2xl font-bold text-gray-900">오늘</h1>
        </div>
        {total > 0 && (
          <p className="text-sm text-gray-400 pb-1">
            {done}/{total} 완료
          </p>
        )}
      </div>

      {total > 0 && (
        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }}
          />
        </div>
      )}

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <div className="text-5xl">📋</div>
          <p className="text-gray-500">오늘 일정이 없어요</p>
          <Link
            href="/schedule/new"
            className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600"
          >
            <Plus className="h-4 w-4" />
            일정 추가하기
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <ScheduleCard key={item.id} item={item} onToggle={load} />
          ))}
        </div>
      )}
    </div>
  )
}
