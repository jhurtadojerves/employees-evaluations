import AuthController from '#controllers/auth.controller';
import { BaseRouter } from '#routes/index.route';
import { Router } from 'express';

export default class AuthRouter extends BaseRouter {
  constructor(private controller: AuthController) {
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
