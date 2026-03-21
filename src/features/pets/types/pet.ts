export type Pet = {
  id: number;
  name: string;
  birthDate: string | null;
  breed: string;
  specie: string;
  sex: string;
  size: string;
  status: string;
  description: string | null;
  colors: string[];
  shelter: { name: string; city: string };
  createdAt?: string;
  updatedAt?: string;
};

export type DetailedPet = Pet & {
  vaccinations: { vaccine: string; administeredAt: string }[];
  statusHistory: { status: string; changedAt: string }[];
  events: {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
  }[];
};
