export type Pet = {
  id: number;
  name: string;
  birthDate: string | null;
  breed: string;
  specie: string;
  sex: string;
  size: string | null;
  status: string;
  description: string | null;
  colors: string[];
  photoUrl: string | null;
  shelter: { name: string; city: string };
  createdAt?: string;
  updatedAt?: string;
};

export type DetailedPet = Pet & {
  vaccinations: {
    vaccine: string;
    vaccineCode: string;
    administeredAt: string;
  }[];
  statusHistory: { status: string; changedAt: string }[];
  events: {
    id: number;
    type:
      | "status_change"
      | "vaccination"
      | "user_event"
      | "name_change"
      | "size_change";
    name: string;
    description: string | null;
    metadata: { from?: string | null; to?: string | null } | null;
    scheduledFor: string | null;
    createdAt: string;
  }[];
};
