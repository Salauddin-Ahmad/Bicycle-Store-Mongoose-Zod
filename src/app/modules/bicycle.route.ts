// import  express  from 'express';

// const router = express.Router();


// // create a new bike 

// BicycleRoutes


import express from 'express';


const router = express.Router();

router.post('/api/products', async (req, res) => {
  try {
    // Validate request body using zod
    const validatedData = createBicycleSchema.parse(req.body);

    // Create a new bicycle
    const bicycle = new Bicycle(validatedData);
    await bicycle.save();

    res.status(201).json({
      message: 'Bicycle created successfully',
      success: true,
      data: bicycle,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error,
      stack: error.stack,
    });
  }
});

export default router;
