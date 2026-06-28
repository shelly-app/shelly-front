import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Pet } from "@/features/pets/types/pet";
import { useShelters } from "@/components/providers/shelters-provider";

export type UpdatePetData = {
  name?: string;
  specie?: string;
  status?: string;
  breed?: string;
  birthDate?: string | null;
  sex?: string;
  size?: string;
  colors?: string[];
  description?: string | null;
  vaccines?: string[];
};

export const useUpdatePet = (petId: number) => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<Pet, Error, UpdatePetData>({
    mutationFn: (data) =>
      api.patch<never, Pet>(
        `/shelters/${currentShelter?.id}/pets/${petId}`,
        data,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["pets", String(petId)] });
      queryClient.invalidateQueries({ queryKey: ["shelter-pets"] });
    },
  });

  return {
    updatePet: mutation.mutate,
    updatePetAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
