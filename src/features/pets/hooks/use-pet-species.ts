import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";

export const usePetSpecies = () => {
  const { data: species = [], ...rest } = useQuery<string[]>({
    queryKey: ["pet-species"],
    queryFn: () => api.get<never, string[]>("/pets/species"),
    ...queryConfig.queries,
  });

  return { species, ...rest };
};
