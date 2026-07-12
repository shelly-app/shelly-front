import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";
import type { AdoptionRequest } from "@/features/requests/types/request";

export type UpdateRequestStatusData = {
  requestId: number;
  status: "approved" | "rejected";
  rejectionReason?: string;
};

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<AdoptionRequest, Error, UpdateRequestStatusData>(
    {
      mutationFn: ({ requestId, status, rejectionReason }) =>
        api.patch<never, AdoptionRequest>(
          `/shelters/${currentShelter?.id}/adoption-requests/${requestId}`,
          { status, rejectionReason },
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["requests"] });
        queryClient.invalidateQueries({
          queryKey: ["pets", currentShelter?.id],
        });
      },
    },
  );

  return {
    updateStatus: mutation.mutate,
    updateStatusAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
