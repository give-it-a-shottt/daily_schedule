'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Schedule, RepeatType } from '@/types'
import { createSchedule, updateSchedule } from '@/lib/queries/schedules'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const DAY_OPTIONS = [
  { label: '월', value: 1 },
  { label: '화', value: 2 },
  { label: '수', value: 3 },
  { label: '목', value: 4 },
  { label: '금', value: 5 },
  { label: '토', value: 6 },
  { label: '일', value: 0 },
]

const REPEAT_OPTIONS: { value: RepeatType; label: string; desc: string }[] = [
  { value: 'none', label: '반복 없음', desc: '일회성 일정' },
  { value: 'daily', label: '매일 반복', desc: '매일 기록' },
  { value: 'weekday', label: '주말 제외', desc: '월~금만' },
  { value: 'custom', label: '요일 선택', desc: '원하는 요일만' },
]

const schema = z
  .object({
    title: z.string().min(1, '제목을 입력하세요'),
    description: z.string().optional(),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    date: z.string().optional(),
    repeat_type: z.enum(['none', 'daily', 'weekday', 'custom']),
    repeat_days: z.array(z.number()),
  })
  .refine(
    (d) => d.repeat_type !== 'none' || !!d.date,
    { message: '날짜를 선택하세요', path: ['date'] }
  )
  .refine(
    (d) => d.repeat_type !== 'custom' || d.repeat_days.length > 0,
    { message: '요일을 하나 이상 선택하세요', path: ['repeat_days'] }
  )

type FormValues = z.infer<typeof schema>

interface Props {
  schedule?: Schedule
}

export function ScheduleForm({ schedule }: Props) {
  const router = useRouter()
  const isEdit = !!schedule

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: schedule?.title ?? '',
      description: schedule?.description ?? '',
      start_time: schedule?.start_time ?? '',
      end_time: schedule?.end_time ?? '',
      date: schedule?.date ?? '',
      repeat_type: schedule?.repeat_type ?? 'none',
      repeat_days: schedule?.repeat_days ?? [],
    },
  })

  const repeatType = watch('repeat_type')
  const repeatDays = watch('repeat_days')

  const toggleDay = (day: number) => {
    const next = repeatDays.includes(day)
      ? repeatDays.filter((d) => d !== day)
      : [...repeatDays, day]
    setValue('repeat_days', next, { shouldValidate: true })
  }

  const onSubmit = async (values: FormValues) => {
    const payload = {
      title: values.title,
      description: values.description || null,
      start_time: values.start_time || null,
      end_time: values.end_time || null,
      date: values.repeat_type === 'none' ? (values.date || null) : null,
      repeat_type: values.repeat_type,
      repeat_days: values.repeat_type === 'custom' ? values.repeat_days : [],
    }

    if (isEdit) {
      await updateSchedule(schedule.id, payload)
    } else {
      await createSchedule(payload)
    }

    router.push('/today')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* 제목 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">제목 *</label>
        <input
          {...register('title')}
          placeholder="일정 제목"
          className={cn(
            'h-11 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400',
            'focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100',
            errors.title && 'border-red-400'
          )}
        />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
      </div>

      {/* 메모 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">메모</label>
        <textarea
          {...register('description')}
          placeholder="간단한 메모 (선택)"
          rows={2}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
        />
      </div>

      {/* 시간 */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">시작 시간</label>
          <input
            type="time"
            {...register('start_time')}
            className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">종료 시간</label>
          <input
            type="time"
            {...register('end_time')}
            className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* 반복 선택 */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">반복</label>
        <Controller
          control={control}
          name="repeat_type"
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2">
              {REPEAT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    field.onChange(opt.value)
                    if (opt.value !== 'custom') setValue('repeat_days', [])
                  }}
                  className={cn(
                    'flex flex-col items-start rounded-xl border px-4 py-3 text-left transition-colors',
                    field.value === opt.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white'
                  )}
                >
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      field.value === opt.value ? 'text-indigo-600' : 'text-gray-800'
                    )}
                  >
                    {opt.label}
                  </span>
                  <span className="text-xs text-gray-400">{opt.desc}</span>
                </button>
              ))}
            </div>
          )}
        />
      </div>

      {/* 요일 선택 (custom일 때만) */}
      {repeatType === 'custom' && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">요일 선택</label>
          <div className="flex gap-2">
            {DAY_OPTIONS.map((day) => (
              <button
                key={day.value}
                type="button"
                onClick={() => toggleDay(day.value)}
                className={cn(
                  'flex h-10 flex-1 items-center justify-center rounded-xl text-sm font-medium transition-colors',
                  repeatDays.includes(day.value)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-500'
                )}
              >
                {day.label}
              </button>
            ))}
          </div>
          {errors.repeat_days && (
            <p className="text-xs text-red-500">{errors.repeat_days.message}</p>
          )}
        </div>
      )}

      {/* 날짜 (반복 없음일 때만) */}
      {repeatType === 'none' && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">날짜 *</label>
          <input
            type="date"
            {...register('date')}
            className={cn(
              'h-11 rounded-xl border border-gray-200 bg-white px-4 text-gray-900',
              'focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100',
              errors.date && 'border-red-400'
            )}
          />
          {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
          취소
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : isEdit ? '수정하기' : '추가하기'}
        </Button>
      </div>
    </form>
  )
}
