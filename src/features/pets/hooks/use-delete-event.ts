import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";

export const useDeleteEvent = (petId: number) => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<void, Error, number>({
    mutationFn: (eventId) =>
      api.delete(
        `/shelters/${currentShelter?.id}/pets/${petId}/events/${eventId}`,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets", String(petId)] });
      queryClient.invalidateQueries({ queryKey: ["shelter-pets"] });
    },
  });

  return {
    deleteEvent: mutation.mutate,
    deleteEventAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
