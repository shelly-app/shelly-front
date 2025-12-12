import { z } from "zod";
import i18n from "@/i18n";

// Pet species options
export const PET_SPECIES = {
  DOG: "DOG",
  CAT: "CAT",
} as const;

export const PET_SPECIES_LABELS = {
  [PET_SPECIES.CAT]: i18n.t("app.pets.species_labels.CAT"),
  [PET_SPECIES.DOG]: i18n.t("app.pets.species_labels.DOG"),
} as const;

export type PetSpecies = (typeof PET_SPECIES)[keyof typeof PET_SPECIES];

export const PET_STATUS = {
  IN_TRANSIT: "IN_TRANSIT",
  IN_SHELTER: "IN_SHELTER",
  ADOPTED: "ADOPTED",
  IN_VET: "IN_VET",
} as const;

export const PET_STATUS_LABELS = {
  IN_TRANSIT: i18n.t("app.pets.status_labels.IN_TRANSIT"),
  IN_SHELTER: i18n.t("app.pets.status_labels.IN_SHELTER"),
  ADOPTED: i18n.t("app.pets.status_labels.ADOPTED"),
  IN_VET: i18n.t("app.pets.status_labels.IN_VET"),
} as const;

export type PetStatus = (typeof PET_STATUS)[keyof typeof PET_STATUS];

// Pet sex options
export const PET_SEXES = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export const PET_SEX_LABELS = {
  [PET_SEXES.MALE]: i18n.t("app.pets.sex_labels.MALE"),
  [PET_SEXES.FEMALE]: i18n.t("app.pets.sex_labels.FEMALE"),
} as const;

export type PetSex = (typeof PET_SEXES)[keyof typeof PET_SEXES];

// Pet size options
export const PET_SIZES = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
} as const;

export const PET_SIZE_LABELS = {
  [PET_SIZES.SMALL]: i18n.t("app.pets.size_labels.SMALL"),
  [PET_SIZES.MEDIUM]: i18n.t("app.pets.size_labels.MEDIUM"),
  [PET_SIZES.LARGE]: i18n.t("app.pets.size_labels.LARGE"),
} as const;

export type Vaccine = keyof (typeof VACCINES)[keyof typeof PET_SPECIES];

export const VACCINES = {
  [PET_SPECIES.DOG]: {
    sextuple1: i18n.t("app.pets.vaccines.dog.sextuple1"),
    sextuple2: i18n.t("app.pets.vaccines.dog.sextuple2"),
    sextuple3: i18n.t("app.pets.vaccines.dog.sextuple3"),
    rabia: i18n.t("app.pets.vaccines.dog.rabia"),
  },
  [PET_SPECIES.CAT]: {
    triple1: i18n.t("app.pets.vaccines.cat.triple1"),
    triple2: i18n.t("app.pets.vaccines.cat.triple2"),
    triple3: i18n.t("app.pets.vaccines.cat.triple3"),
    rabia: i18n.t("app.pets.vaccines.cat.rabia"),
    leptospirosis: i18n.t("app.pets.vaccines.cat.leptospirosis"),
    felv: i18n.t("app.pets.vaccines.cat.felv"),
    fiv: i18n.t("app.pets.vaccines.cat.fiv"),
  },
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
    [PET_STATUS.IN_TRANSIT, PET_STATUS.IN_SHELTER, PET_STATUS.ADOPTED] as const,
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

export const PET_COLORS = {
  black: "#000000",
  white: "#FFFFFF",
  brown: "#8B4513",
  gray: "#808080",
  beige: "#F5F5DC",
  gold: "#FFD700",
  golden: "#FFD700",
  red: "#DC143C",
  coffee: "#A0522D",
  cream: "#FFFDD0",
  sand: "#F4A460",
  chocolate: "#8B4513",
  orange: "#FF8C00",
  cinnamon: "#D2691E",
  fawn: "#E5B80B",
} as const;

export const PET_COLOR_LABELS = {
  black: i18n.t("app.pets.colors.black"),
  white: i18n.t("app.pets.colors.white"),
  brown: i18n.t("app.pets.colors.brown"),
  gray: i18n.t("app.pets.colors.gray"),
  beige: i18n.t("app.pets.colors.beige"),
  gold: i18n.t("app.pets.colors.gold"),
  golden: i18n.t("app.pets.colors.gold"),
  red: i18n.t("app.pets.colors.red"),
  coffee: i18n.t("app.pets.colors.coffee"),
  cream: i18n.t("app.pets.colors.cream"),
  sand: i18n.t("app.pets.colors.sand"),
  chocolate: i18n.t("app.pets.colors.chocolate"),
  orange: i18n.t("app.pets.colors.orange"),
  cinnamon: i18n.t("app.pets.colors.cinnamon"),
  fawn: i18n.t("app.pets.colors.fawn"),
};

export type PetColor = keyof typeof PET_COLORS;
