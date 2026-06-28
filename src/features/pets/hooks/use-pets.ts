import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import type { Pet } from "@/features/pets/types/pet";
import { useShelters } from "@/components/providers/shelters-provider";

export const usePets = () => {
  const { currentShelter } = useShelters();

  const {
    data: pets = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Pet[]>({
    queryKey: ["pets", currentShelter?.id],
    queryFn: () =>
      api.get<never, Pet[]>(`/shelters/${currentShelter?.id}/pets`),
    enabled: !!currentShelter?.id,
    ...queryConfig.queries,
  });

  return { pets, isLoading, isError, error, refetch };
};
