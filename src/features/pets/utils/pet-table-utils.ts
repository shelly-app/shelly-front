import { PetStatus } from '../types/pet';

export const petStatusColorMap: Record<PetStatus, string> = {
  'en refugio': 'bg-red-200 text-red-800 border border-red-300',
  'en transito': 'bg-amber-200 text-amber-800 border border-amber-300',
  adoptado: 'bg-emerald-200 text-emerald-800 border border-emerald-300',
};
