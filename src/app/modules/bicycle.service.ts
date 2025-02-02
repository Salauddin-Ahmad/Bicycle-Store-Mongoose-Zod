import mongoose from 'mongoose';
import { BicylceInterface } from './bicycle.interface';
import { BicycleSchema } from './bicycle.model';
import { OrderSchema } from './bicycle.order.model';

const createBicylceIntoDB = async (bicylce: BicylceInterface) => {
  try {
    const result = await BicycleSchema.create(bicylce);
    return result;
  } catch (error) {
    throw new Error(`Error creating student: ${error}`);
  }
};

const getAllBicyclesFromDB = async () => {
  const result = await BicycleSchema.find().select('-__v');
  return result;
};

const getSingleBicycleById = async (id: string) => {
  const result = await BicycleSchema.findOne({ _id: id }).select('-__v');
  return result;
};

const updateBicyclebyId = async (
  productId: string,
  updateData: Partial<typeof BicycleSchema>,
) => {
  // Validate the productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid Product ID');
  }

  const updatedBicycle = await BicycleSchema.findByIdAndUpdate(
    productId, // Filter by the _id
    { $set: updateData }, // Update the specified fields
    { new: true }, // Return the updated document
  ).select('-__v');

  return updatedBicycle;
};

const deleteBicycleById = async (productId: string) => {
  // Validate the productId (ensure it matches MongoDB's ObjectId format)
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid Product ID');
  }
  const deletedBicycle = await BicycleSchema.findByIdAndDelete(productId);

  return deletedBicycle; // Return the deleted bicycle or null if not found
};

//  Creates a new order and also upates the stock of product quantities
// const createNewOrder = async ({
//   email,
//   product,
//   quantity,
//   totalPrice,
// }: {
//   email: string;
//   product: string;
//   quantity: number;
//   totalPrice: number;
// }) => {
//   // Find the product in the database
//   const productDocument = await BicycleSchema.findById( product );
// console.log(productDocument)


//   if (!productDocument) {
//     throw new Error('Product not found');
//   }

//   // Check if there is enough stock
//   if (productDocument.quantity < quantity) {
//     throw new Error('Insufficient stock available');
//   }

//   // Reduce the product quantity
//   productDocument.quantity -= quantity;

//   // Set inStock to false if quantity reaches 0
//   if (productDocument.quantity === 0) {
//     productDocument.inStock = false;
//   }

//   // Save the updated product document
//   await productDocument.save();

//   // Create the order
//   const newOrder = await OrderSchema.create({
//     email,
//     product,
//     quantity,
//     totalPrice,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   });

//   return newOrder;
// };


const createNewOrder = async ({ email, product, quantity, totalPrice }: { email: string; product: string; quantity: number; totalPrice: number; }) => {
  try {
    console.log('Incoming product ID:', product);
    
    // Check validity
    if (!mongoose.Types.ObjectId.isValid(product)) {
      throw new Error(`Invalid product ID: ${product}`);
    }
    
    // Convert product to ObjectId
    const productId = new mongoose.Types.ObjectId(product);
    console.log('Converted productId:', productId);

    // Find the product in the database
    const productDocument = await BicycleSchema.findById(productId);
    console.log('Product Retrieved from DB:', productDocument);

    if (!productDocument) {
      throw new Error(`Product not found: ${product}`);
    }

    // Check if there is enough stock
    if (productDocument.quantity < quantity) {
      throw new Error('Insufficient stock available');
    }

    // Reduce the product quantity
    productDocument.quantity -= quantity;
    if (productDocument.quantity === 0) {
      productDocument.inStock = false;
    }

    // Save the updated product document
    await productDocument.save();

    // Create the order
    const newOrder = await OrderSchema.create({
      email,
      product: productId,
      quantity,
      totalPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return newOrder;
  } catch (error) {
    console.error('Error in createNewOrder:', error);
    throw new Error('Failed to create order');
  }
};


export default createNewOrder;

const calculateRevenue = async () => {
  const orders = await OrderSchema.aggregate([
    {
      $group: { _id: null, totalrevenue: { $sum: '$totalPrice' } },
    },
  ]);

  return orders;
};

export const BicycleServices = {
  createBicylceIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleById,
  updateBicyclebyId,
  deleteBicycleById,
  createNewOrder,
  calculateRevenue,
};
