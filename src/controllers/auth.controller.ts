import { NextFunction, Request, Response } from 'express';
import { UserService, loginInput, registerInput } from '#services/user.service';

import { BaseController } from '#controllers/index.controller';

export default class AuthController extends BaseController {
  constructor(private service: UserService) {
    super();
  }
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password } = req.body as registerInput;
      const response = await this.service.register({ email, password, name });
      res.json({ ...response });
    } catch (error: unknown) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body as loginInput;
      const response = await this.service.login({ email, password });
      res.json({ ...response });
    } catch (error) {
      next(error);
    }
  };
}
