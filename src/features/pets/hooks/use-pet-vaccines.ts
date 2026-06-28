import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";

type Vaccine = { code: string; name: string; specie: string };

export const usePetVaccines = () => {
  const { data: vaccines = [], ...rest } = useQuery<Vaccine[]>({
    queryKey: ["pet-vaccines"],
    queryFn: () => api.get<never, Vaccine[]>("/pets/vaccines"),
    ...queryConfig.queries,
  });

  return { vaccines, ...rest };
};
