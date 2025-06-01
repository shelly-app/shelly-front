import { Entity } from '@/types/api';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PetStatus = 'en transito' | 'en refugio' | 'adoptado';
type PetSpecies = 'gato' | 'perro';

export type Pet = Entity<{
  photoUrl: string;
  name: string;
  species: PetSpecies;
  breed: string;
  status: PetStatus;
}>;
