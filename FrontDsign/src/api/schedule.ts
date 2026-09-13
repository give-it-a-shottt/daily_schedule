import { supabase } from "../lib/supabaseClient";
import type { NewSimpleScheduleItem, ScheduleItem } from "../types";

export async function getScheduleRange(
  startISO: string,
  endISO: string,
): Promise<ScheduleItem[]> {
  const { data, error } = await supabase
    .from("schedule_items")
    .select("*")
    .gte("date", startISO)
    .lte("date", endISO)
    .order("date", { ascending: true })
    .order("time", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data as ScheduleItem[];
}

export async function createSimpleScheduleItem(
  input: NewSimpleScheduleItem,
): Promise<ScheduleItem> {
  const { data, error } = await supabase
    .from("schedule_items")
    .insert({
      date: input.date,
      title: input.title,
      time: input.time ?? null,
      memo: input.memo ?? null,
      kind: "simple",
    })
    .select("*")
    .single();

  if (error) throw error;
  return data as ScheduleItem;
}

export async function setScheduleItemCompleted(
  id: string,
  completed: boolean,
): Promise<ScheduleItem> {
  const { data, error } = await supabase
    .from("schedule_items")
    .update({ completed, completed_at: completed ? new Date().toISOString() : null })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as ScheduleItem;
}

export async function deleteScheduleItem(id: string): Promise<void> {
  const { error } = await supabase.from("schedule_items").delete().eq("id", id);
  if (error) throw error;
}
