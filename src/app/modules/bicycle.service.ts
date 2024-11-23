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



export const BicycleServices = {
  createBicylceIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleById
};
