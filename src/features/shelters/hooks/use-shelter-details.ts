import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Shelter } from "@/features/shelters/types/shelter";
import { MOCK_SHELTERS } from "@/features/shelters/constants";

const fetchShelterDetails = async (
  shelterId: number,
): Promise<Shelter | null> => {
  await new Promise((res) => setTimeout(res, 300));
  return MOCK_SHELTERS.find((s) => s.id === shelterId) || null;
};

/**
 * Hook to fetch details for a specific shelter.
 */
export const useShelterDetails = (shelterId: number) => {
  const {
    data: shelter = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["shelter-details", shelterId],
    queryFn: () => fetchShelterDetails(shelterId),
    enabled: !!shelterId,
    ...queryConfig.queries,
  });

  return { shelter, isLoading, isError, error, refetch };
};
