import mongoose from 'mongoose';
import { BicylceInterface } from './bicycle.interface';
import { BicycleSchema } from './bicycle.model';

const createBicylceIntoDB = async (bicylce: BicylceInterface) => {
  try {
    const result = await BicycleSchema.create(bicylce);
    return result;
  } catch (error) {

    throw new Error(`Error creating student: ${error}`);
  }
};

const getAllBicyclesFromDB = async () => {
  const result = await BicycleSchema.find();
  return result
}


const getSingleBicycleById = async (id: string) => {
  const result = await BicycleSchema.findOne({_id: id});
  return result;
}


const updateBicyclebyId = async (productId: string, updateData: Partial<typeof BicycleSchema>) => {
  // Validate the productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid Product ID');
  }

  const updatedBicycle = await BicycleSchema.findByIdAndUpdate(
    productId,               // Filter by the _id
    { $set: updateData },    // Update the specified fields
    { new: true }            // Return the updated document
  );

  return updatedBicycle;
};


const deleteBicycleById = async (productId: string): Promise<boolean> => {
  // Validate the productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error('Invalid Product ID');
  }

  const result = await BicycleSchema.findByIdAndDelete(_id : productId);
  return result!== null;
  // Return true if a document was deleted, false otherwise




}


export const BicycleServices = {
  createBicylceIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleById,
  updateBicyclebyId,
  deleteBicycleById
};
