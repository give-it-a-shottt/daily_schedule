import { SupabaseClient } from '@supabase/supabase-js'
import { Schedule } from '@/types'

function shouldInclude(
  s: Pick<Schedule, 'id' | 'repeat_type' | 'repeat_days' | 'date' | 'created_at'>,
  date: string
): boolean {
  const createdDate = s.created_at.slice(0, 10)
  if (createdDate > date) return false

  if (s.repeat_type === 'none') {
    return s.date === date
  }

  if (s.repeat_type === 'daily') {
    return true
  }

  const dayOfWeek = new Date(date + 'T00:00:00').getDay() // 0=Sun, 1=Mon, ..., 6=Sat

  if (s.repeat_type === 'weekday') {
    return dayOfWeek >= 1 && dayOfWeek <= 5
  }

  if (s.repeat_type === 'custom') {
    return (s.repeat_days ?? []).includes(dayOfWeek)
  }

  return false
}

export async function materializeLogsForDates(
  supabase: SupabaseClient,
  dates: string[]
): Promise<void> {
  if (dates.length === 0) return

  const { data: schedules, error } = await supabase
    .from('schedules')
    .select('id, repeat_type, repeat_days, date, created_at')
    .eq('is_deleted', false)

  if (error || !schedules || schedules.length === 0) return

  const pairs: { schedule_id: string; log_date: string }[] = []

  for (const date of dates) {
    for (const s of schedules as Pick<Schedule, 'id' | 'repeat_type' | 'repeat_days' | 'date' | 'created_at'>[]) {
      if (shouldInclude(s, date)) {
        pairs.push({ schedule_id: s.id, log_date: date })
      }
    }
  }

  if (pairs.length === 0) return

  await supabase
    .from('schedule_logs')
    .upsert(pairs, { onConflict: 'schedule_id,log_date', ignoreDuplicates: true })
}
