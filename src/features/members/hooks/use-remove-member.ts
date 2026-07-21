import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";

export const useRemoveMember = () => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<void, Error, number>({
    mutationFn: (userId) =>
      api.delete(`/shelters/${currentShelter?.id}/members/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["members", currentShelter?.id],
      });
    },
  });

  return {
    removeMemberAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};
