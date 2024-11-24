import { z } from 'zod';

// Zod Schema for Order Validation// Define the Zod schema for order validation
export const OrderValidationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  product: z.string().regex(/^[a-fA-F0-9]{24}$/, { message: 'Invalid Product ID' }), // MongoDB ObjectId validation
  quantity: z
    .number()
    .int()
    .min(1, { message: 'Quantity must be at least 1' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a non-negative number' }),
});

// TypeScript type for validated order data
export type OrderInput = z.infer<typeof OrderValidationSchema>;
