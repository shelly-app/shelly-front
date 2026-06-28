import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import type { DetailedPet } from "@/features/pets/types/pet";

export const useShelterPets = (shelterId: number) => {
  const {
    data: pets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<DetailedPet[]>({
    queryKey: ["shelter-pets", shelterId],
    queryFn: () => api.get<never, DetailedPet[]>(`/shelters/${shelterId}/pets`),
    enabled: !!shelterId,
    ...queryConfig.queries,
  });

  return { pets, isLoading, isError, error, refetch };
};
