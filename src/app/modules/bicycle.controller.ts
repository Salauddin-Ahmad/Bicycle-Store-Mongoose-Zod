import { RequestHandler } from 'express';
import { BicycleValidation } from './bicycle.validation';
import { BicycleServices } from './bicycle.service';

//  The Flow is (url, cb function) @bicycle.route → →
// (validation & error middleware , callback of services) @bicycle.controller → →
// will do database ops @bicycle.services >

// create new bicycle into database
const createBicycle: RequestHandler = async (req, res, next) => {
  try {
    // Data validation using Zod
    // Directly validate req.body without nesting
    const zodParsedData = BicycleValidation.parse(req.body);

    // Pass validated data to the service
    const result = await BicycleServices.createBicylceIntoDB(zodParsedData);

    res.status(201).json({
      message: 'Bicycle created successfully',
      success: true,
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
      message: 'Bicycles retrieved successfully',
      status: true,
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
      message: 'Bicycle retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update the cycle with id from url params
const updateBicycle: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    const updatedBicycle = await BicycleServices.updateBicyclebyId(
      productId,
      updateData,
    );

    if (!updatedBicycle) {
      res.status(404).json({
        message: 'Bicycle not found',
        status: false,
      });
      return; // Exit the function explicitly
    }

    res.status(200).json({
      message: 'Bicycle updated successfully',
     status: true,
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
};

// create new order
const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;

    // Call the service to create the order and manage quantity
    const newOrder = await BicycleServices.createNewOrder({
      email,
      product,
      quantity,
      totalPrice,
    });

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: newOrder,
    });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

// count total revenue from orders
const countRevenue: RequestHandler = async (req, res, next) => {
  try {
    const result = await BicycleServices.calculateRevenue();

    if (result && result.length > 0) {
      const totalRevenue = result[0].totalrevenue; // Extract the value from the aggregation result
      res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
          totalRevenue,
        },
      });
    } else {
      res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
          totalRevenue: 0, // Default if no revenue is found
        },
      });
    }
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export const BicycleController = {
  createBicycle,
  getAllBicycles,
  getBicycleById,
  updateBicycle,
  deleteBicycle,
  createOrder,
  countRevenue,
};
