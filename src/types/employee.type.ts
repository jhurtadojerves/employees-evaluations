import { z } from 'zod';

export const UpdateEmployeeInputSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  position: z.string().optional(),
  salary: z.coerce.number().optional(),
});

export const CreateEmployeeInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  position: z.string(),
  email: z.string().email(),
  salary: z.coerce.number(),
});

export type UpdateEmployeeInput = z.infer<typeof UpdateEmployeeInputSchema>;
export type CreateEmployeeInput = z.infer<typeof CreateEmployeeInputSchema>;
