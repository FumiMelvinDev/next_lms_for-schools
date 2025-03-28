"use server";

import { z } from "zod";
import { chapterSchema } from "../schemas/chapter";
import {
  canCreateChapter,
  canDeleteChapter,
  canUpdateChapter,
} from "../permissions/chapters";
import {
  getNextChapterOrder,
  insertChapter,
  updateChapter as updateChapterDb,
  deleteChapter as deleteChapterDb,
} from "../database/chapter";
import { getCurrentUser } from "@/services/clerk";

export async function createChapter(
  Id: string,
  unsafeData: z.infer<typeof chapterSchema>
) {
  const { success, data } = chapterSchema.safeParse(unsafeData);

  if (!success || !canCreateChapter) {
    return { error: true, message: "Error, Chapter not created" };
  }
  const order = await getNextChapterOrder(Id);
  await insertChapter({ ...data, Id, chapterNumber: order });

  return { error: false, message: "Chapter created successfully" };
}

export async function updateChapter(
  id: string,
  unsafeData: z.infer<typeof chapterSchema>
) {
  const { success, data } = chapterSchema.safeParse(unsafeData);

  if (!success || !canUpdateChapter(await getCurrentUser())) {
    return { error: true, message: "There was an error updating your chapter" };
  }

  await updateChapterDb(id, data);

  return { error: false, message: "Successfully updated your chapter" };
}

export async function deleteChapter(id: string) {
  if (!canDeleteChapter(await getCurrentUser())) {
    return { error: true, message: "Error deleting your chapter" };
  }

  await deleteChapterDb(id);

  return { error: false, message: "Successfully deleted your chapter" };
}
