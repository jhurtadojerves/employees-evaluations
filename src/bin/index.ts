import { authRouter, employeeRouter, expressApp, port } from '#inject';

import config from '#config';
import connectDB from '#config/database';
import cors from 'cors';
import { errorHandler } from '#middlewares/errorHandler';
import express from 'express';
import registerRoutes from '#routes/index.route';
import swaggerSpec from '#config/swagger';
import swaggerUi from 'swagger-ui-express';

export async function bootstrap(): Promise<void> {
  expressApp.disable('x-powered-by');
  expressApp.use(cors());
  expressApp.use(express.json());
  registerRoutes(expressApp, [authRouter, employeeRouter], '/api');

  expressApp.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  await connectDB(config.db.url);
  expressApp.use(errorHandler);

  expressApp.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('❌ Error initializing app:', err);
  process.exit(1);
});
