import { api } from "@/lib/api-client";
import type {
  PetApiResponse,
  PetDetailApiResponse,
  CreatePetPayload,
  UpdatePetPayload,
  PetFilters,
} from "../types/pet-api";

// Backend wraps responses in this format
interface ApiWrapper<T> {
  success: boolean;
  message: string;
  responseObject: T;
  statusCode: number;
}

export const petApi = {
  getPets: async (filters?: PetFilters): Promise<PetApiResponse[]> => {
    const response = await api.get<ApiWrapper<PetApiResponse[]>>("/pets", {
      params: filters,
    });
    // Backend wraps response in { success, message, responseObject, statusCode }
    return (response as any)?.responseObject || response;
  },

  getPetById: async (id: number): Promise<PetDetailApiResponse> => {
    const response = await api.get<ApiWrapper<PetDetailApiResponse>>(
      `/pets/${id}`,
    );
    return (response as any)?.responseObject || response;
  },

  createPet: async (data: CreatePetPayload): Promise<PetApiResponse> => {
    const response = await api.post<ApiWrapper<PetApiResponse>>("/pets", data);
    return (response as any)?.responseObject || response;
  },

  updatePet: async (
    id: number,
    data: UpdatePetPayload,
  ): Promise<PetApiResponse> => {
    const response = await api.patch<ApiWrapper<PetApiResponse>>(
      `/pets/${id}`,
      data,
    );
    return (response as any)?.responseObject || response;
  },

  deletePet: async (id: number): Promise<void> => {
    return api.delete(`/pets/${id}`);
  },

  archivePet: async (id: number): Promise<PetApiResponse> => {
    const response = await api.post<ApiWrapper<PetApiResponse>>(
      `/pets/${id}/archive`,
    );
    return (response as any)?.responseObject || response;
  },
};
