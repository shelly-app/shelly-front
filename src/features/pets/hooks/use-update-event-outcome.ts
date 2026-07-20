import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";

export type EventOutcome = "completed" | "canceled";

type UpdateEventOutcomeData = {
  eventId: number;
  outcome: EventOutcome;
};

export const useUpdateEventOutcome = (petId: number) => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<void, Error, UpdateEventOutcomeData>({
    mutationFn: ({ eventId, outcome }) =>
      api.patch(
        `/shelters/${currentShelter?.id}/pets/${petId}/events/${eventId}`,
        { outcome },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pets", currentShelter?.id, String(petId)],
      });
      queryClient.invalidateQueries({ queryKey: ["shelter-pets"] });
    },
  });

  return {
    updateEventOutcome: mutation.mutate,
    updateEventOutcomeAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
};
