import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Pet } from "@/features/pets/types/pet";
import { PET_SPECIES, PET_STATUS } from "@/features/pets/constants";

// Create a mutable array that can be updated
let mockPetsData: Pet[] = [
  {
    id: 1,
    photoUrl: "https://cataas.com/cat",
    name: "Luna",
    species: PET_SPECIES.CAT,
    breed: "Persa",
    status: PET_STATUS.IN_SHELTER,
    createdAt: new Date().getTime(),
  },
  {
    id: 2,
    photoUrl: "https://placedog.net/200/201",
    name: "Max",
    species: PET_SPECIES.DOG,
    breed: "labrador Retriever",
    status: PET_STATUS.IN_TRANSIT,
    createdAt: new Date().getTime(),
  },
  {
    id: 3,
    photoUrl: "https://cataas.com/cat/orange,cute",
    name: "Misha",
    species: PET_SPECIES.CAT,
    breed: "Siamés",
    status: PET_STATUS.ADOPTED,
    createdAt: new Date().getTime(),
  },
  {
    id: 4,
    photoUrl: "https://placedog.net/201/200",
    name: "Rocky",
    species: PET_SPECIES.DOG,
    breed: "Pastor Alemán",
    status: PET_STATUS.IN_SHELTER,
    createdAt: new Date().getTime(),
  },
  {
    id: 5,
    photoUrl: "https://cataas.com/cat/says/hello",
    name: "Nube",
    species: PET_SPECIES.CAT,
    breed: "Mestizo",
    status: PET_STATUS.IN_TRANSIT,
    createdAt: new Date().getTime(),
  },
];

const fetchPets = async (): Promise<Pet[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockPetsData;
};

// Export function to add pets to the mock data
export const addPetToMockData = (pet: Pet) => {
  mockPetsData = [pet, ...mockPetsData];
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
