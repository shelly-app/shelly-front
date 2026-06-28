import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import type { Shelter } from "@/features/shelters/types/shelter";

export const usePublicShelters = () => {
  const {
    data: shelters = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Shelter[]>({
    queryKey: ["public-shelters"],
    queryFn: () => api.get<never, Shelter[]>("/shelters"),
    ...queryConfig.queries,
  });

  return { shelters, isLoading, isError, error, refetch };
};
