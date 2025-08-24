import { Badge } from "@/components/ui/badge";
import { PET_STATUS_LABELS, PetStatus } from "@/features/pets/constants";

interface PetStatusBadgeProps {
  status: PetStatus;
}

const statusConfig = {
  IN_SHELTER: "shelter",
  IN_TRANSIT: "transit",
  ADOPTED: "adopted",
  IN_VET: "vet",
};

export const PetStatusBadge = ({ status }: PetStatusBadgeProps) => {
  return (
    <Badge variant={statusConfig[status] as any}>
      {PET_STATUS_LABELS[status]}
    </Badge>
  );
};
