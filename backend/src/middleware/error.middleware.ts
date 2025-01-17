import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { ApiResponse } from '../types/api.types';

export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError | MongooseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  const response: ApiResponse<null> = {
    success: false,
    error: 'Internal Server Error'
  };

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    response.error = err.message;
  } else if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    response.error = Object.values(err.errors)
      .map(error => error.message)
      .join(', ');
  } else if (err instanceof MongooseError.CastError) {
    statusCode = 400;
    response.error = 'Invalid ID format';
  } else if ((err as any).code === 11000) {
    statusCode = 409;
    response.error = 'Duplicate entry found';
  }

  // Development vs Production error handling
  if (process.env.NODE_ENV === 'development') {
    response.message = err.stack;
  }

  res.status(statusCode).json(response);
}; 