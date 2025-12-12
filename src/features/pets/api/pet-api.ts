import { api } from "@/lib/api-client";
import type {
  ApiResponse,
  ApiRequestBody,
  ApiQueryParams,
} from "@/types/generated";

// Extract types from generated OpenAPI specification
type GetPetsResponse = ApiResponse<"/pets", "get">;
type GetPetByIdResponse = ApiResponse<"/pets/{id}", "get">;

// Export types for use in other parts of the application
export type CreatePetRequest = ApiRequestBody<"/pets", "post">;
export type UpdatePetRequest = ApiRequestBody<"/pets/{id}", "patch">;
export type PetFilters = ApiQueryParams<"/pets", "get">;

// Unwrap the responseObject from the API wrapper
export type Pet = NonNullable<GetPetsResponse["responseObject"]>[number];
export type PetDetail = NonNullable<GetPetByIdResponse["responseObject"]>;

export const petApi = {
  getPets: async (filters?: PetFilters): Promise<Pet[]> => {
    const response = await api.get<GetPetsResponse>("/pets", {
      params: filters,
    });
    // Backend wraps response in { success, message, responseObject, statusCode }
    return (response as any)?.responseObject || response;
  },

  getPetById: async (id: number): Promise<PetDetail> => {
    const response = await api.get<GetPetByIdResponse>(`/pets/${id}`);
    return (response as any)?.responseObject || response;
  },

  createPet: async (data: CreatePetRequest): Promise<Pet> => {
    const response = await api.post<GetPetByIdResponse>("/pets", data);
    return (response as any)?.responseObject || response;
  },

  updatePet: async (id: number, data: UpdatePetRequest): Promise<Pet> => {
    const response = await api.patch<GetPetByIdResponse>(`/pets/${id}`, data);
    return (response as any)?.responseObject || response;
  },

  deletePet: async (id: number): Promise<void> => {
    return api.delete(`/pets/${id}`);
  },

  archivePet: async (id: number): Promise<Pet> => {
    const response = await api.post<GetPetByIdResponse>(`/pets/${id}/archive`);
    return (response as any)?.responseObject || response;
  },
};
