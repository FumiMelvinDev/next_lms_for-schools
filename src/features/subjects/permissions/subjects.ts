import { UserRole } from "@/drizzle/schema";

export function canCreateSubject({ role }: { role: UserRole | undefined }) {
  return role === "admin" || role === "teacher";
}

export function canDeleteSubject({ role }: { role: UserRole | undefined }) {
  return role === "admin";
}
