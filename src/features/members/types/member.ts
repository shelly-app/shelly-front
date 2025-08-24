import { BaseEntity } from "@/types/api";

export interface Member extends BaseEntity {
  id: number;
  fullName: string;
  profilePhoto?: string;
  location: string;
  joinedAt: number; // Unix timestamp
}
