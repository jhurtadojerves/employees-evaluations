import { UserRole } from '#models/User';
import { z } from 'zod';

export const UpdateUserInputSchema = z.object({
  role: z.nativeEnum(UserRole),
});

export type UpdateUserInput = z.infer<typeof UpdateUserInputSchema>;
