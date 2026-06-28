import { Badge } from "@/components/ui/badge";
import { PET_STATUS_LABELS } from "@/features/pets/constants";
import { useTranslation } from "react-i18next";

interface PetStatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, string> = {
  in_shelter: "shelter",
  adopted: "adopted",
  in_foster: "transit",
  deceased: "secondary",
};

export const PetStatusBadge = ({ status, className }: PetStatusBadgeProps) => {
  const { t } = useTranslation();
  return (
    <Badge
      variant={(statusConfig[status] ?? "secondary") as any}
      className={className}
    >
      {t(PET_STATUS_LABELS[status as keyof typeof PET_STATUS_LABELS] ?? status)}
    </Badge>
  );
};
