import { ZodError, ZodIssue } from "zod";
import { Request, Response, NextFunction } from "express";

// Define the structure for validation error
type ValidationError = {
  message: string;
  name: string;
  properties: {
    message: string;
    type: string;
    min?: number;
  };
  kind: string;
  path: any;
  value: any;
};

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500; // Default to internal server error

  let formattedError: {
    message: string;
    success: boolean;
    error: {
      name: string;
      errors: any;
    };
    stack?: string;
  } = {
    message: "Something went wrong",
    success: false,
    error: {
      name: err.name || "InternalServerError",
      errors: {},
    },
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  };

  // Handle Zod Errors
  if (err instanceof ZodError) {
    statusCode = 400;
    formattedError = {
      message: "Validation failed",
      success: false,
      error: {
        name: "ValidationError",
        errors: err.errors.reduce((acc: any, e: ZodIssue) => {
          // Get the field path (to handle nested paths)
          const field = e.path.join('.'); // Handles nested fields like 'address.street'

          // Extract the value from the request body (ensure it's matching the validation path)
          const value = req.body[field]; // Get the value that caused the validation error

          const errorDetail: ValidationError = {
            message: e.message,
            name: "ValidatorError",
            properties: {
              message: e.message,
              type: e.code || "unknown",
              min: 0, // Default min value
            },
            kind: e.code || "unknown",
            path: field,
            value: value || "unknown", // Include the actual value here, or "unknown" if not found
          };

          // Accumulate errors per field
          acc[field] = errorDetail;
          return acc;
        }, {}),
      },
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    };
  }

  // Send the response with the correct status code
  res.status(statusCode).json(formattedError);
};

export default errorHandler;