import { UserRole } from "@/drizzle/schema";

export function canAccessTeacherPages({
  role,
}: {
  role: UserRole | undefined;
}) {
  return role === "teacher" || role === "admin";
}
