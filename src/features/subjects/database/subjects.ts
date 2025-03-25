import { db } from "@/drizzle/db";
import { SubjectTable } from "@/drizzle/schema";
import { revalidateSubjectCache } from "./cache/subjects";
import { eq } from "drizzle-orm";

export async function insertSubject(data: typeof SubjectTable.$inferInsert) {
  const [newSubject] = await db.insert(SubjectTable).values(data).returning();

  if (newSubject == null) throw new Error("Failed to create subject");
  revalidateSubjectCache(newSubject.id);

  return newSubject;
}

export async function deleteSubject(id: string) {
  const [deleteSubject] = await db
    .delete(SubjectTable)
    .where(eq(SubjectTable.id, id))
    .returning();

  if (deleteSubject == null) throw new Error("Failed to delete subject");
  revalidateSubjectCache(deleteSubject.id);

  return deleteSubject;
}
