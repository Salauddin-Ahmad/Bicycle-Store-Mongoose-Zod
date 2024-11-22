import { z } from 'zod';

// Zod Schema for Order Validation
export const OrderValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  product: z.string().regex(/^[a-fA-F0-9]{24}$/, {
    message: "Invalid ObjectId format for product",
  }), // Matches MongoDB ObjectId format
  quantity: z.number().min(1, { message: "Quantity cannot be less than 1" }),
  totalPrice: z.number().min(0, { message: "Total price must be a positive number" }),
});

// Type for the validated data
export type OrderValidationType = z.infer<typeof OrderValidationSchema>;
