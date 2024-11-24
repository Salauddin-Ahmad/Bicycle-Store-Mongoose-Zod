import { RequestHandler } from 'express';
import { BicycleValidation } from './bicycle.validation';
import { BicycleServices } from './bicycle.service';


//  The Flow is (url, cb function) @bicycle.route → → 
// (validation & error middleware , callback of services) @bicycle.controller → →
// will do database ops @bicycle.services > 


// create new bicycle into database
const createBicycle: RequestHandler = async (req, res, next) => {
  try {
    const { bicycle: bicycleData } = req.body;

    // Data validation using Zod
    const zodParsedData = BicycleValidation.parse(bicycleData);

    // Pass validated data to the service
    const result = await BicycleServices.createBicylceIntoDB(zodParsedData);

    res.status(201).json({
      success: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};


// get all bycycles from database 
const getAllBicycles: RequestHandler = async (req, res, next) => {
  try {
    const result = await BicycleServices.getAllBicyclesFromDB();
    res.status(200).json({
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error); // Pass to error handler
  }
};

// get single bicycles from db by _id 
const getBicycleById: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const result = await BicycleServices.getSingleBicycleById(productId);
    res.status(200).json({
      success: true,
      message: 'Bicycle retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// // update bicycles from db by _id
// const updateBicycle: RequestHandler = async (req, res, next) => {
//   const productId = req.params;
//   const updateNewData = req.body;
//   const result = await BicycleController.updateBicyclebyId(productId, updateNewData);
//   if (!updateBicycle) {
//     return res.status(404).json({
//       success: false,
//       message: 'Bicycle not found',
//     });
//   }

//   res.status(200).json({
//     success: true,
//     message: 'Bicycle updated successfully',
//     data: updateBicyclebyId,
//   });
// } 

// const updateBicycle: RequestHandler = async (req, res, next): Promise<void> => {
//   try {
//     const { productId } = req.params;
//     const updateData = req.body; // Get the data to update from the request body

//     const updatedBicycle = await BicycleServices.updateBicyclebyId(productId, updateData);

//     if (!updatedBicycle) {
//        res.status(404).json({
//         success: false,
//         message: 'Bicycle not found',
//       });
//     } else 
//     res.status(200).json({
//       success: true,
//       message: 'Bicycle updated successfully',
//       data: updatedBicycle,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const updateBicycle: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedBicycle = await BicycleServices.updateBicyclebyId(productId, updateData);

    if (!updatedBicycle) {
      res.status(404).json({
        success: false,
        message: 'Bicycle not found',
      });
      return; // Exit the function explicitly
    }

    res.status(200).json({
      success: true,
      message: 'Bicycle updated successfully',
      data: updatedBicycle,
    });
    return; 
  } catch (error) {
    next(error); // Forward the error to the error-handling middleware
  }
};

// delete a bicycle
const deleteBicycle: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { productId } = req.params;

    const deletedBicycle = await BicycleServices.deleteBicycleById(productId);

    if (!deletedBicycle) {
      res.status(404).json({
        success: false,
        message: 'Bicycle not found',
      });
      return; // Exit the function explicitly
    }

    res.status(200).json({
      message: 'Bicycle deleted successfully',
      status: true,
      data: deletedBicycle, // Include the deleted bicycle's data here
    });
    
    return;
  } catch (error) {
   next(error); // Forward the error to the error-handling middleware
  }
}




export const BicycleController = {
  createBicycle,
  getAllBicycles,
  getBicycleById,
  updateBicycle,
  deleteBicycle,
}
