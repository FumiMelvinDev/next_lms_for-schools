import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { _chapterStatus } from "@/drizzle/schema";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChapterForm } from "./ChapterForm";

export function ChapterFormDialog({
  subjectId,
  chapter,
  children,
}: {
  subjectId: string;
  children: React.ReactNode;
  chapter?: { id: string; name: string; status: _chapterStatus };
}) {
  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {chapter == null ? "New Chapter" : `Edit Chapter ${chapter.name}`}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ChapterForm chapter={chapter} subjectId={subjectId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
