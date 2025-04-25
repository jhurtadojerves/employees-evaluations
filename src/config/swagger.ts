import { EmployeeDTOSchema } from '#dtos/employee.dto';
import { EvaluationDTOSchema } from '#dtos/evaluation.dto';
import { QuestionDTOSchema } from '#dtos/question.dto';
import { UserDTOSchema } from '#dtos/user.dto';
import { authDocs } from '#docs/auth.docs';
import { createDocument } from 'zod-openapi';
import { employeeDocs } from '#docs/employee.docs';
import { evaluationDocs } from '#docs/evaluation.docs';
import { questionDocs } from '#docs/question.docs';
import { userDocs } from '#docs/user.docs';

const openApi = createDocument({
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'Evaluations routers',
    description: 'Evaluations routers documentation',
  },
  paths: {
    ...authDocs,
    ...employeeDocs,
    ...evaluationDocs,
    ...questionDocs,
    ...userDocs,
  },
  components: {
    schemas: {
      Employee: EmployeeDTOSchema,
      Evaluation: EvaluationDTOSchema,
      Question: QuestionDTOSchema,
      User: UserDTOSchema,
    },
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ BearerAuth: [] }],
  servers: [
    {
      url: 'http://localhost:9000/api/',
      description: 'Local server',
    },
  ],
});

export default openApi;
