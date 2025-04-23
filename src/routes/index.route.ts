import express, { Application, Router } from 'express';

import expressListEndpoints from 'express-list-endpoints';

export abstract class BaseRouter {
  public abstract path: string;
  abstract router(): Router;
}

const registerRoutes = (app: Application, routes: BaseRouter[], basePath: string): void => {
  const formattedEndpoints: { Method: string; Path: string }[] = [];
  const apiRouter = express.Router();

  routes.map((route) => {
    const path = route.path;
    const routerList = route.router();
    const endpoints = expressListEndpoints(routerList);
    apiRouter.use(path, routerList);

    endpoints.forEach((endpoint) => {
      endpoint.methods.forEach((method) => {
        formattedEndpoints.push({
          Method: method,
          Path: `${basePath}${path}${endpoint.path}`,
        });
      });
    });
  });
  app.use(basePath, apiRouter);
  console.log('📚 Available routes:');
  console.table(formattedEndpoints);
};

export default registerRoutes;
