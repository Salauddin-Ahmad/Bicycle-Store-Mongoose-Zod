import mongoose from 'mongoose';


export enum TypeInterface {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
}


export type BicylceInterface = {
  // _id: string;
  name: string;
  brand: string;
  price: number;
  type: TypeInterface;
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt?: string;
  updatedAt?: string;
}


export type Orderinterface = {
  _id: mongoose.Types.ObjectId; // Correct type for ObjectId
  email: string;
  product: mongoose.Types.ObjectId; // Product should be an ObjectId, not a string
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
