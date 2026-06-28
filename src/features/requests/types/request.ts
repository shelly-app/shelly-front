import type { RequestStatus } from "@/features/requests/constants";

export interface AdoptionRequest {
  id: number;
  petId: number;
  petName: string;
  petPhotoUrl?: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone?: string | null;
  status: RequestStatus;
  message?: string | null;
  rejectionReason?: string | null;
  approvedAt: string | null;
  rejectedAt: string | null;
  createdAt: string;
  updatedAt: string | null;

  questionnaire: {
    location: string;
    familyComposition: string;
    hasYard: boolean;
  };
}
