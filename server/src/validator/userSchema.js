const { z } = require("zod");


export const signupSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});


export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});


export const updateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  }),
});
