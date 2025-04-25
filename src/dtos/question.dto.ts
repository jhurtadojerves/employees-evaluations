import { QuestionType } from '#types/question.type';
import { UserDTOSchema } from './user.dto';
import { extendZodWithOpenApi } from 'zod-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const QuestionDTOSchema = z
  .object({
    _id: z
      .any()
      .refine((val) => val != null, { message: '_id is required' })
      .transform((val) => val.toString())
      .openapi({ type: 'string', example: 'question-id-123', effectType: 'input' }),
    text: z.string().openapi({ example: 'How do you rate your team collaboration?' }),
    type: z.nativeEnum(QuestionType).openapi({ example: QuestionType.CHOICES }),
    options: z
      .array(z.string())
      .optional()
      .openapi({ example: ['Excellent', 'Good', 'Average'] }),
    createdBy: UserDTOSchema,
    updatedAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
    createdAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
  })
  .describe('Question');

export type QuestionDTO = z.infer<typeof QuestionDTOSchema>;
