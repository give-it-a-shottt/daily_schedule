'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RotateCw, ChevronRight } from 'lucide-react'
import { ScheduleWithLog } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { toggleLog } from '@/lib/queries/logs'
import { formatTime } from '@/lib/utils/dates'
import { cn } from '@/lib/utils/cn'

interface Props {
  item: ScheduleWithLog
  onToggle?: () => void
}

export function ScheduleCard({ item, onToggle }: Props) {
  const router = useRouter()
  const [isDone, setIsDone] = useState(item.log?.is_done ?? false)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    if (!item.log?.id || loading) return
    const next = !isDone
    setIsDone(next)
    setLoading(true)
    try {
      await toggleLog(item.log.id, next)
      onToggle?.()
    } catch {
      setIsDone(!next)
    } finally {
      setLoading(false)
    }
  }

  const timeLabel =
    item.start_time
      ? item.end_time
        ? `${formatTime(item.start_time)} ~ ${formatTime(item.end_time)}`
        : formatTime(item.start_time)
      : null

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm border border-gray-100',
        'transition-opacity',
        isDone && 'opacity-60'
      )}
    >
      <button
        type="button"
        onClick={handleToggle}
        className="flex-shrink-0 h-11 w-11 flex items-center justify-center -ml-1"
        aria-label={isDone ? '완료 취소' : '완료'}
      >
        <Checkbox
          checked={isDone}
          onCheckedChange={handleToggle}
          disabled={!item.log?.id || loading}
        />
      </button>

      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <p
          className={cn(
            'text-base font-medium text-gray-900 truncate',
            isDone && 'line-through text-gray-400'
          )}
        >
          {item.title}
        </p>
        <div className="flex items-center gap-2">
          {timeLabel && (
            <span className="text-xs text-gray-400">{timeLabel}</span>
          )}
          {item.repeat_type !== 'none' && (
            <span className="flex items-center gap-0.5 text-xs text-indigo-400">
              <RotateCw className="h-3 w-3" />
              {item.repeat_type === 'daily' && '매일'}
              {item.repeat_type === 'weekday' && '주중'}
              {item.repeat_type === 'custom' &&
                (['일', '월', '화', '수', '목', '금', '토']
                  .filter((_, i) => (item.repeat_days ?? []).includes(i))
                  .join('·'))}
            </span>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-gray-400 truncate mt-0.5">{item.description}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => router.push(`/schedule/${item.id}`)}
        className="flex-shrink-0 h-11 w-8 flex items-center justify-center text-gray-300"
        aria-label="수정"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}
