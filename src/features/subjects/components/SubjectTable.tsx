import { ActionButton } from "@/components/ActionButton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrural } from "@/lib/formatters";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { deleteSubject } from "../actions/subjects";

export function SubjectTable({
  subjects,
}: {
  subjects: {
    id: string;
    name: string;
    chapterCount: number;
    lessonCount: number;
    studentCount: number;
  }[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            {formatPrural(subjects.length, "Subject", "Subjects")}
          </TableHead>
          <TableHead>Students</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">{subject.name}</div>{" "}
                <div className="text-muted-foreground">
                  {formatPrural(subject.chapterCount, "Chapter", "Chapters")} •{" "}
                  {formatPrural(subject.lessonCount, "Lesson", "Lessons")}
                </div>
              </div>
            </TableCell>
            <TableCell>{subject.studentCount}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/admin/subjects/${subject.id}/edit`}>Edit</Link>
                </Button>
                <ActionButton
                  variant={"destructiveOutline"}
                  requiresConfirmation
                  action={deleteSubject.bind(null, subject.id)}
                >
                  <Trash2Icon />
                  <span className="sr-only">Delete</span>
                </ActionButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
