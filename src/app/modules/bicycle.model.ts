import mongoose from "mongoose";
import { BicylceInterface } from "./bicycle.interface";

const { Schema } = mongoose;

const bicycleSchema = new Schema<BicylceInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price must be a positive number'],
    },
    type: {
      type: String,
      enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);



export const BicycleSchema = mongoose.model('Bicycle', bicycleSchema);




 
