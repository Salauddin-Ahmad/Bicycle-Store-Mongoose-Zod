import mongoose from 'mongoose';
import { BicylceInterface } from './bicycle.interface';
import { BicycleSchema } from './bicycle.model';
import { OrderSchema } from './bicycle.order.model';
import { BicycleValidation } from './bicycle.validation';

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
  updateData: Partial<BicylceInterface>,
) => {
  // Validate the productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid Product ID');
  }

  // Validate update data
  const parsedData = BicycleValidation.partial().strict().safeParse(updateData);
  if (!parsedData.success) {
    console.error('Validation Errors:', parsedData.error.errors); // Debugging
    throw new Error(
      parsedData.error.errors
        .map((err) => `${err.path}: ${err.message}`)
        .join(', '),
    );
  }

  const updatedBicycle = await BicycleSchema.findByIdAndUpdate(
    productId, // Filter by the _id
    { $set: parsedData.data }, // Update the specified fields
    { new: true, runValidators: true }, // Return the updated document
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

const createNewOrder = async ({
  email,
  product,
  quantity,
  totalPrice,
}: {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
}) => {
  try {
    // Check validity
    if (!mongoose.Types.ObjectId.isValid(product)) {
      throw new Error(`Invalid product ID: ${product}`);
    }

    // Convert product to ObjectId
    const productId = new mongoose.Types.ObjectId(product);

    // Find the product in the database
    const productDocument = await BicycleSchema.findById(productId);

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
