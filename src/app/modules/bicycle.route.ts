import express from 'express';
import { BicycleController } from './bicycle.controller';

const router = express.Router();

// create a bicycle when the url is hit with data then controller will validate and redirect to the service route to create a new bicycle
router.post('/createcycle', BicycleController.createBicycle);


export const BicycleRoutes = router;
