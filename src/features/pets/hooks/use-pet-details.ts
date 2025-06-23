import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Pet } from "@/features/pets/types/pet";
import {
  PET_SPECIES,
  PET_STATUSES,
  PET_SEXES,
  PET_SIZES,
} from "@/features/pets/constants";
import Lila from "@/assets/images/lila.webp";

// Mock function to fetch a single pet by ID
const fetchPetById = async (petId: string): Promise<Pet> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate potential error (5% chance)
  if (Math.random() < 0.05) {
    throw new Error("Error al cargar la mascota. Por favor, intenta de nuevo.");
  }

  // Mock data - in a real app, this would be an API call
  const mockPet: Pet = {
    id: parseInt(petId),
    photoUrl: Lila,
    name: `Lila`,
    species: PET_SPECIES.DOG,
    breed: "Mestiza",
    status: PET_STATUSES.ADOPTED,
    age: 6,
    sex: PET_SEXES.FEMALE,
    size: PET_SIZES.MEDIUM,
    color: "Marrón",
    description:
      "Lila es una perrita muy cariñosa y juguetona. Le encanta estar con niños y otros animales. Es muy tranquila y le gusta mucho estar con su familia.",
    createdAt: new Date().getTime(),
    vaccines: ["sextuple1", "rabia"],
  };

  return mockPet;
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
