import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Pet } from "@/features/pets/types/pet";
import { petApi } from "../api/pet-api";
import { mapApiPetDetailToDomain } from "../api/pet-mapper";

const fetchPetById = async (petId: string): Promise<Pet> => {
  const apiPet = await petApi.getPetById(parseInt(petId));
  return mapApiPetDetailToDomain(apiPet);
};

export const usePetDetails = (petId: string) => {
  const {
    data: pet,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Pet>({
    queryKey: ["pets", petId],
    queryFn: () => fetchPetById(petId),
    enabled: !!petId, // Only run query if petId exists
    ...queryConfig.queries,
  });

  return { pet, isLoading, isError, error, refetch };
};
