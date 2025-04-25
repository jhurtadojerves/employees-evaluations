import { ListResponseSchema } from '#types/common.type';
import { UpdateUserInputSchema } from '#types/user.type';
import { UserDTOSchema } from '#dtos/user.dto';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { z } from 'zod';

export const userDocs: ZodOpenApiPathsObject = {
  '/users': {
    get: {
      summary: 'List all questions',
      tags: ['Users'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'limit',
          in: 'query',
          required: false,
          description: 'Number of questions to return',
          example: 10,
        },
        {
          name: 'offset',
          in: 'query',
          required: false,
          description: 'Number of questions to skip',
          example: 0,
        },
      ],
      responses: {
        200: {
          description: 'List of questions',
          content: {
            'application/json': {
              schema: ListResponseSchema.extend({
                data: z.array(UserDTOSchema),
              }),
            },
          },
        },
      },
    },
  },
  '/users/{id}': {
    patch: {
      summary: 'Update a user',
      tags: ['Users'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'User ID',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: UpdateUserInputSchema,
          },
        },
      },
      responses: {
        200: {
          description: 'User updated successfully',
          content: {
            'application/json': {
              schema: UserDTOSchema,
            },
          },
        },
        404: {
          description: 'User not found',
        },
      },
    },
  },
};
