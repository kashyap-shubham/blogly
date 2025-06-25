const { z } = require("zod");


export const createBlogSchema = z.object({
  body: z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    content: z.string().min(20, "Content must be at least 20 characters"),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
  }),
});


export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    content: z.string().min(20).optional(),
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
  }),
  params: z.object({
    blogId: z.string().length(24, "Invalid blog ID"),
  }),
});


export const commentSchema = z.object({
  comment: z.string().min(1, "Comment cannot be empty"),
});
