import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { SubjectGradeTable } from "./subjectGrade";

export const gradeStatuses = ["active", "inactive"] as const;
export type GradeStatus = (typeof gradeStatuses)[number];
export const gradeStatusEnum = pgEnum("grade_status", gradeStatuses);

export const GradeTable = pgTable("grades", {
  id,
  name: text().notNull(),
  description: text().notNull(),
  imageUrl: text().notNull(),
  status: gradeStatusEnum().notNull().default("inactive"),
  createdAt,
  updatedAt,
});

export const GradeRelationships = relations(GradeTable, ({ many }) => ({
  subjectGrade: many(SubjectGradeTable),
}));
