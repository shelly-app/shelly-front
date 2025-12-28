// API response types matching backend schemas

export interface PetSpeciesApi {
  id: number;
  species: string;
}

export interface PetSexApi {
  id: number;
  sex: string;
}

export interface PetStatusApi {
  id: number;
  status: string;
}

export interface PetSizeApi {
  id: number;
  size: string;
}

export interface PetColorApi {
  id: number;
  color: string;
}

export interface EventApi {
  id: number;
  petId: number;
  name: string;
  description: string | null;
  dateTime: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface VaccinationApi {
  id: number;
  vaccineId: number;
  petId: number;
  createdAt: string;
  deletedAt: string | null;
  vaccineName: string;
}

export interface PetApiResponse {
  id: number;
  name: string;
  birthdate: string | null;
  breed: string | null;
  species: PetSpeciesApi;
  sex: PetSexApi;
  status: PetStatusApi;
  size: PetSizeApi;
  description: string | null;
  shelterId: number;
  colors: PetColorApi[];
  createdAt: string;
  updatedAt: string;
}

export interface PetDetailApiResponse extends PetApiResponse {
  events: EventApi[];
  vaccinations: VaccinationApi[];
}

export interface CreatePetPayload {
  name: string;
  birthdate?: string;
  breed?: string;
  speciesId: number;
  sexId: number;
  statusId: number;
  sizeId: number;
  description?: string;
  shelterId: number;
  colorIds: number[];
}

export interface UpdatePetPayload {
  name?: string;
  birthdate?: string | null;
  breed?: string | null;
  speciesId?: number;
  sexId?: number;
  statusId?: number;
  sizeId?: number;
  description?: string | null;
  shelterId?: number;
  colorIds?: number[];
}

export interface PetFilters {
  speciesId?: number;
  statusId?: number;
  shelterId?: number;
  sizeId?: number;
  colorId?: number;
}
