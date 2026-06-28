import { z } from "zod";
import i18n from "@/i18n";

// Pet species options
export const PET_SPECIES = {
  DOG: "dog",
  CAT: "cat",
} as const;

export const PET_SPECIES_LABELS = {
  [PET_SPECIES.CAT]: "app.pets.species_labels.CAT",
  [PET_SPECIES.DOG]: "app.pets.species_labels.DOG",
} as const;

export type PetSpecies = (typeof PET_SPECIES)[keyof typeof PET_SPECIES];

export const PET_STATUS = {
  IN_SHELTER: "in_shelter",
  ADOPTED: "adopted",
  IN_FOSTER: "in_foster",
  DECEASED: "deceased",
} as const;

export const PET_STATUS_LABELS = {
  in_shelter: "app.pets.status_labels.IN_SHELTER",
  adopted: "app.pets.status_labels.ADOPTED",
  in_foster: "app.pets.status_labels.IN_FOSTER",
  deceased: "app.pets.status_labels.DECEASED",
} as const;

export type PetStatus = (typeof PET_STATUS)[keyof typeof PET_STATUS];

// Pet sex options
export const PET_SEXES = {
  MALE: "male",
  FEMALE: "female",
} as const;

export const PET_SEX_LABELS = {
  [PET_SEXES.MALE]: "app.pets.sex_labels.MALE",
  [PET_SEXES.FEMALE]: "app.pets.sex_labels.FEMALE",
} as const;

export type PetSex = (typeof PET_SEXES)[keyof typeof PET_SEXES];

// Pet size options
export const PET_SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
} as const;

export const PET_SIZE_LABELS = {
  [PET_SIZES.SMALL]: "app.pets.size_labels.SMALL",
  [PET_SIZES.MEDIUM]: "app.pets.size_labels.MEDIUM",
  [PET_SIZES.LARGE]: "app.pets.size_labels.LARGE",
} as const;

export type PetSize = (typeof PET_SIZES)[keyof typeof PET_SIZES];

// Helper functions to get options for forms
export const getSpeciesOptions = () => [
  { value: PET_SPECIES.DOG, label: PET_SPECIES_LABELS[PET_SPECIES.DOG] },
  { value: PET_SPECIES.CAT, label: PET_SPECIES_LABELS[PET_SPECIES.CAT] },
];

export const getStatusOptions = () =>
  Object.entries(PET_STATUS_LABELS).map(([key, label]) => ({
    value: key,
    label,
  }));

export const getSexOptions = () => [
  { value: PET_SEXES.MALE, label: PET_SEX_LABELS[PET_SEXES.MALE] },
  { value: PET_SEXES.FEMALE, label: PET_SEX_LABELS[PET_SEXES.FEMALE] },
];

export const getSizeOptions = () => [
  { value: PET_SIZES.SMALL, label: PET_SIZE_LABELS[PET_SIZES.SMALL] },
  { value: PET_SIZES.MEDIUM, label: PET_SIZE_LABELS[PET_SIZES.MEDIUM] },
  { value: PET_SIZES.LARGE, label: PET_SIZE_LABELS[PET_SIZES.LARGE] },
];

// Validation schemas
export const createSpeciesSchema = () =>
  z.enum([PET_SPECIES.CAT, PET_SPECIES.DOG] as const, {
    required_error: i18n.t("app.pets.validation.species_required"),
  });

export const createStatusSchema = () =>
  z.enum(
    [
      PET_STATUS.IN_SHELTER,
      PET_STATUS.ADOPTED,
      PET_STATUS.IN_FOSTER,
      PET_STATUS.DECEASED,
    ] as const,
    {
      required_error: i18n.t("app.pets.validation.status_required"),
    },
  );

export const createSexSchema = () =>
  z.enum([PET_SEXES.MALE, PET_SEXES.FEMALE] as const).optional();

export const createSizeSchema = () =>
  z
    .enum([PET_SIZES.SMALL, PET_SIZES.MEDIUM, PET_SIZES.LARGE] as const)
    .optional();
