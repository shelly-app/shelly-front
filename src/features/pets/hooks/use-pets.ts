import { useQuery } from '@tanstack/react-query';
import { queryConfig } from '@/lib/react-query';
import type { Pet } from '../types/pet';

const MOCK_PETS: Pet[] = [
  {
    id: 1,
    photoUrl: 'https://cataas.com/cat',
    name: 'Luna',
    species: 'gato',
    breed: 'Persa',
    status: 'en refugio',
    createdAt: new Date().getTime(),
  },
  {
    id: 2,
    photoUrl: 'https://placedog.net/200/201',
    name: 'Max',
    species: 'perro',
    breed: 'labrador Retriever',
    status: 'en transito',
    createdAt: new Date().getTime(),
  },
  {
    id: 3,
    photoUrl: 'https://cataas.com/cat/orange,cute',
    name: 'Misha',
    species: 'gato',
    breed: 'Siamés',
    status: 'adoptado',
    createdAt: new Date().getTime(),
  },
  {
    id: 4,
    photoUrl: 'https://placedog.net/201/200',
    name: 'Rocky',
    species: 'perro',
    breed: 'Pastor Alemán',
    status: 'en refugio',
    createdAt: new Date().getTime(),
  },
  {
    id: 5,
    photoUrl: 'https://cataas.com/cat/says/hello',
    name: 'Nube',
    species: 'gato',
    breed: 'Mestizo',
    status: 'en transito',
    createdAt: new Date().getTime(),
  },
];

const fetchPets = async (): Promise<Pet[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return MOCK_PETS;
};

export const usePets = () => {
  const {
    data: pets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Pet[]>({
    queryKey: ['pets'],
    queryFn: fetchPets,
    ...queryConfig.queries,
  });

  return { pets, isLoading, isError, error, refetch };
};
