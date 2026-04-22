-- 일정 정의 테이블
CREATE TABLE schedules (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  description  TEXT,
  start_time   TIME,
  end_time     TIME,
  date         DATE,
  repeat_daily BOOLEAN NOT NULL DEFAULT FALSE,
  is_deleted   BOOLEAN NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 날짜별 완료 기록 테이블
CREATE TABLE schedule_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  log_date    DATE NOT NULL,
  is_done     BOOLEAN NOT NULL DEFAULT FALSE,
  done_at     TIMESTAMPTZ,
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (schedule_id, log_date)
);

-- 인덱스
CREATE INDEX idx_schedules_date   ON schedules(date)         WHERE date IS NOT NULL;
CREATE INDEX idx_schedules_repeat ON schedules(repeat_daily) WHERE repeat_daily = TRUE;
CREATE INDEX idx_logs_date        ON schedule_logs(log_date);
CREATE INDEX idx_logs_schedule    ON schedule_logs(schedule_id);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_schedules_updated_at
  BEFORE UPDATE ON schedules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS (단일 사용자 — anon key 전체 허용)
ALTER TABLE schedules     ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_all_schedules"
  ON schedules FOR ALL TO anon
  USING (true) WITH CHECK (true);

CREATE POLICY "anon_all_schedule_logs"
  ON schedule_logs FOR ALL TO anon
  USING (true) WITH CHECK (true);
