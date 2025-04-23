import { NextFunction, Request, Response } from 'express';

import { HttpError } from '#utils/HttpError';

export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(`[ERROR] ${err.message}`);

  const statusCode = err.status && err.status >= 400 && err.status < 600 ? err.status : 500;

  res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Internal Server Error',
  });
};
