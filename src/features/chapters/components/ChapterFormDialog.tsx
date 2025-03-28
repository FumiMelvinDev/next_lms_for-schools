"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { _chapterStatus } from "@/drizzle/schema";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ChapterForm } from "./ChapterForm";
import { useState } from "react";

export function ChapterFormDialog({
  subjectId,
  chapter,
  children,
}: {
  subjectId: string;
  children: React.ReactNode;
  chapter?: { id: string; name: string; status: _chapterStatus };
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {chapter == null ? "New Chapter" : `Edit Chapter ${chapter.name}`}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ChapterForm
            chapter={chapter}
            subjectId={subjectId}
            onSuccess={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
