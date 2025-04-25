import { BaseRouter } from '#routes/index.route';
import { Router } from 'express';
import UserController from '#controllers/user.controller';
import { UserRole } from '#models/User';
import { authorize } from '#middlewares/authorize';
import { isAuthenticated } from '#middlewares/isAuthenticated';

export default class UserRouter extends BaseRouter {
  constructor(private controller: UserController) {
    super();
  }
  public path: string = '/users';
  router = (): Router => {
    const routerProvider = Router();
    routerProvider.get(
      '/',
      isAuthenticated,
      authorize(UserRole.ADMIN.toString()),
      this.controller.list,
    );
    routerProvider.patch(
      '/:id',
      isAuthenticated,
      authorize(UserRole.ADMIN.toString()),
      this.controller.update,
    );

    return routerProvider;
  };
}
