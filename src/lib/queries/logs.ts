import { createClient } from '@/lib/supabase/client'
import { Schedule, ScheduleLog, ScheduleWithLog } from '@/types'
import { materializeLogsForDates } from '@/lib/utils/materializer'

function matchesDate(s: Schedule, date: string): boolean {
  if (s.is_deleted) return false
  const createdDate = s.created_at.slice(0, 10)
  if (createdDate > date) return false

  if (s.repeat_type === 'none') return s.date === date

  if (s.repeat_type === 'daily') return true

  const dow = new Date(date + 'T00:00:00').getDay()
  if (s.repeat_type === 'weekday') return dow >= 1 && dow <= 5
  if (s.repeat_type === 'custom') return (s.repeat_days ?? []).includes(dow)

  return false
}

export async function getSchedulesWithLogsForDate(date: string): Promise<ScheduleWithLog[]> {
  const supabase = createClient()

  await materializeLogsForDates(supabase, [date])

  const { data: schedules, error: sErr } = await supabase
    .from('schedules')
    .select('*')
    .eq('is_deleted', false)
    .order('start_time', { ascending: true, nullsFirst: false })

  if (sErr) throw sErr

  const filtered = (schedules ?? [] as Schedule[]).filter((s) => matchesDate(s, date))
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

  const allSchedules = (schedules ?? []) as Schedule[]
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
    const dateLogs = (logs ?? []).filter((l: ScheduleLog) => l.log_date === date)
    const logMap = new Map(dateLogs.map((l: ScheduleLog) => [l.schedule_id, l]))
    result[date] = allSchedules
      .filter((s) => matchesDate(s, date))
      .map((s) => ({ ...s, log: logMap.get(s.id) ?? null }))
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
