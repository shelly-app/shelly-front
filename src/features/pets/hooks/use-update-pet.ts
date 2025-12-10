import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Pet } from "@/features/pets/types/pet";
import { petApi } from "../api/pet-api";
import { mapApiPetToDomain } from "../api/pet-mapper";
import type { UpdatePetPayload } from "../types/pet-api";

interface UpdatePetData {
  petId: number;
  data: Partial<UpdatePetPayload>;
}

const updatePet = async ({ petId, data }: UpdatePetData): Promise<Pet> => {
  const apiPet = await petApi.updatePet(petId, data);
  return mapApiPetToDomain(apiPet);
};

export const useUpdatePet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Pet, Error, UpdatePetData>({
    mutationFn: updatePet,
    onSuccess: (updatedPet) => {
      // Invalidate both the list and the individual pet query
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({
        queryKey: ["pets", updatedPet.id.toString()],
      });
    },
    onError: (error) => {
      console.error("Error updating pet:", error);
    },
    ...queryConfig.queries,
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
