import {
  getGlobalTag,
  getIdTag,
  getSubjectTag,
} from "@/app/api/webhooks/clerk/datacache";
import { revalidateTag } from "next/cache";

export function getChapterGlobalTag() {
  return getGlobalTag("chapters");
}

export function getChapterIdTag(id: string) {
  return getIdTag("chapters", id);
}

export function getChapterSubjectTag(subjectId: string) {
  return getSubjectTag("chapters", subjectId);
}

export function revalidateChapterCache({
  id,
  subjectId,
}: {
  id: string;
  subjectId: string;
}) {
  revalidateTag(getChapterGlobalTag());
  revalidateTag(getChapterIdTag(id));
  revalidateTag(getChapterSubjectTag(subjectId));
}
