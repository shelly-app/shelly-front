import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";

export type SubmitAdoptionRequestData = {
  shelterId: number;
  petId: number;
  requesterName: string;
  requesterEmail: string;
  requesterPhone?: string;
  message?: string;
  location: string;
  familyComposition?: string;
  hasYard?: boolean;
};

/**
 * Public (unauthenticated) submission of an adoption request from the shelter
 * detail pages. The endpoint is mounted without auth on the backend.
 */
export const useSubmitAdoptionRequest = () => {
  const mutation = useMutation<unknown, Error, SubmitAdoptionRequestData>({
    mutationFn: ({ shelterId, petId, ...body }) =>
      api.post(`/shelters/${shelterId}/pets/${petId}/adoption-requests`, body),
  });

  return {
    submit: mutation.mutate,
    submitAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
