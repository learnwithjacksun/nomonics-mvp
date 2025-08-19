import { z } from "zod";

const createComicSchema = z.object({
    format: z.string().min(1, "Format is required"),
    title: z.string().min(1, "Title is required"),
    synopsis: z.string().min(1, "Synopsis is required"),
    type: z.string().min(1, "Type is required"),
});

type CreateComicSchema = z.infer<typeof createComicSchema>;

export { createComicSchema, type CreateComicSchema };