import { Entity } from "@/types/api";
import {
  PetSpecies,
  PetStatus,
  PetSex,
  PetSize,
  VACCINES,
  PET_SPECIES,
} from "@/features/pets/constants";

export type PetEvent = {
  id: number;
  petId: number;
  name: string;
  description: string | null;
  dateTime: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Pet = Entity<{
  photoUrl: string;
  photos?: string[]; // All photos for detail view
  name: string;
  species: PetSpecies;
  breed: string;
  status: PetStatus;
  birthdate?: string;
  age?: number;
  sex?: PetSex;
  size?: PetSize;
  colors?: string[];
  description?: string;
  vaccines?: Array<
    | keyof (typeof VACCINES)[typeof PET_SPECIES.DOG]
    | keyof (typeof VACCINES)[typeof PET_SPECIES.CAT]
  >;
  events?: PetEvent[];
}>;
