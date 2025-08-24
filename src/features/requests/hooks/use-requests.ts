import { useQuery } from "@tanstack/react-query";
import { queryConfig } from "@/lib/react-query";
import type { AdoptionRequest } from "@/features/requests/types/request";
import { REQUEST_STATUS } from "@/features/requests/constants";

const mockRequestsData: AdoptionRequest[] = [
  {
    id: 1,
    petId: 1,
    petName: "Luna",
    petPhotoUrl: "https://placedog.net/100",
    requesterName: "Juan Pérez",
    requesterEmail: "juan@example.com",
    requesterPhone: "+5491112345678",
    status: REQUEST_STATUS.PENDING,
    message: "Me encantaría adoptar a Luna y ofrecerle un hogar amoroso.",
    createdAt: new Date().getTime(),
    questionnaire: {
      location: "CABA, Buenos Aires, Argentina",
      familyComposition: "Soltero",
      hasYard: false,
    },
  },
  {
    id: 2,
    petId: 2,
    petName: "Rocky",
    petPhotoUrl: "https://placedog.net/150",
    requesterName: "María García",
    requesterEmail: "maria@example.com",
    requesterPhone: "+5491112345678",
    status: REQUEST_STATUS.APPROVED,
    message: "Tengo experiencia con perros y un gran jardín para Rocky.",
    createdAt: new Date().getTime(),
    questionnaire: {
      location: "San Antonio de Areco, Buenos Aires, Argentina",
      familyComposition: "Casado, 2 hijos",
      hasYard: true,
    },
  },
  {
    id: 3,
    petId: 3,
    petName: "Misha",
    petPhotoUrl: "https://placedog.net/200",
    requesterName: "Carlos López",
    requesterEmail: "carlos@example.com",
    requesterPhone: "+5491112345678",
    status: REQUEST_STATUS.REJECTED,
    message: "Busco un compañero para mi hija y Misha parece perfecta.",
    createdAt: new Date().getTime(),
    questionnaire: {
      location: "Campana, Buenos Aires, Argentina",
      familyComposition: "Soltero, 1 hija",
      hasYard: false,
    },
  },
  {
    id: 4,
    petId: 4,
    petName: "Max",
    petPhotoUrl: "https://placedog.net/250",
    requesterName: "Ana Martínez",
    requesterEmail: "ana@example.com",
    requesterPhone: "+5491112345678",
    status: REQUEST_STATUS.PENDING,
    createdAt: new Date().getTime(),
    questionnaire: {
      location: "Campana, Buenos Aires, Argentina",
      familyComposition: "Soltero, 1 hija",
      hasYard: false,
    },
  },
];

const fetchRequests = async (): Promise<AdoptionRequest[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockRequestsData;
};

export const useRequests = () => {
  const {
    data: requests = mockRequestsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: fetchRequests,
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
