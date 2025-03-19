import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SubjectTable } from "./subject";
import { relations } from "drizzle-orm";
import { ChapterTable } from "./chapter";
import { UserLessonCompleteTable } from "./userLessonComplete";

export const lessonStatuses = ["active", "inactive"] as const;
export type lessonStatus = (typeof lessonStatuses)[number];
export const lessonStatusEnum = pgEnum("lesson_status", lessonStatuses);

export const LessonTable = pgTable("lessons", {
  id,
  name: text().notNull(),
  descrption: text().notNull(),
  youtubeVideoUrl: text().notNull(),
  status: lessonStatusEnum().notNull().default("inactive"),
  lessonNumber: integer().notNull(),
  chapterId: uuid()
    .notNull()
    .references(() => ChapterTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
  subject: one(SubjectTable, {
    fields: [LessonTable.id],
    references: [SubjectTable.id],
  }),
  userChapterComplete: many(UserLessonCompleteTable),
}));
