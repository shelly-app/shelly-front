import type { MemberRole } from "@/features/members/constants";

export type Member = {
  userId: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role: MemberRole;
  pending: boolean;
  joinedAt: string;
};
