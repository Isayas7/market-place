import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().min(2, {
      message: "plase enter falid email",
    }),
    email: z.string().min(2, {
      message: "plase enter falid email",
    }),
    password: z.string().min(2, {
      message: "password required",
    }),
    confirm_password: z.string().min(2, {
      message: "password required",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password don't match",
    path: ["confirm_password"],
  });
