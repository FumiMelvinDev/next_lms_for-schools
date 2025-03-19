import { pgTable, jsonb, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";
import { GradeTable } from "./grade";

export const RegisterToStudyTable = pgTable("register_To_Study", {
  id,
  gradeDetails: jsonb()
    .notNull()
    .$type<{ name: string; description: string; imageUrl: string }>(),
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "restrict" }),
  gradeId: uuid()
    .notNull()
    .references(() => GradeTable.id, { onDelete: "restrict" }),
  createdAt,
  updatedAt,
});

export const RegisterToStudyRelationships = relations(
  RegisterToStudyTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [RegisterToStudyTable.userId],
      references: [UserTable.id],
    }),
    grade: one(GradeTable, {
      fields: [RegisterToStudyTable.gradeId],
      references: [GradeTable.id],
    }),
  })
);
