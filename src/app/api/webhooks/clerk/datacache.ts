type CACHE_TAG =
  | "grades"
  | "users"
  | "subjects"
  | "userSubjectAccess"
  | "chapters"
  | "lessons";

export function getGlobalTag(tag: CACHE_TAG) {
  return `global_${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string) {
  return `id_${id}-${tag}` as const;
}

export function getUserTag(tag: CACHE_TAG, userId: string) {
  return `userId_${userId}-${tag}` as const;
}

export function getSubjectTag(tag: CACHE_TAG, subjectId: string) {
  return `subjectId_${subjectId}-${tag}` as const;
}
