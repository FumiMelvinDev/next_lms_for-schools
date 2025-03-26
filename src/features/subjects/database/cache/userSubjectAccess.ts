import {
  getGlobalTag,
  getIdTag,
  getUserTag,
} from "@/app/api/webhooks/clerk/datacache";
import { revalidateTag } from "next/cache";

export function getUserSubjectAccessGlobalTag() {
  return getGlobalTag("userSubjectAccess");
}

export function getUserSubjectAccessIdTag({
  subjectId,
  userId,
}: {
  subjectId: string;
  userId: string;
}) {
  return getIdTag("userSubjectAccess", `subject:${subjectId}-user:${userId}`);
}

export function getUserSubjectAccessUserTag(userId: string) {
  return getUserTag("userSubjectAccess", userId);
}

export function revalidateUserSubjectAccessCache({
  subjectId,
  userId,
}: {
  subjectId: string;
  userId: string;
}) {
  revalidateTag(getUserSubjectAccessGlobalTag());
  revalidateTag(getUserSubjectAccessIdTag({ subjectId, userId }));
  revalidateTag(getUserSubjectAccessUserTag(userId));
}
