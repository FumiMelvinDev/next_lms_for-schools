import { UserRole } from "@/drizzle/schema";

export function canCreateChapter({ role }: { role: UserRole | undefined }) {
  return role === "admin" || role === "teacher";
}

export function canUpdateChapter({ role }: { role: UserRole | undefined }) {
  return role === "admin" || role === "teacher";
}

export function canDeleteChapter({ role }: { role: UserRole | undefined }) {
  return role === "admin";
}
