import { QuestionDTO, QuestionDTOSchema } from '#dtos/question.dto';

export const toQuestionDTO = (question: any): QuestionDTO =>
  QuestionDTOSchema.parse(question.toObject());

export const toQuestionListDTO = (employees: any[]): QuestionDTO[] =>
  QuestionDTOSchema.array().parse(employees.map((e) => e.toObject()));
