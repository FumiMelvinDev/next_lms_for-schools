import { PageHeader } from "@/components/PageHeader";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/drizzle/db";
import { ChapterTable, LessonTable, SubjectTable } from "@/drizzle/schema";
import { getChapterSubjectTag } from "@/features/chapters/database/cache/chapters";
import { getLessonSubjectTag } from "@/features/lessons/database/cache/lessons";
import { SubjectForm } from "@/features/subjects/components/SubjectsForm";
import { getSubjectIdTag } from "@/features/subjects/database/cache/subjects";
import { asc, eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { notFound } from "next/navigation";

export default async function EditSubjectPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  const subject = await getSubject(subjectId);

  if (subject == null) return notFound();

  return (
    <div className="container my-4">
      <PageHeader title={subject.name} />
      <Tabs defaultValue="lessons">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="lessons">Lessons</TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <SubjectForm subject={subject} />
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function getSubject(id: string) {
  "use cache";

  cacheTag(
    getSubjectIdTag(id),
    getChapterSubjectTag(id),
    getLessonSubjectTag(id)
  );

  return db.query.SubjectTable.findFirst({
    columns: { id: true, name: true, description: true },
    where: eq(SubjectTable.id, id),
    with: {
      chapters: {
        orderBy: asc(ChapterTable.chapterNumber),
        columns: { id: true, name: true, status: true },
        with: {
          lessons: {
            orderBy: asc(LessonTable.lessonNumber),
            columns: {
              id: true,
              name: true,
              status: true,
              descrption: true,
              youtubeVideoUrl: true,
              chapterId: true,
            },
          },
        },
      },
    },
  });
}
