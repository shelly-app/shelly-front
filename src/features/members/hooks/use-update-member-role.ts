import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { MemberRole } from "@/features/members/constants";

type UpdateMemberRoleData = {
  role: MemberRole;
};

export const useUpdateMemberRole = (userId: number, shelterId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, Error, UpdateMemberRoleData>({
    mutationFn: ({ role }) =>
      api.patch(`/users/${userId}`, {
        shelterRoles: [{ shelterId, role }],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members", shelterId] });
    },
  });

  return {
    updateMemberRoleAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    reset: mutation.reset,
  };
};
