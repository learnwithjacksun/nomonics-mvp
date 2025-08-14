import { z } from "zod";

const newChapterSchema = z.object({
  title: z.string().min(1, { message: "Chapter title is required" }),
  chapterNumber: z.number().min(1, { message: "Chapter number is required" }),
  format: z.string().min(1, { message: "File format is required" }),
});

type NewChapterSchema = z.infer<typeof newChapterSchema>;
export { newChapterSchema, type NewChapterSchema };
