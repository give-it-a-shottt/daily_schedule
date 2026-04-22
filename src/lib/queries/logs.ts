import { createClient } from '@/lib/supabase/client'
import { ScheduleLog, ScheduleWithLog } from '@/types'
import { materializeLogsForDates } from '@/lib/utils/materializer'

export async function getSchedulesWithLogsForDate(date: string): Promise<ScheduleWithLog[]> {
  const supabase = createClient()

  await materializeLogsForDates(supabase, [date])

  const { data: schedules, error: sErr } = await supabase
    .from('schedules')
    .select('*')
    .eq('is_deleted', false)
    .or(`date.eq.${date},repeat_daily.eq.true`)
    .order('start_time', { ascending: true, nullsFirst: false })

  if (sErr) throw sErr

  const filtered = (schedules ?? []).filter((s) => {
    if (s.repeat_daily) return s.created_at.slice(0, 10) <= date
    return s.date === date
  })

  if (filtered.length === 0) return []

  const ids = filtered.map((s) => s.id)

  const { data: logs, error: lErr } = await supabase
    .from('schedule_logs')
    .select('*')
    .eq('log_date', date)
    .in('schedule_id', ids)

  if (lErr) throw lErr

  const logMap = new Map((logs ?? []).map((l: ScheduleLog) => [l.schedule_id, l]))

  return filtered.map((s) => ({ ...s, log: logMap.get(s.id) ?? null }))
}

export async function getSchedulesWithLogsForDates(
  dates: string[]
): Promise<Record<string, ScheduleWithLog[]>> {
  const supabase = createClient()

  await materializeLogsForDates(supabase, dates)

  const { data: schedules, error: sErr } = await supabase
    .from('schedules')
    .select('*')
    .eq('is_deleted', false)
    .order('start_time', { ascending: true, nullsFirst: false })

  if (sErr) throw sErr

  const allSchedules = schedules ?? []
  const ids = allSchedules.map((s) => s.id)

  const { data: logs, error: lErr } =
    ids.length > 0
      ? await supabase
          .from('schedule_logs')
          .select('*')
          .in('log_date', dates)
          .in('schedule_id', ids)
      : { data: [], error: null }

  if (lErr) throw lErr

  const result: Record<string, ScheduleWithLog[]> = {}

  for (const date of dates) {
    const dateSchedules = allSchedules.filter((s) => {
      if (s.is_deleted) return false
      if (s.repeat_daily) return s.created_at.slice(0, 10) <= date
      return s.date === date
    })

    const dateLogs = (logs ?? []).filter((l: ScheduleLog) => l.log_date === date)
    const logMap = new Map(dateLogs.map((l: ScheduleLog) => [l.schedule_id, l]))

    result[date] = dateSchedules.map((s) => ({ ...s, log: logMap.get(s.id) ?? null }))
  }

  return result
}

export async function toggleLog(logId: string, isDone: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('schedule_logs')
    .update({ is_done: isDone, done_at: isDone ? new Date().toISOString() : null })
    .eq('id', logId)

  if (error) throw error
}
