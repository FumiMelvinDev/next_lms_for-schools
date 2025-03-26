import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SubjectGradeTable } from "./subjectGrade";
import { UserSubjectAccessTable } from "./userSubjectAccess";
import { ChapterTable } from "./chapter";

export const SubjectTable = pgTable("subjects", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  createdAt,
  updatedAt,
});

export const SubjectRelationships = relations(SubjectTable, ({ many }) => ({
  subjectGrade: many(SubjectGradeTable),
  userSubjectAcess: many(UserSubjectAccessTable),
  chapters: many(ChapterTable),
}));
