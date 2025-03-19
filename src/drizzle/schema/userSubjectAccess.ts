import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";
import { SubjectTable } from "./subject";

export const UserSubjectAccessTable = pgTable(
  "user_subject_access",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    subjectId: uuid()
      .notNull()
      .references(() => SubjectTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (t) => [primaryKey({ columns: [t.userId, t.subjectId] })]
);

export const UserSubjectAccessRelationships = relations(
  UserSubjectAccessTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserSubjectAccessTable.userId],
      references: [UserTable.id],
    }),
    subject: one(SubjectTable, {
      fields: [UserSubjectAccessTable.subjectId],
      references: [SubjectTable.id],
    }),
  })
);
