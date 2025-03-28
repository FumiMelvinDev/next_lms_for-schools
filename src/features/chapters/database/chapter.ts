import { db } from "@/drizzle/db";
import { ChapterTable } from "@/drizzle/schema";
import { revalidateChapterCache } from "./cache/chapters";
import { eq } from "drizzle-orm";
export async function getNextChapterOrder(Id: string) {
  const chapter = await db.query.ChapterTable.findFirst({
    columns: { chapterNumber: true },
    where: ({ Id: IdCol }, { eq }) => eq(IdCol, Id),
    orderBy: ({ chapterNumber }, { desc }) => desc(chapterNumber),
  });

  return chapter ? chapter.chapterNumber + 1 : 0;
}

export async function insertChapter(data: typeof ChapterTable.$inferInsert) {
  const [newChapter] = await db.insert(ChapterTable).values(data).returning();

  if (newChapter == null) throw new Error("Failed to create chapter");

  revalidateChapterCache({
    subjectId: newChapter.Id,
    id: newChapter.id,
  });

  return newChapter;
}

export async function updateChapter(
  id: string,
  data: Partial<typeof ChapterTable.$inferInsert>
) {
  const [updatedChapter] = await db
    .update(ChapterTable)
    .set(data)
    .where(eq(ChapterTable.id, id))
    .returning();
  if (updatedChapter == null) throw new Error("Failed to update chapter");

  revalidateChapterCache({
    subjectId: updatedChapter.Id,
    id: updatedChapter.id,
  });

  return updatedChapter;
}

export async function deleteChapter(id: string) {
  const [deletedChapter] = await db
    .delete(ChapterTable)
    .where(eq(ChapterTable.id, id))
    .returning();
  if (deletedChapter == null) throw new Error("Failed to delete chapter");

  revalidateChapterCache({
    subjectId: deletedChapter.Id,
    id: deletedChapter.id,
  });

  return deletedChapter;
}
