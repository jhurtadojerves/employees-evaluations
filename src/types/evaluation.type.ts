import { extendZodWithOpenApi } from 'zod-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const CreateEvaluationInputSchema = z
  .object({
    period: z.coerce
      .number()
      .openapi({ example: 2024, description: 'Evaluation period (e.g., year)' }),
    type: z.string().openapi({ example: 'peer-review', description: 'Type of evaluation' }),
    title: z.string().openapi({ example: 'Mid-Year Review', description: 'Evaluation title' }),
    description: z
      .string()
      .openapi({ example: 'Covers all employees in engineering', description: 'Description' }),
    questions: z
      .array(z.string())
      .optional()
      .openapi({
        example: ['6634ad0d3b3c3e6c1fef8c2a', '6634ad0d3b3c3e6c1fef8c2b'],
        description: 'Optional list of question IDs',
      }),
  })
  .openapi({ required: ['period', 'type', 'title', 'description'] });

export const UpdateEvaluationInputSchema = z.object({
  period: z.coerce
    .number()
    .openapi({ example: 2024, description: 'Evaluation period (e.g., year)' }),
  type: z.string().openapi({ example: 'peer-review', description: 'Type of evaluation' }),
  title: z.string().openapi({ example: 'Mid-Year Review', description: 'Evaluation title' }),
  description: z
    .string()
    .openapi({ example: 'Covers all employees in engineering', description: 'Description' }),
});

export const OptionsEvaluationInputSchema = z
  .object({
    questions: z.array(z.string()).openapi({
      example: ['6634ad0d3b3c3e6c1fef8c2a', '6634ad0d3b3c3e6c1fef8c2b'],
      description: 'Optional list of question IDs',
    }),
  })
  .openapi({ required: ['questions'] });

export type CreateEvaluationInput = z.infer<typeof CreateEvaluationInputSchema>;
export type UpdateEvaluationInput = z.infer<typeof UpdateEvaluationInputSchema>;
export type OptionEvaluationInput = z.infer<typeof OptionsEvaluationInputSchema>;
