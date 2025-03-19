import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { SubjectTable } from "./subject";
import { GradeTable } from "./grade";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";

export const SubjectGradeTable = pgTable(
  "subject_grades",
  {
    subjectId: uuid()
      .notNull()
      .references(() => SubjectTable.id, { onDelete: "restrict" }),
    gradeId: uuid()
      .notNull()
      .references(() => GradeTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.subjectId, t.gradeId] })]
);

export const SubjectGradeRelationships = relations(
  SubjectGradeTable,
  ({ one }) => ({
    subject: one(SubjectTable, {
      fields: [SubjectGradeTable.subjectId],
      references: [SubjectTable.id],
    }),
    grade: one(GradeTable, {
      fields: [SubjectGradeTable.gradeId],
      references: [GradeTable.id],
    }),
  })
);
