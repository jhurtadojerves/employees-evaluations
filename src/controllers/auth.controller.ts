import { NextFunction, Request, Response } from 'express';
import { UserService, authInput } from '#services/user.service';

import { BaseController } from '#controllers/index.controller';
import { z } from 'zod';

export default class AuthController extends BaseController {
  constructor(protected service: UserService) {
    super(service);
  }
  protected UpdateInputSchema = z.object({});
  protected CreateInputSchema = z.object({});
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body as authInput;
      const response = await this.service.register({ email, password });
      res.json({ ...response });
    } catch (error: unknown) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body as authInput;
      const response = await this.service.login({ email, password });
      res.json({ ...response });
    } catch (error) {
      next(error);
    }
  };
}
