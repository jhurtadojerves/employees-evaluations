import {
  EvaluationDTO,
  EvaluationDTOSchema,
  EvaluationListDRO,
  EvaluationListDROSchema,
  EvaluationOptionsDTO,
  EvaluationOptionsDTOSchema,
} from '#dtos/evaluation.dto';

export const toEvaluationDTO = (evaluation: any): EvaluationDTO =>
  EvaluationDTOSchema.parse(evaluation.toObject());

export const toEvaluationListDTO = (evaluations: any[]): EvaluationListDRO[] =>
  EvaluationListDROSchema.array().parse(evaluations.map((e) => e.toObject()));

export const toEvaluationOptionsEvaluationDTO = (evaluation: any): EvaluationOptionsDTO =>
  EvaluationOptionsDTOSchema.parse(evaluation.toObject());
