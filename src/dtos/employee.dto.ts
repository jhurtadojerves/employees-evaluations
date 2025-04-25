import { UserDTOSchema } from './user.dto';
import { extendZodWithOpenApi } from 'zod-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const EmployeeDTOSchema = z.object({
  _id: z
    .any()
    .refine((val) => val != null, { message: '_id is required' })
    .transform((val) => val.toString())
    .openapi({ type: 'string', example: 'employee-id-123', effectType: 'input' }),
  firstName: z.string().openapi({ example: 'John' }),
  lastName: z.string().openapi({ example: 'Doe' }),
  position: z.string().openapi({ example: 'Software Engineer' }),
  salary: z.number().openapi({ example: 60000 }),
  user: UserDTOSchema,
  createdAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
  updatedAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
});

export type EmployeeDTO = z.infer<typeof EmployeeDTOSchema>;
