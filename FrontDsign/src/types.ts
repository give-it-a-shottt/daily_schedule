export type ScheduleItemKind = "simple" | "study";
export type StudySourceType = "book" | "lecture";

export type ScheduleItem = {
  id: string;
  date: string;
  title: string;
  time: string | null;
  memo: string | null;
  kind: ScheduleItemKind;
  study_source_id: string | null;
  unit_from: number | null;
  unit_to: number | null;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
};

export type StudySource = {
  id: string;
  title: string;
  source_type: StudySourceType;
  total_units: number;
  unit_label: string;
  start_date: string;
  period_days: number;
  end_date: string;
  created_at: string;
};

export type NewSimpleScheduleItem = {
  date: string;
  title: string;
  time?: string | null;
  memo?: string | null;
};

export type NewStudySource = {
  title: string;
  source_type: StudySourceType;
  total_units: number;
  unit_label: string;
  start_date: string;
  period_days: number;
};
