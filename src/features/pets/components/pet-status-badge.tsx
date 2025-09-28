import { Badge } from "@/components/ui/badge";
import { PET_STATUS_LABELS, PetStatus } from "@/features/pets/constants";

interface PetStatusBadgeProps {
  status: PetStatus;
  className?: string;
}

const statusConfig = {
  IN_SHELTER: "shelter",
  IN_TRANSIT: "transit",
  ADOPTED: "adopted",
  IN_VET: "vet",
};

export const PetStatusBadge = ({ status, className }: PetStatusBadgeProps) => {
  console.log(status, PET_STATUS_LABELS[status]);
  return (
    <Badge variant={statusConfig[status] as any} className={className}>
      {PET_STATUS_LABELS[status]}
    </Badge>
  );
};
