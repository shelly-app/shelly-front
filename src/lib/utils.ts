import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getNameInitials = (name?: string) => {
  if (!name || name.trim().length === 0) return "";

  const names = name
    .trim()
    .split(" ")
    .filter((segment) => segment.length > 0);

  if (names.length === 1) return names[0].charAt(0).toUpperCase();

  return (
    names[0].charAt(0).toUpperCase() +
    names[names.length - 1].charAt(0).toUpperCase()
  );
};

export const getFullName = (firstName?: string, lastName?: string) => {
  const fullName = [firstName, lastName]
    .filter((name) => name && name.trim().length > 0)
    .join(" ")
    .trim();

  return fullName;
};

export const formatDate = (date: number | null) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
