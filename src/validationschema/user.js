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
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
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
  profileImage: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),
  identificationCard: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),
  nationalId: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),

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
  location: z.array(z.number()).min(2, {
    message: "Please provide delivery personnel location.",
  }),
});

// delivery personnel information validator
export const storefrontSchema = z.object({
  profileImage: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),
  identificationCard: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),
  nationalId: z.string().min(2, {
    message: "Please enter valid bank information.",
  }),
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
  location: z.array(z.number()).min(2, {
    message: "Please provide your location.",
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
  variants: z.string().min(2, {
    message: "Please sellect one product type.",
  }),
  brand: z.string().min(2, {
    message: "Please enter brand name.",
  }),
  title: z.string().min(2, {
    message: "Please enter title name.",
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
  variants: z.string().min(2, {
    message: "please enter product Names",
  }),
});
// category validator
export const roleSchema = z.object({
  role: z.string().min(2, {
    message: "please enter role Name",
  }),
});

// registration validator
export const passwordChange = z
  .object({
    current_password: z.string().min(2, {
      message: "current password required",
    }),
    new_password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirm_password: z.string().min(2, {
      message: "password required",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Password don't match",
    path: ["confirm_password"],
  });

//withdrawal form validation
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
  amount: z.string().min(1, {
    message: "amount required in ETB",
  }),
  remark: z.string().min(2, {
    message: "Remark required",
  }),
});
//withdrawal form validation
export const shippingSchema = z.object({
  fullName: z.string().min(2, {
    message: "account holder name required",
  }),
  phoneNumber: z.string().min(2, {
    message: "bank infromation required",
  }),
  address: z.string().min(2, {
    message: "account number required",
  }),
  secretCode: z.string().min(2, {
    message: "amount required in ETB",
  }),

  location: z.array(z.number()).min(2, {
    message: "Please provide your location.",
  }),
});

export function discountSchema(maxPrice) {
  return z.object({
    amount: z
      .string()
      .min(1, {
        message: "amount required in ETB",
      })
      .refine(
        (value) => {
          const parsedAmount = parseInt(value, 10);
          return !isNaN(parsedAmount) && parsedAmount <= maxPrice;
        },
        {
          message: `amount should not exceed ${maxPrice} ETB`,
        }
      ),
    expireDate: z.string().refine(
      (value) => {
        const expireDate = new Date(value);
        const today = new Date();
        return expireDate >= today;
      },
      {
        message: "Date must be today or later",
      }
    ),
  });
}
