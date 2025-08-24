import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { Member } from "@/features/members/types/member";
import { MOCK_MEMBERS } from "@/features/members/constants";

const fetchMembers = async (): Promise<Member[]> => {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_MEMBERS;
};

export const useMembers = () => {
  const {
    data: members = MOCK_MEMBERS,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
    ...queryConfig.queries,
  });

  return { members, isLoading, isError, error, refetch };
};
