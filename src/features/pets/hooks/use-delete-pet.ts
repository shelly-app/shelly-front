import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";

export const useDeletePet = (petId: number) => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<void, Error>({
    mutationFn: () =>
      api.delete(`/shelters/${currentShelter?.id}/pets/${petId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["shelter-pets"] });
    },
  });

  return {
    deletePet: mutation.mutate,
    deletePetAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
