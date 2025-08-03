import { Entity } from "@/types/api";
import {
  PetSpecies,
  PetStatus,
  PetSex,
  PetSize,
  VACCINES,
  PET_SPECIES,
} from "@/features/pets/constants";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Pet = Entity<{
  photoUrl: string;
  name: string;
  species: PetSpecies;
  breed: string;
  status: PetStatus;
  age?: number;
  sex?: PetSex;
  size?: PetSize;
  colors?: string[];
  description?: string;
  vaccines?: Array<
    | keyof (typeof VACCINES)[typeof PET_SPECIES.DOG]
    | keyof (typeof VACCINES)[typeof PET_SPECIES.CAT]
  >;
}>;
