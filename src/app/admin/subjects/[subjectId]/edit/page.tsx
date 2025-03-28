import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/drizzle/db";
import { ChapterTable, LessonTable, SubjectTable } from "@/drizzle/schema";
import { ChapterFormDialog } from "@/features/chapters/components/ChapterFormDialog";
import { getChapterSubjectTag } from "@/features/chapters/database/cache/chapters";
import { getLessonSubjectTag } from "@/features/lessons/database/cache/lessons";
import { SubjectForm } from "@/features/subjects/components/SubjectsForm";
import { getSubjectIdTag } from "@/features/subjects/database/cache/subjects";
import { asc, eq } from "drizzle-orm";
import { PlusIcon } from "lucide-react";
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
        <TabsContent value="lessons">
          <Card>
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle>Chapters</CardTitle>
              <ChapterFormDialog subjectId={subjectId}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <PlusIcon />
                    New Chapter
                  </Button>
                </DialogTrigger>
              </ChapterFormDialog>
            </CardHeader>
          </Card>
        </TabsContent>
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
