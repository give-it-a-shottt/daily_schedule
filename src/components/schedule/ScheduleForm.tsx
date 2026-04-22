'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Schedule } from '@/types'
import { createSchedule, updateSchedule } from '@/lib/queries/schedules'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

const schema = z
  .object({
    title: z.string().min(1, '제목을 입력하세요'),
    description: z.string().optional(),
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    date: z.string().optional(),
    repeat_daily: z.boolean(),
  })
  .refine(
    (d) => d.repeat_daily || !!d.date,
    { message: '날짜를 선택하거나 매일 반복을 체크하세요', path: ['date'] }
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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: schedule?.title ?? '',
      description: schedule?.description ?? '',
      start_time: schedule?.start_time ?? '',
      end_time: schedule?.end_time ?? '',
      date: schedule?.date ?? '',
      repeat_daily: schedule?.repeat_daily ?? false,
    },
  })

  const repeatDaily = watch('repeat_daily')

  const onSubmit = async (values: FormValues) => {
    const payload = {
      title: values.title,
      description: values.description || null,
      start_time: values.start_time || null,
      end_time: values.end_time || null,
      date: values.repeat_daily ? null : values.date || null,
      repeat_daily: values.repeat_daily,
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

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">메모</label>
        <textarea
          {...register('description')}
          placeholder="간단한 메모 (선택)"
          rows={3}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
        />
      </div>

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

      <label className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 cursor-pointer">
        <div
          onClick={() => setValue('repeat_daily', !repeatDaily)}
          className={cn(
            'relative h-6 w-11 rounded-full transition-colors',
            repeatDaily ? 'bg-indigo-600' : 'bg-gray-300'
          )}
        >
          <div
            className={cn(
              'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
              repeatDaily ? 'translate-x-5' : 'translate-x-0.5'
            )}
          />
        </div>
        <span className="text-sm font-medium text-gray-700">매일 반복</span>
      </label>

      {!repeatDaily && (
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
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? '저장 중...' : isEdit ? '수정하기' : '추가하기'}
        </Button>
      </div>
    </form>
  )
}
