import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";
import type { Member } from "@/features/members/types/member";

export const useMembers = () => {
  const { currentShelter } = useShelters();
  const {
    data: members = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Member[]>({
    queryKey: ["members", currentShelter?.id],
    queryFn: () =>
      api.get<never, Member[]>(`/shelters/${currentShelter?.id}/members`),
    enabled: !!currentShelter?.id,
    ...queryConfig.queries,
  });

  return { members, isLoading, isError, error, refetch };
};
