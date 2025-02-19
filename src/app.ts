import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycle.route';
import errorHandler from './app/middleware/errorHandler';
const app: Application = express();
app.use(express.json()); // Add this middleware to parse JSON requests
app.use(cors());

app.use('/api', BicycleRoutes);

const getAcontroller = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Bicycle store running successfully',
  });
};

app.get('/', getAcontroller);

app.use(errorHandler);

export default app;
