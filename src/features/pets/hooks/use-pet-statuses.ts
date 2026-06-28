import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";

export const usePetStatuses = () => {
  const { data: statuses = [], ...rest } = useQuery<string[]>({
    queryKey: ["pet-statuses"],
    queryFn: () => api.get<never, string[]>("/pets/status"),
    ...queryConfig.queries,
  });

  return { statuses, ...rest };
};
