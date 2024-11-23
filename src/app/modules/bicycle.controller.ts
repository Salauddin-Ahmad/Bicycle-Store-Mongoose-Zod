import { RequestHandler } from 'express';
import { BicycleValidation } from './bicycle.validation';
import { BicycleServices } from './bicycle.service';

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

const getBicycleById: RequestHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    console.log(productId)
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

export const BicycleController = {
  createBicycle,
  getAllBicycles,
  getBicycleById,
};
