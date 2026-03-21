import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import type { DetailedPet } from "@/features/pets/types/pet";
import { useShelters } from "@/components/providers/shelters-provider";

export const usePetDetails = (petId: string) => {
  const { currentShelter } = useShelters();

  const {
    data: pet,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<DetailedPet>({
    queryKey: ["pets", currentShelter?.id, petId],
    queryFn: () =>
      api.get<never, DetailedPet>(
        `/shelters/${currentShelter?.id}/pets/${petId}`,
      ),
    enabled: !!petId && !!currentShelter?.id,
    ...queryConfig.queries,
  });

  return { pet, isLoading, isError, error, refetch };
};
