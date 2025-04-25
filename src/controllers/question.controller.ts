import { CreateQuestionInputSchema, UpdateQuestionInputSchema } from '#types/question.type';

import { BaseController } from './index.controller';
import { QuestionService } from '#services/question.service';

export default class QuestionController extends BaseController {
  constructor(protected service: QuestionService) {
    super(service);
  }
  protected UpdateInputSchema = UpdateQuestionInputSchema;
  protected CreateInputSchema = CreateQuestionInputSchema;
}
