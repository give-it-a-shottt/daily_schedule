export type RepeatType = 'none' | 'daily' | 'weekday' | 'custom'

export interface Schedule {
  id: string
  title: string
  description: string | null
  start_time: string | null
  end_time: string | null
  date: string | null
  repeat_type: RepeatType
  repeat_days: number[]
  is_deleted: boolean
  created_at: string
  updated_at: string
}

export interface ScheduleLog {
  id: string
  schedule_id: string
  log_date: string
  is_done: boolean
  done_at: string | null
  note: string | null
  created_at: string
}

export interface ScheduleWithLog extends Schedule {
  log: ScheduleLog | null
}
