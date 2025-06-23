import { z } from "zod";

// Pet species options
export const PET_SPECIES = {
  DOG: "perro",
  CAT: "gato",
} as const;

export const PET_SPECIES_LABELS = {
  [PET_SPECIES.CAT]: "Gato",
  [PET_SPECIES.DOG]: "Perro",
} as const;

export type PetSpecies = (typeof PET_SPECIES)[keyof typeof PET_SPECIES];

// Pet status options
export const PET_STATUSES = {
  IN_TRANSIT: "en transito",
  IN_SHELTER: "en refugio",
  ADOPTED: "adoptado",
} as const;

export const PET_STATUS_LABELS = {
  [PET_STATUSES.IN_TRANSIT]: "En tránsito",
  [PET_STATUSES.IN_SHELTER]: "En refugio",
  [PET_STATUSES.ADOPTED]: "Adoptado",
} as const;

export type PetStatus = (typeof PET_STATUSES)[keyof typeof PET_STATUSES];

// Pet sex options
export const PET_SEXES = {
  MALE: "macho",
  FEMALE: "hembra",
} as const;

export const PET_SEX_LABELS = {
  [PET_SEXES.MALE]: "Macho",
  [PET_SEXES.FEMALE]: "Hembra",
} as const;

export type PetSex = (typeof PET_SEXES)[keyof typeof PET_SEXES];

// Pet size options
export const PET_SIZES = {
  SMALL: "pequeño",
  MEDIUM: "mediano",
  LARGE: "grande",
} as const;

export const PET_SIZE_LABELS = {
  [PET_SIZES.SMALL]: "Pequeño",
  [PET_SIZES.MEDIUM]: "Mediano",
  [PET_SIZES.LARGE]: "Grande",
} as const;

export const VACCINES = {
  [PET_SPECIES.DOG]: {
    sextuple1: "1ra Sextuple",
    sextuple2: "2da Sextuple",
    sextuple3: "3ra Sextuple",
    rabia: "Rabia",
  },
  [PET_SPECIES.CAT]: {
    triple1: "1ra Triple",
    triple2: "2da Triple",
    triple3: "3ra Triple",
    rabia: "Rabia",
    leptospirosis: "Leptospirosis",
    felv: "FeLV",
    fiv: "FIV",
  },
} as const;

export type PetSize = (typeof PET_SIZES)[keyof typeof PET_SIZES];

// Helper functions to get options for forms
export const getSpeciesOptions = () => [
  { value: PET_SPECIES.DOG, label: PET_SPECIES_LABELS[PET_SPECIES.DOG] },
  { value: PET_SPECIES.CAT, label: PET_SPECIES_LABELS[PET_SPECIES.CAT] },
];

export const getStatusOptions = () => [
  {
    value: PET_STATUSES.IN_TRANSIT,
    label: PET_STATUS_LABELS[PET_STATUSES.IN_TRANSIT],
  },
  {
    value: PET_STATUSES.IN_SHELTER,
    label: PET_STATUS_LABELS[PET_STATUSES.IN_SHELTER],
  },
  {
    value: PET_STATUSES.ADOPTED,
    label: PET_STATUS_LABELS[PET_STATUSES.ADOPTED],
  },
];

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
    required_error: "La especie es requerida",
  });

export const createStatusSchema = () =>
  z.enum(
    [
      PET_STATUSES.IN_TRANSIT,
      PET_STATUSES.IN_SHELTER,
      PET_STATUSES.ADOPTED,
    ] as const,
    {
      required_error: "El estado es requerido",
    },
  );

export const createSexSchema = () =>
  z.enum([PET_SEXES.MALE, PET_SEXES.FEMALE] as const).optional();

export const createSizeSchema = () =>
  z
    .enum([PET_SIZES.SMALL, PET_SIZES.MEDIUM, PET_SIZES.LARGE] as const)
    .optional();
