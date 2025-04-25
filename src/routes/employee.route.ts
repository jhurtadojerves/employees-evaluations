import { BaseRouter } from '#routes/index.route';
import EmployeController from '#controllers/employee.controller';
import { Router } from 'express';
import { UserRole } from '#models/User';
import { authorize } from '#/middlewares/authorize';
import { isAuthenticated } from '#/middlewares/isAuthenticated';

export default class EmployeeRouter extends BaseRouter {
  constructor(private controller: EmployeController) {
    super();
  }
  public path: string = '/employees';

  router = (): Router => {
    const routerProvider = Router();
    const managerPermissions = authorize(
      ...[UserRole.ADMIN.toString(), UserRole.MANAGER.toString()],
    );

    routerProvider.get('/', isAuthenticated, managerPermissions, this.controller.list);
    routerProvider.get('/:id', isAuthenticated, managerPermissions, this.controller.get);
    routerProvider.post('/', isAuthenticated, managerPermissions, this.controller.create);
    routerProvider.patch('/:id', isAuthenticated, managerPermissions, this.controller.update);

    return routerProvider;
  };
}
