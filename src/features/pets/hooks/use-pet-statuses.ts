import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";

type PetStatusOption = { id: number; status: string };

export const usePetStatuses = () => {
  const { data: statuses = [], ...rest } = useQuery<PetStatusOption[]>({
    queryKey: ["pet-statuses"],
    queryFn: () => api.get<never, PetStatusOption[]>("/pets/status"),
    ...queryConfig.queries,
  });

  return { statuses, ...rest };
};
