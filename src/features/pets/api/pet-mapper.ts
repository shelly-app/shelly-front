import type { Pet } from "../types/pet";
import type { Pet as ApiPet, PetDetail as ApiPetDetail } from "./pet-api";

/**
 * Converts backend lowercase snake_case values to frontend UPPERCASE constants
 */
const toUpperSnakeCase = (value: string): string => {
  return value.toUpperCase().replace(/ /g, "_");
};

/**
 * Maps API pet response to domain Pet type
 */
export function mapApiPetToDomain(apiPet: ApiPet): Pet {
  return {
    id: apiPet.id,
    name: apiPet.name,
    species: toUpperSnakeCase(apiPet.species) as any,
    breed: apiPet.breed || "",
    status: toUpperSnakeCase(apiPet.status) as any,
    photoUrl: apiPet.profilePhotoUrl || "",
    sex: undefined,
    size: undefined,
    colors: [],
    description: undefined,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    archivedAt: null,
  };
}

/**
 * Maps API pet detail response to domain Pet type
 */
export function mapApiPetDetailToDomain(apiPet: ApiPetDetail): Pet {
  return {
    id: apiPet.id,
    name: apiPet.name,
    species: toUpperSnakeCase(apiPet.species) as any,
    breed: apiPet.breed || "",
    status: toUpperSnakeCase(apiPet.status) as any,
    photoUrl: apiPet.profilePhotoUrl || "",
    sex: apiPet.sex ? (toUpperSnakeCase(apiPet.sex) as any) : undefined,
    size: apiPet.size ? (toUpperSnakeCase(apiPet.size) as any) : undefined,
    colors: apiPet.colors || [],
    description: apiPet.description || undefined,
    vaccines: apiPet.vaccinations?.map((v) => v.vaccineName) as any,
    createdAt: new Date(apiPet.createdAt).getTime(),
    updatedAt: new Date(apiPet.updatedAt).getTime(),
    archivedAt: null,
  };
}
