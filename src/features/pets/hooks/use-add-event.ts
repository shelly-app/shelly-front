import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";

type AddEventData = {
  name: string;
  description?: string;
  scheduledFor?: string;
};

type EventResponse = {
  id: number;
  name: string;
  description: string | null;
  scheduledFor: string | null;
  createdAt: string;
};

export const useAddEvent = (petId: number) => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<EventResponse, Error, AddEventData>({
    mutationFn: (data) =>
      api.post(`/shelters/${currentShelter?.id}/pets/${petId}/events`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["shelter-pets"] });
    },
  });

  return {
    addEvent: mutation.mutate,
    addEventAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
