import { BicylceInterface } from "./bicycle.interface";
import { BicycleSchema } from "./bicycle.model";

const createBicylceIntoDB = async (bicylce: BicylceInterface) => {
    try {
      const result = await BicycleSchema.create(bicylce);
      return result;
    } catch (error) {
      throw new Error(`Error creating student: ${error.message}`);
    }
  };



  export const BicycleServices = {
    createBicylceIntoDB,
  } 