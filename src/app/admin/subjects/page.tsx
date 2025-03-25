import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { db } from "@/drizzle/db";
import { SubjectTable } from "@/features/subjects/components/SubjectTable";
import { getSubjectGlobalTag } from "@/features/subjects/database/cache/subjects";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";
import {
  ChapterTable,
  SubjectTable as DbSubjectTable,
  LessonTable,
  UserSubjectAccessTable,
} from "@/drizzle/schema";
import { asc, countDistinct, eq } from "drizzle-orm";

export default async function SubjectsPage() {
  const subjects = await getSubjects();
  return (
    <section className="container my-4">
      <PageHeader title="Subjects">
        <Button asChild>
          <Link href="/admin/subjects/new">New Subject</Link>
        </Button>
      </PageHeader>

      <SubjectTable subjects={subjects} />
    </section>
  );
}

async function getSubjects() {
  "use cache";

  cacheTag(getSubjectGlobalTag());

  return db
    .select({
      id: DbSubjectTable.id,
      name: DbSubjectTable.name,
      chapterCount: countDistinct(ChapterTable),
      lessonCount: countDistinct(LessonTable),
      studentCount: countDistinct(UserSubjectAccessTable),
    })
    .from(DbSubjectTable)
    .leftJoin(ChapterTable, eq(ChapterTable.Id, DbSubjectTable.id))
    .leftJoin(LessonTable, eq(LessonTable.chapterId, ChapterTable.id))
    .leftJoin(
      UserSubjectAccessTable,
      eq(UserSubjectAccessTable.subjectId, DbSubjectTable.id)
    )
    .orderBy(asc(DbSubjectTable.name))
    .groupBy(DbSubjectTable.id);
}
