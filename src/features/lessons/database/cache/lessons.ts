import {
  getGlobalTag,
  getIdTag,
  getSubjectTag,
} from "@/app/api/webhooks/clerk/datacache";
import { revalidateTag } from "next/cache";

export function getLessonGlobalTag() {
  return getGlobalTag("lessons");
}

export function getLessonIdTag(id: string) {
  return getIdTag("lessons", id);
}

export function getLessonSubjectTag(subjectId: string) {
  return getSubjectTag("lessons", subjectId);
}

export function revalidateLessonCache({
  id,
  subjectId,
}: {
  id: string;
  subjectId: string;
}) {
  revalidateTag(getLessonGlobalTag());
  revalidateTag(getLessonIdTag(id));
  revalidateTag(getLessonSubjectTag(subjectId));
}
