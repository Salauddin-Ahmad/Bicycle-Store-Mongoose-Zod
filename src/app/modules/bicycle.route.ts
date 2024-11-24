import express from 'express';
import { BicycleController } from './bicycle.controller';

const router = express.Router();

// create a bicycle when the url is hit with data then controller will validate and redirect to the service route to create a new bicycle
router.post('/createcycle', BicycleController.createBicycle);
router.get('/products', BicycleController.getAllBicycles);
router.get('/products/:productId', BicycleController.getBicycleById);
router.put('/products/:productId', BicycleController.updateBicycle)
router.delete('/products/:productId', BicycleController.deleteBicycle)
router.post('/orders', BicycleController.createOrder);

export const BicycleRoutes = router;
