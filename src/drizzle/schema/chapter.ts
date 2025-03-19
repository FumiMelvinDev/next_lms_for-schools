import { integer, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SubjectTable } from "./subject";
import { relations } from "drizzle-orm";
import { LessonTable } from "./lesson";

export const chapterStatuses = ["active", "inactive"] as const;
export type _chapterStatus = (typeof chapterStatuses)[number];
export const _chapterStatusEnum = pgEnum("_chapter_status", chapterStatuses);

export const ChapterTable = pgTable("_chapters", {
  id,
  name: text().notNull(),
  status: _chapterStatusEnum().notNull().default("inactive"),
  chapterNumber: integer().notNull(),
  Id: uuid()
    .notNull()
    .references(() => SubjectTable.id, { onDelete: "cascade" }),
  createdAt,
  updatedAt,
});

export const ChapterRelationships = relations(
  ChapterTable,
  ({ one, many }) => ({
    subject: one(SubjectTable, {
      fields: [ChapterTable.Id],
      references: [SubjectTable.id],
    }),
    lessons: many(LessonTable),
  })
);
