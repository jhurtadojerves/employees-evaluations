import { BaseRouter } from '#routes/index.route';
import { Router } from 'express';
import UserController from '#controllers/auth.controller';

export default class AuthRouter extends BaseRouter {
  constructor(private controller: UserController) {
    super();
  }
  public path: string = '/auth';
  router = (): Router => {
    const routerProvider = Router();

    routerProvider.post('/register', this.controller.register);
    routerProvider.post('/login', this.controller.login);

    return routerProvider;
  };
}
