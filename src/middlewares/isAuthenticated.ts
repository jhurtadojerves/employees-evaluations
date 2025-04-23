import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '#models/User';

import { HttpError } from '#utils/HttpError';
import config from '#config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = config.secrets.jwt;

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new HttpError(401, 'No token provided'));
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const user: IUser | null = await User.findById(decoded.id);

    if (!user) {
      return next(new HttpError(401, 'User not found'));
    }

    (req as any).user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.log(error);
    next(new HttpError(401, 'Invalid or expired token'));
  }
};
