import { PetStatus } from '../types/pet';

export const petStatusColorMap: Record<PetStatus, string> = {
  'en refugio': 'bg-red-200',
  'en transito': 'bg-amber-200',
  adoptado: 'bg-emerald-200',
};
