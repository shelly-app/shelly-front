export const MEMBER_ROLES = ["admin", "volunteer"] as const;

export type MemberRole = (typeof MEMBER_ROLES)[number];
