import { BaseEntity } from "@/types/api";

export interface AdoptionRequest extends BaseEntity {
  id: number;
  petId: number;
  petName: string;
  petPhotoUrl?: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone?: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  rejectedAt: number | null;
  approvedAt: number | null;

  questionnaire: {
    location: string;
    familyComposition: string;
    hasYard: boolean;
  };
}
