import { isValid, parseISO } from "date-fns";

import type { Pet } from "@/features/pets/types/pet";

const SPECIES_ORDER: Record<string, number> = {
  dog: 0,
  cat: 1,
};

const SEX_ORDER: Record<string, number> = {
  male: 0,
  female: 1,
};

const STATUS_ORDER: Record<string, number> = {
  in_shelter: 0,
  in_foster: 1,
  adopted: 2,
};

const MISSING_LAST = 1;
const PRESENT_FIRST = -1;

function compareWithMissing(
  a: string | null | undefined,
  b: string | null | undefined,
  compare: (left: string, right: string) => number,
): number {
  const aMissing = !a;
  const bMissing = !b;

  if (aMissing && bMissing) return 0;
  if (aMissing) return MISSING_LAST;
  if (bMissing) return PRESENT_FIRST;

  return compare(a, b);
}

function compareOrderedValues(
  a: string | null | undefined,
  b: string | null | undefined,
  order: Record<string, number>,
): number {
  return compareWithMissing(a, b, (left, right) => {
    const orderA = order[left] ?? Number.MAX_SAFE_INTEGER;
    const orderB = order[right] ?? Number.MAX_SAFE_INTEGER;

    if (orderA !== orderB) return orderA - orderB;
    return left.localeCompare(right, undefined, { sensitivity: "base" });
  });
}

function parseBirthDateTimestamp(birthDate?: string | null): number | null {
  if (!birthDate) return null;

  const parsed = parseISO(birthDate);
  return isValid(parsed) ? parsed.getTime() : null;
}

export function comparePetName(a: Pet, b: Pet): number {
  return compareWithMissing(a.name, b.name, (left, right) =>
    left.localeCompare(right, undefined, { sensitivity: "base" }),
  );
}

export function comparePetSpecies(a: Pet, b: Pet): number {
  return compareOrderedValues(a.specie, b.specie, SPECIES_ORDER);
}

export function comparePetSex(a: Pet, b: Pet): number {
  return compareOrderedValues(a.sex, b.sex, SEX_ORDER);
}

/** Ascending sort shows youngest pets first; missing dates stay last. */
export function comparePetAge(a: Pet, b: Pet): number {
  const timeA = parseBirthDateTimestamp(a.birthDate);
  const timeB = parseBirthDateTimestamp(b.birthDate);

  if (timeA === null && timeB === null) return 0;
  if (timeA === null) return MISSING_LAST;
  if (timeB === null) return PRESENT_FIRST;

  return timeB - timeA;
}

export function comparePetStatus(a: Pet, b: Pet): number {
  return compareOrderedValues(a.status, b.status, STATUS_ORDER);
}
