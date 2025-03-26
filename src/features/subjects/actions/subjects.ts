"use server";

import { z } from "zod";
import { subjectSchema } from "../schemas/subjects";
import { redirect } from "next/navigation";
import {
  canCreateSubject,
  canDeleteSubject,
  canUpdateSubject,
} from "../permissions/subjects";
import {
  insertSubject,
  deleteSubject as deleteSubjectDB,
  updateSubject as updateSubjectDB,
} from "../database/subjects";
import { getCurrentUser } from "@/services/clerk";

export async function createSubject(unsafeData: z.infer<typeof subjectSchema>) {
  const { success, data } = subjectSchema.safeParse(unsafeData);

  if (!success || !canCreateSubject) {
    return { error: true, message: "Error, Subject not created" };
  }

  const subject = await insertSubject(data);

  redirect(`/admin/subjects/${subject.id}/edit`);
}

export async function updateSubject(
  id: string,
  unsafeData: z.infer<typeof subjectSchema>
) {
  const { success, data } = subjectSchema.safeParse(unsafeData);

  if (!success || !canUpdateSubject) {
    return { error: true, message: "Error, Subject not updated" };
  }

  await updateSubjectDB(id, data);

  return { error: false, message: "Subject updated successfully" };
}

// function wait(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

export async function deleteSubject(id: string) {
  if (!canDeleteSubject(await getCurrentUser())) {
    return { error: true, message: "Error, Subject not deleted" };
  }

  await deleteSubjectDB(id);
  return { error: false, message: "Subject deleted successfully" };
}
