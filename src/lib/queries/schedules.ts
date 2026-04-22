import { createClient } from '@/lib/supabase/client'
import { Schedule } from '@/types'

export async function getSchedules(): Promise<Schedule[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('is_deleted', false)
    .order('start_time', { ascending: true, nullsFirst: false })

  if (error) throw error
  return data ?? []
}

export async function getScheduleById(id: string): Promise<Schedule | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('id', id)
    .eq('is_deleted', false)
    .single()

  if (error) return null
  return data
}

export async function createSchedule(
  payload: Omit<Schedule, 'id' | 'is_deleted' | 'created_at' | 'updated_at'>
): Promise<Schedule> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('schedules')
    .insert(payload)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateSchedule(
  id: string,
  payload: Partial<Omit<Schedule, 'id' | 'created_at' | 'updated_at'>>
): Promise<Schedule> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('schedules')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteSchedule(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('schedules')
    .update({ is_deleted: true })
    .eq('id', id)

  if (error) throw error
}
