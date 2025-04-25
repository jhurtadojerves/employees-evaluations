import AuthenticatedRequest from '#utils/Request';
import { BaseRouter } from '#routes/index.route';
import QuestionController from '#controllers/question.controller';
import { Router } from 'express';
import { UserRole } from '#models/User';
import { authorize } from '#/middlewares/authorize';
import { isAuthenticated } from '#/middlewares/isAuthenticated';

export default class QuestionRouter extends BaseRouter {
  constructor(private controller: QuestionController) {
    super();
  }
  public path: string = '/questions';

  router = (): Router => {
    const routerProvider = Router();
    const managerPermissions = authorize(
      ...[UserRole.ADMIN.toString(), UserRole.MANAGER.toString()],
    );

    routerProvider.get('/', isAuthenticated, managerPermissions, this.controller.list);
    routerProvider.patch('/:id', isAuthenticated, managerPermissions, this.controller.update);
    routerProvider.post('/', isAuthenticated, managerPermissions, (req, res, next) =>
      this.controller.create(req as AuthenticatedRequest, res, next),
    );

    return routerProvider;
  };
}
