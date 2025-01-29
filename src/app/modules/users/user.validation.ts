import { z } from "zod";

// Define the FullName schema
export const fullNameSchemaValidation
 = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .trim()
    .min(1, { message: "First name cannot be empty" })
    .refine(
      (val) => val.charAt(0) === val.charAt(0).toUpperCase(),
      {
        message: "First name is not in uppercase format",
      }
    ),
  lastName: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .trim()
    .min(1, { message: "Last name cannot be empty" }),
});

// Define the Address schema
export const addressSchemaValidation
 = z.object({
  street: z.string({
    required_error: "Street is required",
    invalid_type_error: "Street must be a string",
  }),
  city: z.string({
    required_error: "City is required",
    invalid_type_error: "City must be a string",
  }),
  country: z.string({
    required_error: "Country is required",
    invalid_type_error: "Country must be a string",
  }),
});

// Define the Orders schema
export const ordersSchemaValidation
 = z.object({
  productName: z
    .string({
      invalid_type_error: "Product name must be a string",
    })
    .optional(),
  price: z
    .number({
      invalid_type_error: "Price must be a number",
    })
    .optional(),
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number",
    })
    .optional(),
});

// Define the main User schema
export const userSchemaValidation
 = z.object({
  userId: z.number({
    required_error: "User ID is required",
    invalid_type_error: "User ID must be a number",
  }),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, { message: "Username cannot be empty" }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(1, { message: "Password cannot be empty" }),
  fullName: fullNameSchemaValidation
,
  age: z
    .number({
      invalid_type_error: "Age must be a number",
    })
    .optional(),
  email: z
    .string({
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Invalid email format" })
    .optional(),
  isActive: z.boolean({
    required_error: "isActive is required",
    invalid_type_error: "isActive must be a boolean",
  }),
  hobbies: z
    .array(z.string(), {
      invalid_type_error: "Hobbies must be an array of strings",
    })
    .min(1, { message: "You at least need one hobby" }),
  address: addressSchemaValidation
,
  orders: ordersSchemaValidation
,
  isDeleted: z.boolean().optional().default(false),
});
