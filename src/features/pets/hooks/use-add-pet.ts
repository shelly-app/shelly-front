import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Pet } from "@/features/pets/types/pet";
import {
  PetSpecies,
  PetStatus,
  PetSex,
  PetSize,
} from "@/features/pets/constants";
import { petApi } from "../api/pet-api";
import { mapApiPetToDomain } from "../api/pet-mapper";
import type { CreatePetPayload } from "../types/pet-api";

// Types for the form data
export type QuickAddPetData = {
  name: string;
  species: PetSpecies;
  status: PetStatus;
};

export type CompleteAddPetData = QuickAddPetData & {
  breed?: string;
  age?: number;
  sex?: PetSex;
  size?: PetSize;
  color?: string;
  description?: string;
  photoUrl?: string;
};

export type AddPetData = QuickAddPetData | CompleteAddPetData;

// TODO: This mapping function needs to be implemented properly with actual lookup data
// For now, using placeholder values - this should be replaced with actual API lookup values
const mapFormDataToPayload = (data: AddPetData): CreatePetPayload => {
  // TODO: Replace these placeholder IDs with actual lookups from the backend
  // These should come from GET /species, /statuses, /sexes, /sizes endpoints
  const speciesId = 1; // Placeholder
  const statusId = 1; // Placeholder
  const sexId = 1; // Placeholder
  const sizeId = 1; // Placeholder
  const colorIds = [1]; // Placeholder
  const shelterId = 1; // TODO: Get from user context or shelter selection

  return {
    name: data.name,
    breed: (data as CompleteAddPetData).breed,
    description: (data as CompleteAddPetData).description,
    speciesId,
    statusId,
    sexId,
    sizeId,
    colorIds,
    shelterId,
  };
};

const createPet = async (data: AddPetData): Promise<Pet> => {
  const payload = mapFormDataToPayload(data);
  const apiPet = await petApi.createPet(payload);
  return mapApiPetToDomain(apiPet);
};

export const useAddPet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Pet, Error, AddPetData>({
    mutationFn: createPet,
    onSuccess: () => {
      // Invalidate the query to refetch with updated data
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
    onError: (error) => {
      console.error("Error creating pet:", error);
    },
    ...queryConfig.queries,
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
