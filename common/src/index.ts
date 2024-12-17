// we make a common folder with which the backend and frontend can both communicate

import z from "zod";

// signup input
export const signupInput = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

// signin input
export const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// create blog input
export const createBlogInput = z.object({
  title: z.string(),
  description: z.string(),
});

// update blog input
export const updateBlogInput = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

// type inference in zod
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
