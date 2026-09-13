import { allocate, formatChunkAmount } from "../lib/allocation";
import { addDays, toISODate } from "../lib/dates";
import { supabase } from "../lib/supabaseClient";
import type { NewStudySource, StudySource } from "../types";

export async function listStudySources(): Promise<StudySource[]> {
  const { data, error } = await supabase
    .from("study_sources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as StudySource[];
}

export async function createStudySource(input: NewStudySource): Promise<StudySource> {
  const startDate = new Date(`${input.start_date}T00:00:00`);
  const chunks = allocate(input.total_units, input.period_days, startDate);
  const endDate = toISODate(addDays(startDate, input.period_days - 1));

  const { data: source, error: sourceError } = await supabase
    .from("study_sources")
    .insert({
      title: input.title,
      source_type: input.source_type,
      total_units: input.total_units,
      unit_label: input.unit_label,
      start_date: input.start_date,
      period_days: input.period_days,
      end_date: endDate,
    })
    .select("*")
    .single();

  if (sourceError) throw sourceError;

  const rows = chunks.map((chunk) => ({
    date: chunk.date,
    title: `${input.title} · ${formatChunkAmount(chunk, input.unit_label)}`,
    kind: "study" as const,
    study_source_id: source.id,
    unit_from: chunk.unitFrom,
    unit_to: chunk.unitTo,
  }));

  const { error: itemsError } = await supabase.from("schedule_items").insert(rows);
  if (itemsError) {
    // roll back the source row so a failed materialization doesn't leave an orphaned source behind
    await supabase.from("study_sources").delete().eq("id", source.id);
    throw itemsError;
  }

  return source as StudySource;
}

export async function deleteStudySource(id: string): Promise<void> {
  // schedule_items.study_source_id has ON DELETE CASCADE, so this also
  // removes every materialized day (including completed ones) for this source.
  const { error } = await supabase.from("study_sources").delete().eq("id", id);
  if (error) throw error;
}
