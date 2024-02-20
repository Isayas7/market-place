import { z } from "zod";

const MAX_FILE_SIZE = 50 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// registration validator
export const registerSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "plase enter name",
    }),
    middleName: z.string().min(2, {
      message: "plase enter  name",
    }),
    email: z.string().min(2, {
      message: "plase enter email",
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
    message: "plase enter email",
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
  // identificationCard: z
  //   .any()
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
  // nationalId: z
  //   .any()
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
  bankInfo: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),
  accountNumber: z.string().min(2, {
    message: "Please enter a valid account number.",
  }),
});
