import type { Pet } from "../types/pet";
import type { PetApiResponse, PetDetailApiResponse } from "../types/pet-api";

/**
 * Converts backend lowercase snake_case values to frontend UPPERCASE constants
 */
const toUpperSnakeCase = (value: string): string => {
  return value.toUpperCase().replace(/ /g, "_");
};

/**
 * Maps API pet response to domain Pet type
 */
export function mapApiPetToDomain(apiPet: PetApiResponse): Pet {
  return {
    id: apiPet.id,
    name: apiPet.name,
    species: toUpperSnakeCase(apiPet.species.species) as any,
    breed: apiPet.breed || "",
    status: toUpperSnakeCase(apiPet.status.status) as any,
    photoUrl: "", // TODO: Fetch from pet-photos endpoint or use placeholder
    sex: apiPet.sex?.sex
      ? (toUpperSnakeCase(apiPet.sex.sex) as any)
      : undefined,
    size: apiPet.size?.size
      ? (toUpperSnakeCase(apiPet.size.size) as any)
      : undefined,
    colors: apiPet.colors.map((c) => c.color),
    description: apiPet.description || undefined,
    createdAt: new Date(apiPet.createdAt).getTime(),
    updatedAt: new Date(apiPet.updatedAt).getTime(),
    archivedAt: null,
  };
}

/**
 * Maps API pet detail response to domain Pet type
 * Note: Currently maps to Pet type, but could be extended to include events and vaccinations
 */
export function mapApiPetDetailToDomain(apiPet: PetDetailApiResponse): Pet {
  const basePet = mapApiPetToDomain(apiPet);

  // Add vaccines from vaccinations if needed
  const vaccines = apiPet.vaccinations.map((v) => v.vaccineName) as any;

  return {
    ...basePet,
    vaccines: vaccines.length > 0 ? vaccines : undefined,
  };
}
