import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";

export const usePetColors = () => {
  const { data: colors = [], ...rest } = useQuery<string[]>({
    queryKey: ["pet-colors"],
    queryFn: () => api.get<never, string[]>("/pets/colors"),
    ...queryConfig.queries,
  });

  return { colors, ...rest };
};
