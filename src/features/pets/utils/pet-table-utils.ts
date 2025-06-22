import { PetStatus, PET_STATUSES } from '@/features/pets/constants';

export const petStatusColorMap: Record<PetStatus, string> = {
  [PET_STATUSES.IN_SHELTER]: 'bg-red-200 text-red-800 border border-red-300',
  [PET_STATUSES.IN_TRANSIT]:
    'bg-amber-200 text-amber-800 border border-amber-300',
  [PET_STATUSES.ADOPTED]:
    'bg-emerald-200 text-emerald-800 border border-emerald-300',
};
