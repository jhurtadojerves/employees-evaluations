import { BaseRouter } from '#routes/index.route';
import EvaluationController from '#controllers/evaluation.controller';
import { Router } from 'express';
import { UserRole } from '#models/User';
import { authorize } from '#/middlewares/authorize';
import { isAuthenticated } from '#/middlewares/isAuthenticated';

export default class EvaluationRouter extends BaseRouter {
  constructor(private controller: EvaluationController) {
    super();
  }
  public path: string = '/evaluations';

  router = (): Router => {
    const routerProvider = Router();
    const managerPermissions = authorize(
      ...[UserRole.ADMIN.toString(), UserRole.MANAGER.toString()],
    );

    routerProvider.post('/', isAuthenticated, managerPermissions, this.controller.create);
    routerProvider.get('/', isAuthenticated, this.controller.list);
    routerProvider.get('/:id', isAuthenticated, this.controller.get);
    routerProvider.patch('/:id', isAuthenticated, this.controller.update);
    routerProvider.patch('/:id/disable', isAuthenticated, this.controller.disable);
    routerProvider.post('/:id/questions', isAuthenticated, this.controller.addQuestions);
    routerProvider.delete('/:id/questions', isAuthenticated, this.controller.removeQuestions);

    return routerProvider;
  };
}
