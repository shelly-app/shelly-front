import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Pet } from "@/features/pets/types/pet";
import { petApi } from "../api/pet-api";
import { mapApiPetToDomain } from "../api/pet-mapper";

const fetchPets = async (): Promise<Pet[]> => {
  const apiPets = await petApi.getPets();
  return apiPets.map(mapApiPetToDomain);
};

export const usePets = () => {
  const {
    data: pets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Pet[]>({
    queryKey: ["pets"],
    queryFn: fetchPets,
    ...queryConfig.queries,
  });

  return { pets, isLoading, isError, error, refetch };
};
