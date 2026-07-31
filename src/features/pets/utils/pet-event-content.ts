import { PET_SIZE_LABELS, PET_STATUS_LABELS } from "@/features/pets/constants";
import type { DetailedPet } from "@/features/pets/types/pet";

type PetEvent = DetailedPet["events"][number];

type TranslateFn = (key: string, options?: Record<string, unknown>) => string;

const LEGACY_VACCINATION_DESCRIPTION =
  /^Vaccination:\s*(.+?)\s*\(([A-Z0-9]+)\)$/i;

function translateValue(
  labels: Record<string, string>,
  value: string | null | undefined,
  t: TranslateFn,
) {
  return value ? t(labels[value] ?? value) : "";
}

function resolveVaccineLabel(
  vaccineCode: string | undefined,
  vaccineName: string | undefined,
  t: TranslateFn,
) {
  if (vaccineCode) {
    return t(`app.pets.vaccine_codes.${vaccineCode}`, {
      defaultValue: vaccineName ?? vaccineCode,
    });
  }

  return vaccineName ?? null;
}

function getVaccinationDetails(event: PetEvent) {
  const metadataCode = event.metadata?.vaccineCode ?? undefined;
  const metadataName = event.metadata?.vaccineName ?? undefined;

  if (metadataCode || metadataName) {
    return { vaccineCode: metadataCode, vaccineName: metadataName };
  }

  if (!event.description) {
    return { vaccineCode: undefined, vaccineName: undefined };
  }

  const match = event.description.match(LEGACY_VACCINATION_DESCRIPTION);
  if (match) {
    return { vaccineName: match[1], vaccineCode: match[2] };
  }

  return { vaccineCode: undefined, vaccineName: event.description };
}

export function getPetEventContent(event: PetEvent, t: TranslateFn) {
  const from = event.metadata?.from;
  const to = event.metadata?.to;
  const hasMetadata = from != null || to != null;

  switch (event.type) {
    case "status_change":
      return {
        title: t("app.pets.events.status_change.title"),
        description: hasMetadata
          ? t("app.pets.events.status_change.description", {
              from: translateValue(PET_STATUS_LABELS, from, t),
              to: translateValue(PET_STATUS_LABELS, to, t),
            })
          : null,
      };
    case "size_change":
      return {
        title: t("app.pets.events.size_change.title"),
        description: hasMetadata
          ? t("app.pets.events.size_change.description", {
              from: translateValue(PET_SIZE_LABELS, from, t),
              to: translateValue(PET_SIZE_LABELS, to, t),
            })
          : null,
      };
    case "name_change":
      return {
        title: t("app.pets.events.name_change.title"),
        description: hasMetadata
          ? t("app.pets.events.name_change.description", {
              from: from ?? "",
              to: to ?? "",
            })
          : null,
      };
    case "vaccination": {
      const { vaccineCode, vaccineName } = getVaccinationDetails(event);
      const vaccineLabel = resolveVaccineLabel(vaccineCode, vaccineName, t);

      return {
        title: t("app.pets.events.vaccination.title"),
        description:
          vaccineLabel && vaccineCode
            ? t("app.pets.events.vaccination.description", {
                vaccine: vaccineLabel,
                code: vaccineCode,
              })
            : vaccineLabel,
      };
    }
    default:
      return { title: event.name, description: event.description };
  }
}
