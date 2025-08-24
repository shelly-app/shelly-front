export const REQUEST_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const REQUEST_STATUS_LABELS = {
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado",
} as const;

export const QUESTIONNAIRE_LABELS = {
  location: "Ubicación",
  familyComposition: "Composición familiar",
  hasYard: "¿Tiene patio o jardín?",
} as const;

type Values<T> = T[keyof T];
export type RequestStatus = Values<typeof REQUEST_STATUS>;
export type RequestStatusLabel = Values<typeof REQUEST_STATUS_LABELS>;
