import { UserDTOSchema } from '#dtos/user.dto';
import { ZodOpenApiPathsObject } from 'zod-openapi';
import { z } from 'zod';

export const AuthRegisterInputSchema = z.object({
  email: z.string().email().openapi({ example: 'alice@example.com' }),
  password: z.string().min(6).openapi({ example: 'strongpassword123' }),
});

export const AuthLoginInputSchema = z.object({
  email: z.string().email().openapi({ example: 'alice@example.com' }),
  password: z.string().min(6).openapi({ example: 'strongpassword123' }),
});

export const AuthLoginResponseSchema = z.object({
  token: z.string().openapi({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' }),
  user: UserDTOSchema,
});

export const authDocs: ZodOpenApiPathsObject = {
  '/auth/register': {
    post: {
      summary: 'Register a new user',
      tags: ['Auth'],
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: AuthRegisterInputSchema.required(),
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: UserDTOSchema,
            },
          },
        },
        400: {
          description: 'Email already registered',
        },
      },
    },
  },
  '/auth/login': {
    post: {
      summary: 'Login user',
      tags: ['Auth'],
      security: [],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: AuthLoginInputSchema.required(),
          },
        },
      },
      responses: {
        200: {
          description: 'Successful login',
          content: {
            'application/json': {
              schema: AuthLoginResponseSchema,
            },
          },
        },
        401: {
          description: 'Invalid credentials',
        },
      },
    },
  },
};
