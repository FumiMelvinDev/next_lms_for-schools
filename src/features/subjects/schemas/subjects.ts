import { z } from "zod";

export const subjectSchema = z.object({
  name: z.string().min(3, "Required"),
  description: z.string().min(3, "Required"),
});
