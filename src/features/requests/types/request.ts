export interface AdoptionRequest {
  id: number;
  petId: number;
  petName: string;
  petPhotoUrl?: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone?: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
  createdAt: number;

  questionnaire: {
    location: string;
    familyComposition: string;
    hasYard: boolean;
  };
}
