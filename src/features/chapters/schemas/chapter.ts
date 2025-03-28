import { chapterStatuses } from "@/drizzle/schema";
import { z } from "zod";

export const chapterSchema = z.object({
  name: z.string().min(3, "Required"),
  status: z.enum(chapterStatuses),
});
