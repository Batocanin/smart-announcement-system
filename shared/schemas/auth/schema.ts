import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string(),
});

export type loginSchemaValue = z.infer<typeof loginSchema>;

export const createAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  content: z.string().min(1, "Content is required").max(2000, "Content too long"),
});

export type createAnnouncementSchemaValue = z.infer<typeof createAnnouncementSchema>;
