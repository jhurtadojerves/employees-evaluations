import { CreateEvaluationInputSchema, OptionsEvaluationInputSchema } from '#types/evaluation.type';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from './index.controller';
import { EvaluationService } from '#services/evaluation.service';
import { UpdateQuestionInputSchema } from '#types/question.type';

export default class EvaluationController extends BaseController {
  constructor(protected service: EvaluationService) {
    super(service);
  }
  protected UpdateInputSchema = UpdateQuestionInputSchema;
  protected CreateInputSchema = CreateEvaluationInputSchema;

  disable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const response = await this.service.disable(id);
      res.json(response);
    } catch (error: unknown) {
      next(error);
    }
  };

  addQuestions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const input = OptionsEvaluationInputSchema.parse(req.body);
      const response = await this.service.addQuestions(id, input);
      res.json(response);
    } catch (error: unknown) {
      next(error);
    }
  };

  removeQuestions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const input = OptionsEvaluationInputSchema.parse(req.body);
      const response = await this.service.removeQuestions(id, input);
      res.json(response);
    } catch (error: unknown) {
      next(error);
    }
  };
}
