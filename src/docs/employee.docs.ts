import { CreateEmployeeInputSchema, UpdateEmployeeInputSchema } from '#types/employee.type';

import { EmployeeDTOSchema } from '#dtos/employee.dto';
import { ListResponseSchema } from '#types/common.type';
import { ZodOpenApiPathsObject } from 'zod-openapi';

export const employeeDocs: ZodOpenApiPathsObject = {
  '/employees': {
    get: {
      summary: 'List all employees',
      tags: ['Employees'],
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
                data: EmployeeDTOSchema.array(),
              }),
            },
          },
        },
      },
    },
    post: {
      summary: 'Create a new employee',
      tags: ['Employees'],
      security: [{ BearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: CreateEmployeeInputSchema.required(),
          },
        },
      },
      responses: {
        201: {
          description: 'Employee created successfully',
          content: {
            'application/json': {
              schema: EmployeeDTOSchema,
            },
          },
        },
        400: {
          description: 'Invalid input or user not found',
        },
      },
    },
  },

  '/employees/{id}': {
    get: {
      summary: 'Get an employee by ID',
      tags: ['Employees'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Employee ID',
          schema: { type: 'string' },
        },
      ],
      responses: {
        200: {
          description: 'Employee found',
          content: {
            'application/json': {
              schema: EmployeeDTOSchema,
            },
          },
        },
        404: {
          description: 'Employee not found',
        },
      },
    },

    patch: {
      summary: 'Update an employee',
      tags: ['Employees'],
      security: [{ BearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Employee ID',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: UpdateEmployeeInputSchema.required(),
          },
        },
      },
      responses: {
        200: {
          description: 'Employee updated successfully',
          content: {
            'application/json': {
              schema: EmployeeDTOSchema,
            },
          },
        },
        404: {
          description: 'Employee not found',
        },
      },
    },
  },
};
