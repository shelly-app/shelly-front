import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import type { Shelter } from "@/features/shelters/types/shelter";

export const useShelterDetails = (shelterId: number) => {
  const {
    data: shelter = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Shelter>({
    queryKey: ["shelter-details", shelterId],
    queryFn: () => api.get<never, Shelter>(`/shelters/${shelterId}`),
    enabled: !!shelterId,
    ...queryConfig.queries,
  });

  return { shelter, isLoading, isError, error, refetch };
};
