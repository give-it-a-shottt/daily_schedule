import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStudySource, deleteStudySource, listStudySources } from "../api/studySources";
import type { NewStudySource } from "../types";

export function useStudySources() {
  return useQuery({
    queryKey: ["study-sources"],
    queryFn: listStudySources,
  });
}

export function useCreateStudySource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NewStudySource) => createStudySource(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-sources"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
}

export function useDeleteStudySource() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteStudySource(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-sources"] });
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });
}
