import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { petApi } from "../api/pet-api";

const deletePet = async (petId: number): Promise<void> => {
  await petApi.deletePet(petId);
};

export const useDeletePet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, number>({
    mutationFn: deletePet,
    onSuccess: (_, petId) => {
      // Invalidate both the list and the individual pet query
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["pets", petId.toString()] });
    },
    onError: (error) => {
      console.error("Error deleting pet:", error);
    },
    ...queryConfig.queries,
  });

  return {
    deletePet: mutation.mutate,
    deletePetAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
