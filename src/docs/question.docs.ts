import { CreateQuestionInputSchema, UpdateQuestionInputSchema } from '#types/question.type';

import { ListResponseSchema } from '#types/common.type';
import { QuestionDTOSchema } from '#dtos/question.dto';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { z } from 'zod';

export const questionDocs: ZodOpenApiPathsObject = {
  '/questions': {
    get: {
      summary: 'List all questions',
      tags: ['Questions'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'limit',
          in: 'query',
          required: false,
          description: 'Number of questions to return',
        },
        {
          name: 'offset',
          in: 'query',
          required: false,
          description: 'Number of questions to skip',
        },
      ],
      responses: {
        200: {
          description: 'List of questions',
          content: {
            'application/json': {
              schema: ListResponseSchema.extend({
                data: z.array(QuestionDTOSchema),
              }),
            },
          },
        },
      },
    },
    post: {
      summary: 'Create a new question',
      tags: ['Questions'],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreateQuestionInputSchema,
          },
        },
      },
      responses: {
        201: {
          description: 'Question created successfully',
          content: {
            'application/json': {
              schema: QuestionDTOSchema,
            },
          },
        },
        400: {
          description: 'Invalid input',
        },
      },
    },
  },

  '/questions/{id}': {
    patch: {
      summary: 'Update a question',
      tags: ['Questions'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Question ID',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: UpdateQuestionInputSchema,
          },
        },
      },
      responses: {
        200: {
          description: 'Question updated successfully',
          content: {
            'application/json': {
              schema: QuestionDTOSchema,
            },
          },
        },
        404: {
          description: 'Question not found',
        },
      },
    },
  },
};
