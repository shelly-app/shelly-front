import { Entity } from '@/types/api';
import {
  PetSpecies,
  PetStatus,
  PetSex,
  PetSize,
} from '@/features/pets/constants';

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
  color?: string;
  description?: string;
}>;
