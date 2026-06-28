import { differenceInMonths, differenceInYears, parseISO } from "date-fns";

export const calculateAge = (
  birthDate: string | null,
  t: (key: string, opts?: Record<string, unknown>) => string,
): string | null => {
  if (!birthDate) return null;

  const date = parseISO(birthDate);
  const years = differenceInYears(new Date(), date);

  if (years >= 1) {
    return t("app.pets.details.age_years", { count: years });
  }

  const months = differenceInMonths(new Date(), date);
  return t("app.pets.details.age_months", { count: Math.max(months, 1) });
};
