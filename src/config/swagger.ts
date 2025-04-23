import { loadDocs } from '#docs/load';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const docs = loadDocs(path.resolve(__dirname, '../docs'));

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '360 Evaluation REST API',
    version: '1.0.0',
    description: 'Auto-generated Swagger documentation',
  },
  servers: [
    {
      url: 'http://localhost:9000/api',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...docs.components?.schemas,
    },
  },
  paths: {
    ...docs.paths,
  },
};

const options = {
  swaggerDefinition,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
