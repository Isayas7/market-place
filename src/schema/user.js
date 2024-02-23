import { z } from "zod";

// registration validator
export const registerSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "please enter name",
    }),
    middleName: z.string().min(2, {
      message: "please enter  name",
    }),
    email: z.string().min(2, {
      message: "please enter email",
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

// login validator
export const loginSchema = z.object({
  email: z.string().min(2, {
    message: "please enter email",
  }),
  password: z.string().min(2, {
    message: "password required",
  }),
});

// delivery personnel information validator
export const deliveryPersonnelSchema = z.object({
  firstName: z.string().min(2, {
    message: "Please enter a valid first name.",
  }),
  middleName: z.string().min(2, {
    message: "Please enter a valid middle name.",
  }),
  lastName: z.string().min(2, {
    message: "Please enter a valid last name.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  address: z.string().min(2, {
    message: "Please enter a valid address.",
  }),
  phoneNumber: z.string().min(2, {
    message: "Please enter a valid phone number.",
  }),

  bankInfo: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),
  accountNumber: z.string().min(2, {
    message: "Please enter a valid account number.",
  }),
});

// delivery personnel information validator
export const storefrontSchema = z.object({
  lastName: z.string().min(2, {
    message: "Please enter a valid last name.",
  }),

  address: z.string().min(2, {
    message: "Please enter a valid address.",
  }),
  phoneNumber: z.string().min(2, {
    message: "Please enter a valid phone number.",
  }),

  bankInfo: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),
  accountNumber: z.string().min(2, {
    message: "Please enter a valid account number.",
  }),
});

// category validator
export const categorySchema = z.object({
  categoryName: z.string().min(2, {
    message: "please enter category Name",
  }),
  productNames: z.string().min(2, {
    message: "please enter category Name",
  }),
});
