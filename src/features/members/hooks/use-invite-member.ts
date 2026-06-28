import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";

export type InviteMemberData = {
  email: string;
  role?: string;
};

type InviteMemberResponse = {
  userId: number;
  name: string;
  email: string;
  role: string;
  shelterId: number;
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<InviteMemberResponse, Error, InviteMemberData>({
    mutationFn: ({ email, role = "volunteer" }) =>
      api.post<never, InviteMemberResponse>(
        `/shelters/${currentShelter?.id}/members`,
        { email, role },
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  return {
    invite: mutation.mutate,
    inviteAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
