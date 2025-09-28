export const REQUEST_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const REQUEST_STATUS_LABELS = {
  pending: "app.requests.status.pending",
  approved: "app.requests.status.approved",
  rejected: "app.requests.status.rejected",
} as const;

export const QUESTIONNAIRE_LABELS = {
  location: "app.requests.questionnaire.location",
  familyComposition: "app.requests.questionnaire.familyComposition",
  hasYard: "app.requests.questionnaire.hasYard",
} as const;

type Values<T> = T[keyof T];
export type RequestStatus = Values<typeof REQUEST_STATUS>;
export type RequestStatusLabel = Values<typeof REQUEST_STATUS_LABELS>;
