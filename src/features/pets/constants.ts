import { z } from "zod";

// Pet species options
export const PET_SPECIES = {
  DOG: "DOG",
  CAT: "CAT",
} as const;

export const PET_SPECIES_LABELS = {
  [PET_SPECIES.CAT]: "Gato",
  [PET_SPECIES.DOG]: "Perro",
} as const;

export type PetSpecies = (typeof PET_SPECIES)[keyof typeof PET_SPECIES];

export const PET_STATUS = {
  IN_TRANSIT: "IN_TRANSIT",
  IN_SHELTER: "IN_SHELTER",
  ADOPTED: "ADOPTED",
  IN_VET: "IN_VET",
} as const;

export const PET_STATUS_LABELS = {
  IN_TRANSIT: "En tránsito",
  IN_SHELTER: "En refugio",
  ADOPTED: "Adoptado",
  IN_VET: "En veterinaria",
} as const;

export type PetStatus = (typeof PET_STATUS)[keyof typeof PET_STATUS];

// Pet sex options
export const PET_SEXES = {
  MALE: "MALE",
  FEMALE: "FEMALE",
} as const;

export const PET_SEX_LABELS = {
  [PET_SEXES.MALE]: "Macho",
  [PET_SEXES.FEMALE]: "Hembra",
} as const;

export type PetSex = (typeof PET_SEXES)[keyof typeof PET_SEXES];

// Pet size options
export const PET_SIZES = {
  SMALL: "SMALL",
  MEDIUM: "MEDIUM",
  LARGE: "LARGE",
} as const;

export const PET_SIZE_LABELS = {
  [PET_SIZES.SMALL]: "Pequeño",
  [PET_SIZES.MEDIUM]: "Mediano",
  [PET_SIZES.LARGE]: "Grande",
} as const;

export type Vaccine =
  | keyof (typeof VACCINES)[typeof PET_SPECIES.DOG]
  | keyof (typeof VACCINES)[typeof PET_SPECIES.CAT];

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
    required_error: "La especie es requerida",
  });

export const createStatusSchema = () =>
  z.enum(
    [PET_STATUS.IN_TRANSIT, PET_STATUS.IN_SHELTER, PET_STATUS.ADOPTED] as const,
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

export const PET_COLORS = {
  Negro: "#000000",
  Blanco: "#FFFFFF",
  Marrón: "#8B4513",
  Gris: "#808080",
  Beige: "#F5F5DC",
  Dorado: "#FFD700",
  Rojo: "#DC143C",
  Café: "#A0522D",
  Crema: "#FFFDD0",
  Caramelo: "#D2691E",
  Arena: "#F4A460",
  Chocolate: "#8B4513",
  Naranja: "#FF8C00",
  Canela: "#D2691E",
  Cervato: "#E5B80B",
} as const;

export type PetColor = keyof typeof PET_COLORS;
