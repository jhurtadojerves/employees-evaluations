import {
  CreateEvaluationInputSchema,
  OptionsEvaluationInputSchema,
  UpdateEvaluationInputSchema,
} from '#types/evaluation.type';
import { EvaluationDTOSchema, EvaluationOptionsDTOSchema } from '#dtos/evaluation.dto';

import Evaluation from '#models/Evaluation';
import { ListResponseSchema } from '#types/common.type';
import { ZodOpenApiPathsObject } from 'zod-openapi';

export const evaluationDocs: ZodOpenApiPathsObject = {
  '/evaluations': {
    get: {
      summary: 'List paginated evaluations',
      tags: ['Evaluations'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'limit',
          in: 'query',
          required: true,
          description: 'Number of employees to return',
          example: 10,
        },
        {
          name: 'offset',
          in: 'query',
          required: true,
          description: 'Number of employees to skip',
          example: 0,
        },
      ],
      responses: {
        200: {
          description: 'List of employees',
          content: {
            'application/json': {
              schema: ListResponseSchema.extend({
                data: EvaluationDTOSchema.array(),
              }),
            },
          },
        },
      },
    },
    post: {
      summary: 'Create a new evaluation',
      tags: ['Evaluations'],
      security: [{ BearerAuth: [] }],
      requestBody: {
        content: {
          'application/json': {
            schema: CreateEvaluationInputSchema.required(),
          },
        },
        required: true,
      },
      responses: {
        '201': {
          description: 'Evaluation created successfully',
          content: {
            'application/json': {
              schema: EvaluationDTOSchema.readonly(),
            },
          },
        },
        '400': {
          description: 'Invalid input',
        },
      },
    },
  },
  '/evaluations/{id}': {
    get: {
      summary: 'Get a evaluation by ID',
      tags: ['Evaluations'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Evaluation ID',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Evaluation found',
          content: {
            'application/json': {
              schema: Evaluation,
            },
          },
        },
        404: {
          description: 'evaluation not found',
        },
      },
    },
    patch: {
      summary: 'Update a evaluation',
      tags: ['Evaluations'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Evaluation ID',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: UpdateEvaluationInputSchema.required(),
          },
        },
      },
      responses: {
        200: {
          description: 'Evaluation updated successfully',
          content: {
            'application/json': {
              schema: EvaluationDTOSchema,
            },
          },
        },
        404: {
          description: 'Evaluation not found',
        },
      },
    },
  },
  '/evaluations/{id}/disable': {
    patch: {
      summary: 'Disable a evaluation',
      tags: ['Evaluations'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Evaluation ID',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Evaluation disabled successfully',
          content: {
            'application/json': {
              schema: EvaluationDTOSchema,
            },
          },
        },
        404: {
          description: 'Evaluation not found',
        },
      },
    },
  },
  '/evaluations/{id}/questions': {
    post: {
      summary: 'Add options to evaluation',
      tags: ['Evaluations'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Evaluation ID',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: OptionsEvaluationInputSchema.required(),
          },
        },
      },
      responses: {
        201: {
          description: 'Option added successfully',
          content: {
            'application/json': {
              schema: EvaluationOptionsDTOSchema,
            },
          },
        },
        404: {
          description: 'Evaluation not found',
        },
      },
    },
    delete: {
      summary: 'Remove options to evaluation',
      tags: ['Evaluations'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Evaluation ID',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: OptionsEvaluationInputSchema.required(),
          },
        },
      },
      responses: {
        200: {
          description: 'Option deleted successfully',
          content: {
            'application/json': {
              schema: EvaluationOptionsDTOSchema,
            },
          },
        },
        404: {
          description: 'Evaluation not found',
        },
      },
    },
  },
};
