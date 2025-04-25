import { NextFunction, Request, Response } from 'express';

import { HttpError } from '#utils/HttpError';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ZodError) {
    const statusCode = StatusCodes.BAD_REQUEST;
    res.status(statusCode).json({
      status: statusCode,
      message: 'Validation error',
      errors: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
    return;
  }

  if (err instanceof HttpError) {
    const statusCode = err.status ?? StatusCodes.INTERNAL_SERVER_ERROR;
    res.status(statusCode).json({
      status: statusCode,
      message: err.message,
    });
    return;
  }

  console.error('[UNEXPECTED ERROR]', err);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
  });
  return;
};
