import mongoose from 'mongoose';
import { Orderinterface } from './bicycle.interface';

const { Schema } = mongoose;

const orderSchema = new Schema<Orderinterface>(
  {
    email: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bicycle',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1'],
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);


export const OrderSchema = mongoose.model('Order', orderSchema);

 
