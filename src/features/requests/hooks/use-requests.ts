import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";
import type { AdoptionRequest } from "@/features/requests/types/request";
import type { RequestStatus } from "@/features/requests/constants";

export const useRequests = (status?: RequestStatus) => {
  const { currentShelter } = useShelters();

  const {
    data: requests = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<AdoptionRequest[]>({
    queryKey: ["requests", currentShelter?.id, status ?? null],
    queryFn: () =>
      api.get<never, AdoptionRequest[]>(
        `/shelters/${currentShelter?.id}/adoption-requests`,
        { params: status ? { status } : undefined },
      ),
    enabled: !!currentShelter?.id,
    ...queryConfig.queries,
  });

  return {
    requests,
    isLoading,
    isError,
    error,
    refetch,
  };
};
