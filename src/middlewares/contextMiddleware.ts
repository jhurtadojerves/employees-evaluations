/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';

// @ts-expect-error
import httpContext from 'express-cls-hooked';

export const requestContextMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  httpContext.set('req', req);
  next();
};

export const getBaseContextMiddleware = httpContext.middleware;
