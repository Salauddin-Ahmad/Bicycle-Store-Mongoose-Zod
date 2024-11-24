import { z } from 'zod';
import { TypeInterface } from './bicycle.interface';

export const BicycleValidation = z.object({
  // _id: z.string().min(5, {message: 'id is required'}), // Optional for new objects
  name: z.string().min(1, { message: 'Name is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  price: z.number().min(0, { message: 'Price must be a positive number' }),
  type: z.enum(
    Object.values(TypeInterface) as [TypeInterface, ...TypeInterface[]],
    { message: 'Invalid bicycle type' },
  ),
  description: z.string().min(1, { message: 'Description is required' }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  inStock: z.boolean({ required_error: 'Stock status is required' }),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Type for the validated data
export type BicycleValidation = z.infer<typeof BicycleValidation>;
