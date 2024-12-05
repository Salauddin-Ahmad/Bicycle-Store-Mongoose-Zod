// import mongoose from 'mongoose';
// import { Orderinterface } from './bicycle.interface';

// const { Schema } = mongoose;

// const orderSchema = new Schema<Orderinterface>(
//   {
//     email: {
//       type: String,
//       required: true,
//     },
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Bicycle',
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: [1, 'Quantity cannot be less than 1'],
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// export const OrderSchema = mongoose.model('Order', orderSchema);



import mongoose from 'mongoose';
import { Orderinterface } from './bicycle.interface';

const { Schema } = mongoose;

const orderSchema = new Schema<Orderinterface>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bicycle',
      required: [true, 'Product reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity cannot be less than 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price cannot be a negative number'],
    },
  },
  { timestamps: true },
);

export const OrderSchema = mongoose.model('Order', orderSchema);
