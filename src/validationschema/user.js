import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

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
  location: z.string().min(2, {
    message: "Please enter a valid location",
  }),
});

// product information validator
export const productSchema = z.object({
  productImage: z.array(z.string()).min(1, {
    message: "Please provide at least one product image.",
  }),
  categoryId: z.string().min(2, {
    message: "Please sellect one category.",
  }),
  productType: z.string().min(2, {
    message: "Please sellect one product type.",
  }),
  brand: z.string().min(2, {
    message: "Please enter brand name.",
  }),
  productName: z.string().min(2, {
    message: "Please enter product name.",
  }),

  size: z.array(z.string()).min(1, {
    message: "Please enter at least one size.",
  }),
  price: z.string().min(1, {
    message: "Please enter a price.",
  }),
  color: z.array(z.string()).min(1, {
    message: "Please enter at least one color.",
  }),

  model: z.string().min(2, {
    message: "Please enter a model.",
  }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters long." })
    .max(200)
    .trim(),
});

// category validator
export const categorySchema = z.object({
  categoryName: z.string().min(2, {
    message: "please enter category Name",
  }),
  productType: z.string().min(2, {
    message: "please enter product Names",
  }),
});
// category validator
export const roleSchema = z.object({
  name: z.string().min(2, {
    message: "please enter role Name",
  }),
});

// registration validator
export const passwordChange = z
  .object({
    current_password: z.string().min(2, {
      message: "current password required",
    }),
    new_password: z.string().min(2, {
      message: "new password required",
    }),
    confirm_password: z.string().min(2, {
      message: "password required",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Password don't match",
    path: ["confirm_password"],
  });

export const wathdrawalform = z.object({
  name: z.string().min(2, {
    message: "account holder name required",
  }),
  bankinfo: z.string().min(2, {
    message: "bank infromation required",
  }),
  accountNumber: z.string().min(2, {
    message: "account number required",
  }),
  amount: z.string().min(2, {
    message: "amount required in ETB",
  }),
  remark: z.string().min(2, {
    message: "Remark required",
  }),
});
