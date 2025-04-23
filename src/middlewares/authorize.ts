import { HttpForbidden, HttpUnauthorized } from '#utils/HttpError';
import { NextFunction, Request, Response } from 'express';

import { IUser } from '#models/User';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export function authorize(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      return next(new HttpUnauthorized());
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new HttpForbidden());
    }

    next();
  };
}
