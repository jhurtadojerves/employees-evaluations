import { expressApp, port, routes } from '#inject';
import { getBaseContextMiddleware, requestContextMiddleware } from '#middlewares/contextMiddleware';

import config from '#config';
import connectDB from '#config/database';
import cors from 'cors';
import { errorHandler } from '#middlewares/errorHandler';
import express from 'express';
import openApi from '#config/swagger';
import registerRoutes from '#routes/index.route';
import swaggerUi from 'swagger-ui-express';

export async function bootstrap(): Promise<void> {
  expressApp.disable('x-powered-by');
  expressApp.use(cors());
  expressApp.use(express.json());
  expressApp.use(getBaseContextMiddleware);
  expressApp.use(requestContextMiddleware);
  registerRoutes(expressApp, routes, '/api');

  await connectDB(config.db.url);
  expressApp.use(errorHandler);

  if (config.server.env == 'local') {
    expressApp.use(
      '/api/docs',
      swaggerUi.serve,
      swaggerUi.setup(openApi, {
        swaggerOptions: {
          persistAuthorization: true,
        },
      }),
    );
    expressApp.get('/api/docs.json', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(openApi);
    });
  }

  expressApp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('❌ Error initializing app:', err);
  process.exit(1);
});
