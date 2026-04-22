import { SupabaseClient } from '@supabase/supabase-js'
import { Schedule } from '@/types'

export async function materializeLogsForDates(
  supabase: SupabaseClient,
  dates: string[]
): Promise<void> {
  if (dates.length === 0) return

  const { data: schedules, error } = await supabase
    .from('schedules')
    .select('id, repeat_daily, date, created_at')
    .eq('is_deleted', false)

  if (error || !schedules || schedules.length === 0) return

  const pairs: { schedule_id: string; log_date: string }[] = []

  for (const date of dates) {
    for (const s of schedules as Pick<Schedule, 'id' | 'repeat_daily' | 'date' | 'created_at'>[]) {
      if (s.repeat_daily) {
        const createdDate = s.created_at.slice(0, 10)
        if (createdDate <= date) {
          pairs.push({ schedule_id: s.id, log_date: date })
        }
      } else if (s.date === date) {
        pairs.push({ schedule_id: s.id, log_date: date })
      }
    }
  }

  if (pairs.length === 0) return

  await supabase
    .from('schedule_logs')
    .upsert(pairs, { onConflict: 'schedule_id,log_date', ignoreDuplicates: true })
}
