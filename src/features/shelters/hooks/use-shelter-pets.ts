import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { PET_STATUS } from "@/features/pets/constants";
import {
  MOCK_SHELTER_PETS,
  type ShelterPet,
} from "@/features/shelters/constants/mock-shelter-pets";

const fetchShelterPets = async (shelterId: number): Promise<ShelterPet[]> => {
  await new Promise((res) => setTimeout(res, 500));

  // Filter pets by shelter, exclude archived and adopted
  return MOCK_SHELTER_PETS.filter(
    (pet) =>
      pet.shelterId === shelterId &&
      pet.archivedAt === null &&
      pet.status !== PET_STATUS.ADOPTED,
  );
};

/**
 * Hook to fetch available pets for a specific shelter.
 * Returns only pets that are not archived and not adopted.
 */
export const useShelterPets = (shelterId: number) => {
  const {
    data: pets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["shelter-pets", shelterId],
    queryFn: () => fetchShelterPets(shelterId),
    enabled: !!shelterId,
    ...queryConfig.queries,
  });

  return { pets, isLoading, isError, error, refetch };
};
