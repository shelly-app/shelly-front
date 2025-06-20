import { Entity } from '@/types/api';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PetStatus = 'en transito' | 'en refugio' | 'adoptado';
type PetSpecies = 'gato' | 'perro';
export type PetSex = 'macho' | 'hembra';
export type PetSize = 'pequeño' | 'mediano' | 'grande';

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
