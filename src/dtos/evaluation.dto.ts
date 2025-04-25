import { EmployeeDTOSchema } from './employee.dto';
import { EvaluationState } from '#models/Evaluation';
import { QuestionDTOSchema } from './question.dto';
import { UserDTOSchema } from './user.dto';
import { extendZodWithOpenApi } from 'zod-openapi';
import { z } from 'zod';
extendZodWithOpenApi(z);

export const EvaluationDTOSchema = z
  .object({
    _id: z
      .any()
      .refine((val) => val != null, { message: '_id is required' })
      .transform((val) => val.toString())
      .openapi({ type: 'string', example: 'evaluation-id-123', effectType: 'input' }),
    period: z.coerce.number().openapi({ example: 2024 }),
    state: z.nativeEnum(EvaluationState).openapi({ example: EvaluationState.ACTIVE }),
    type: z.string().openapi({ example: 'peer-review' }),
    title: z.string().openapi({ example: 'Mid-Year Evaluation' }),
    description: z.string().openapi({ example: 'Evaluation of all engineering staff' }),
    createdBy: UserDTOSchema,
    employeesToEvaluate: z.array(EmployeeDTOSchema),
    questions: z.array(QuestionDTOSchema),
    updatedAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
    createdAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
  })
  .describe('Evaluation');

export const EvaluationListDROSchema = EvaluationDTOSchema.extend({
  questions: z.array(
    z
      .any()
      .refine((val) => val != null, { message: '_id is required' })
      .transform((val) => val.toString())
      .openapi({ type: 'string', example: 'evaluation-id-123', effectType: 'input' }),
  ),
});

export const EvaluationOptionsDTOSchema = z.object({
  _id: z
    .any()
    .refine((val) => val != null, { message: '_id is required' })
    .transform((val) => val.toString())
    .openapi({ type: 'string', example: 'evaluation-id-123', effectType: 'input' }),
  period: z.coerce.number().openapi({ example: 2024 }),
  state: z.nativeEnum(EvaluationState).openapi({ example: EvaluationState.ACTIVE }),
  type: z.string().openapi({ example: 'peer-review' }),
  title: z.string().openapi({ example: 'Mid-Year Evaluation' }),
  description: z.string().openapi({ example: 'Evaluation of all engineering staff' }),
  questions: z.array(
    QuestionDTOSchema.omit({
      createdBy: true,
      updatedAt: true,
      createdAt: true,
    }),
  ),
  updatedAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
  createdAt: z.date().openapi({ format: 'date-time', example: '2024-04-22T12:34:56.000Z' }),
});

export type EvaluationDTO = z.infer<typeof EvaluationDTOSchema>;
export type EvaluationOptionsDTO = z.infer<typeof EvaluationOptionsDTOSchema>;
export type EvaluationListDRO = z.infer<typeof EvaluationListDROSchema>;
