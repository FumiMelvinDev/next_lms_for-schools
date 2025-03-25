import { getGlobalTag, getIdTag } from "@/app/api/webhooks/clerk/datacache";
import { revalidateTag } from "next/cache";

export function getSubjectGlobalTag() {
  return getGlobalTag("subjects");
}

export function getSubjectIdTag(id: string) {
  return getIdTag("subjects", id);
}

export function revalidateSubjectCache(id: string) {
  revalidateTag(getSubjectGlobalTag());
  revalidateTag(getSubjectIdTag(id));
}
