import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";

type UpdateProfileData = {
  name?: string;
  // "" clears the avatar, a non-empty string is a newly uploaded S3 key.
  avatarKey?: string;
};

export const useUpdateProfile = (userId: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, Error, UpdateProfileData>({
    mutationFn: (data) => api.patch(`/users/${userId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });

  return {
    updateProfile: mutation.mutate,
    updateProfileAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};
