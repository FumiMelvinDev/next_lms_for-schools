import { db } from "@/drizzle/db";
import { SubjectTable } from "@/drizzle/schema";
import { revalidateSubjectCache } from "./cache/subjects";

export async function insertSubject(data: typeof SubjectTable.$inferInsert) {
  const [newSubject] = await db.insert(SubjectTable).values(data).returning();

  if (newSubject == null) throw new Error("Failed to create subject");
  revalidateSubjectCache(newSubject.id);

  return newSubject;
}
