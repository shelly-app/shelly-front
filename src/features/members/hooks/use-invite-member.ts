import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";
import type { MemberRole } from "@/features/members/constants";

export type InviteMemberData = {
  email: string;
  role: MemberRole;
};

type InviteMemberResponse = {
  userId: number;
  name: string;
  email: string;
  role: MemberRole;
  shelterId: number;
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<InviteMemberResponse, Error, InviteMemberData>({
    mutationFn: ({ email, role }) =>
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
