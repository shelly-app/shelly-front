import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Pet } from "@/features/pets/types/pet";
import {
  PetSpecies,
  PetStatus,
  PetSex,
  PetSize,
} from "@/features/pets/constants";
import { addPetToMockData } from "./use-pets";

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

// Mock API function to create a pet
const createPet = async (data: AddPetData): Promise<Pet> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate potential error (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Error al crear la mascota. Por favor, intenta de nuevo.");
  }

  // Create a new pet with generated ID and timestamp
  const newPet: Pet = {
    id: Math.floor(Math.random() * 10000) + 1000, // Generate random ID
    photoUrl: (data as CompleteAddPetData).photoUrl || "https://cataas.com/cat", // Default image if none provided
    name: data.name,
    species: data.species,
    breed: (data as CompleteAddPetData).breed || "Mestizo",
    status: data.status,
    age: (data as CompleteAddPetData).age,
    sex: (data as CompleteAddPetData).sex,
    size: (data as CompleteAddPetData).size,
    color: (data as CompleteAddPetData).color,
    description: (data as CompleteAddPetData).description,
    createdAt: new Date().getTime(),
  };

  return newPet;
};

export const useAddPet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Pet, Error, AddPetData>({
    mutationFn: createPet,
    onSuccess: (newPet) => {
      // Add the pet to the mock data
      addPetToMockData(newPet);

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
