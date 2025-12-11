import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Shelter } from "@/features/shelters/types/shelter";
import { MOCK_SHELTERS } from "@/features/shelters/constants";

const fetchPublicShelters = async (): Promise<Shelter[]> => {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_SHELTERS;
};

/**
 * Hook to fetch public shelters list for the landing/public shelters page.
 * Note: This is different from useShelters in shelters-provider.tsx which
 * manages the current shelter context for authenticated users.
 */
export const usePublicShelters = () => {
  const {
    data: shelters = MOCK_SHELTERS,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["public-shelters"],
    queryFn: fetchPublicShelters,
    ...queryConfig.queries,
  });

  return { shelters, isLoading, isError, error, refetch };
};
