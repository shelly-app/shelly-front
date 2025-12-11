import { BaseEntity } from "@/types/api";

export interface Shelter extends BaseEntity {
  id: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website?: string;
  logoUrl?: string;
  petCount: number;
}
