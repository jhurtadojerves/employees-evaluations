import { RefinementCtx, ZodIssueCode, z } from 'zod';

import { extendZodWithOpenApi } from 'zod-openapi';

extendZodWithOpenApi(z);

export const validateChoicesOptions = (
  data: { type?: QuestionType; options?: string[] },
  ctx: RefinementCtx,
): void => {
  if (data.type === QuestionType.CHOICES && (!data.options || data.options.length === 0)) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: 'Options are required when type is choices',
      path: ['options'],
    });
  }
};

export enum QuestionType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  CHOICES = 'choices',
}

export const CreateQuestionInputSchema = z
  .object({
    text: z.string().openapi({
      example: '¿Cuál es tu color favorito?',
      description: 'Texto de la pregunta',
    }),
    type: z.nativeEnum(QuestionType).openapi({
      example: QuestionType.CHOICES,
      description: 'Tipo de pregunta (text, number, boolean, choices)',
    }),
    options: z
      .array(z.string())
      .optional()
      .openapi({
        example: ['Rojo', 'Azul', 'Verde'],
        description: 'Opciones disponibles, requerido solo si type es "choices"',
      }),
  })
  .superRefine(validateChoicesOptions);

export const UpdateQuestionInputSchema = z
  .object({
    text: z.string().optional().openapi({
      example: '¿Cuál es tu color favorito?',
      description: 'Texto de la pregunta',
    }),
    type: z.nativeEnum(QuestionType).optional().openapi({
      example: QuestionType.CHOICES,
      description: 'Tipo de pregunta (text, number, boolean, choices)',
    }),
    options: z
      .array(z.string())
      .optional()
      .openapi({
        example: ['Rojo', 'Azul', 'Verde'],
        description: 'Opciones disponibles, requerido solo si type es "choices"',
      }),
  })
  .superRefine(validateChoicesOptions);

export type CreateQuestionInput = z.infer<typeof CreateQuestionInputSchema>;
export type UpdateQuestionInput = z.infer<typeof UpdateQuestionInputSchema>;
