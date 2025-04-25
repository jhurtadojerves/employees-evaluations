import { UserRole } from '#models/User';
import { extendZodWithOpenApi } from 'zod-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const UserDTOSchema = z.object({
  _id: z
    .any()
    .refine((val) => val != null, { message: '_id is required' })
    .transform((val) => val.toString())
    .openapi({ type: 'string', example: 'user-id-123', effectType: 'input' }),
  email: z.string().email().openapi({ example: 'john@example.com' }),
  role: z.nativeEnum(UserRole).openapi({ example: UserRole.EMPLOYEE }),
  createdAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
  updatedAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
});

export type UserDTO = z.infer<typeof UserDTOSchema>;
