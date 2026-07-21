import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useShelters } from "@/components/providers/shelters-provider";

type AddVaccinationData = {
  vaccineCode: string;
  administeredAt: string;
};

type VaccinationResponse = {
  vaccineName: string;
  vaccineCode: string;
  administeredAt: string;
};

export const useAddVaccination = (petId: number) => {
  const queryClient = useQueryClient();
  const { currentShelter } = useShelters();

  const mutation = useMutation<VaccinationResponse, Error, AddVaccinationData>({
    mutationFn: (data) =>
      api.post(
        `/shelters/${currentShelter?.id}/pets/${petId}/vaccinations`,
        data,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pets", currentShelter?.id, String(petId)],
      });
      queryClient.invalidateQueries({ queryKey: ["shelter-pets"] });
    },
  });

  return {
    addVaccination: mutation.mutate,
    addVaccinationAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
