import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Pet } from "@/features/pets/types/pet";
import { useShelters } from "@/components/providers/shelters-provider";

export type AddPetData = {
  name: string;
  specie: string;
  status: string;
  breed?: string;
  birthDate?: string;
  sex?: string;
  size?: string;
  colors?: string[];
  description?: string;
  vaccines?: string[];
};

export const useAddPet = () => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<Pet, Error, AddPetData>({
    mutationFn: (data) =>
      api.post<never, Pet>(`/shelters/${currentShelter?.id}/pets`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
      queryClient.invalidateQueries({ queryKey: ["shelter-pets"] });
    },
    onError: (error) => {
      console.error("Error creating pet:", error);
    },
  });

  return {
    addPet: mutation.mutate,
    addPetAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
};
