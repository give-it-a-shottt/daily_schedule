import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSimpleScheduleItem,
  deleteScheduleItem,
  getScheduleRange,
  setScheduleItemCompleted,
} from "../api/schedule";
import type { NewSimpleScheduleItem } from "../types";

const scheduleKey = (startISO: string, endISO: string) => ["schedule", startISO, endISO] as const;

export function useScheduleRange(startISO: string, endISO: string) {
  return useQuery({
    queryKey: scheduleKey(startISO, endISO),
    queryFn: () => getScheduleRange(startISO, endISO),
  });
}

function useInvalidateSchedule() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["schedule"] });
}

export function useCreateScheduleItem() {
  const invalidate = useInvalidateSchedule();
  return useMutation({
    mutationFn: (input: NewSimpleScheduleItem) => createSimpleScheduleItem(input),
    onSuccess: invalidate,
  });
}

export function useSetScheduleItemCompleted() {
  const invalidate = useInvalidateSchedule();
  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      setScheduleItemCompleted(id, completed),
    onSuccess: invalidate,
  });
}

export function useDeleteScheduleItem() {
  const invalidate = useInvalidateSchedule();
  return useMutation({
    mutationFn: (id: string) => deleteScheduleItem(id),
    onSuccess: invalidate,
  });
}
