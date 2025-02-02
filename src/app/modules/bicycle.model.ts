import mongoose from 'mongoose';
import { BicylceInterface } from './bicycle.interface';

const { Schema } = mongoose;

const bicycleSchema = new Schema<BicylceInterface>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required. Received: {VALUE}'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required. Received: {VALUE}'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required. Received: {VALUE}'],
      min: [0, 'Price must be a positive number. Received: {VALUE}'],
    },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: [true, 'Type is required. Received: {VALUE}'],
      message:
        'Type must be one of Mountain, Road, Hybrid, BMX, or Electric. Received: {VALUE}',
    },
    description: {
      type: String,
      required: [true, 'Description is required. Received: {VALUE}'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required. Received: {VALUE}'],
      min: [1, 'Quantity must be at least 1. Received: {VALUE}'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const BicycleSchema = mongoose.model('Bicycle', bicycleSchema, 'bicycles');
