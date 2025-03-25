"use server";

import { z } from "zod";
import { subjectSchema } from "../schemas/subjects";
import { redirect } from "next/navigation";
import { canCreateSubject } from "../permissions/subjects";
import { insertSubject } from "../database/subjects";

export async function createSubject(unsafeData: z.infer<typeof subjectSchema>) {
  const { success, data } = subjectSchema.safeParse(unsafeData);

  if (!success || !canCreateSubject) {
    return { error: true, message: "Error, Subject not created" };
  }

  const subject = await insertSubject(data);

  redirect(`/admin/subjects/${subject.id}/edit`);
}
