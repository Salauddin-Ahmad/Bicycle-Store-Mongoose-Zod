import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BicycleRoutes } from './app/modules/bicycle.route';
const app: Application = express();
app.use(express.json());

app.use('/api', BicycleRoutes);

app.use(cors());

const getAcontroller = async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hit /api/bicycle/all to get all the data',
  });
};

app.get('/', getAcontroller);

export default app;
