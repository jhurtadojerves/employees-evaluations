import {
  CreateEvaluationInput,
  OptionEvaluationInput,
  UpdateEvaluationInput,
} from '#types/evaluation.type';
import Evaluation, { EvaluationState } from '#models/Evaluation';
import { EvaluationDTO, EvaluationOptionsDTO } from '#dtos/evaluation.dto';
import { ListInput, ListResponse, ListResponseSchema } from '#types/common.type';
import {
  toEvaluationDTO,
  toEvaluationListDTO,
  toEvaluationOptionsEvaluationDTO,
} from '#mappers/evaluation.mapper';

import { BaseService } from './index.service';
import { HttpNotFound } from '#utils/HttpError';
import { cleanObject } from '#utils/cleanObject';
import { getRequestContext } from '#utils/getRequest';

export class EvaluationService implements BaseService {
  private userSelect = 'email role createdAt updatedAt';
  private questionSelect = 'text type options';
  private employeeSelect = 'firstName lastName position salary';

  constructor(private readonly repository: typeof Evaluation) {}

  async create(input: CreateEvaluationInput): Promise<EvaluationDTO> {
    const req = getRequestContext();
    const createdBy = (req as unknown as Request & { userId?: string }).userId;
    const { period, type, title, description, questions } = input;
    const evaluation = new this.repository({
      period,
      type,
      title,
      description,
      questions,
      createdBy,
    });
    await evaluation.save();

    const populatedEvaluation = await evaluation.populate([
      {
        path: 'createdBy',
        select: this.userSelect,
      },
      {
        path: 'questions',
        select: this.questionSelect,
      },
      {
        path: 'employeesToEvaluate',
        select: this.employeeSelect,
      },
    ]);

    return toEvaluationDTO(populatedEvaluation);
  }

  async list(input: ListInput): Promise<ListResponse> {
    const { limit, offset } = input;
    const [data, total] = await Promise.all([
      this.repository
        .find()
        .skip(offset)
        .limit(limit)
        .populate([
          {
            path: 'createdBy',
            select: this.userSelect,
          },
        ]),
      this.repository.countDocuments(),
    ]);
    const cleanedData = ListResponseSchema.parse({
      total,
      data: toEvaluationListDTO(data),
      limit,
      offset,
      count: data.length,
    });

    return cleanedData;
  }

  async get(id: string): Promise<EvaluationDTO> {
    const evaluation = await this.repository.findById(id).populate([
      {
        path: 'createdBy',
        select: this.userSelect,
      },
      {
        path: 'questions',
        select: this.questionSelect,
      },
      {
        path: 'employeesToEvaluate',
        select: this.employeeSelect,
      },
    ]);

    if (!evaluation) {
      throw new HttpNotFound('Evaluation with this id not found');
    }

    return toEvaluationDTO(evaluation);
  }

  async update(id: string, input: UpdateEvaluationInput): Promise<EvaluationDTO> {
    const updateFields = cleanObject(input);

    const evaluation = await this.repository.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!evaluation) {
      throw new HttpNotFound('Evaluation not found');
    }

    const populatedQuestion = await evaluation.populate([
      {
        path: 'createdBy',
        select: this.userSelect,
      },
      {
        path: 'questions',
        select: this.questionSelect,
      },
      {
        path: 'employeesToEvaluate',
        select: this.employeeSelect,
      },
    ]);

    return toEvaluationDTO(populatedQuestion);
  }

  async disable(id: string): Promise<EvaluationDTO> {
    const state = EvaluationState.INACTIVE;
    const evaluation = await this.repository.findByIdAndUpdate(
      id,
      { state },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!evaluation) {
      throw new HttpNotFound('Evaluation not found');
    }

    const populatedQuestion = await evaluation.populate([
      {
        path: 'createdBy',
        select: this.userSelect,
      },
      {
        path: 'questions',
        select: this.questionSelect,
      },
      {
        path: 'employeesToEvaluate',
        select: this.employeeSelect,
      },
    ]);

    return toEvaluationDTO(populatedQuestion);
  }

  async addQuestions(id: string, input: OptionEvaluationInput): Promise<EvaluationOptionsDTO> {
    const evaluation = await this.repository.findByIdAndUpdate(
      id,
      { $addToSet: { questions: { $each: input.questions } } },
      { new: true },
    );

    if (!evaluation) {
      throw new HttpNotFound('Evaluation not found');
    }

    const populatedEvaluation = await evaluation.populate([
      {
        path: 'questions',
        select: this.questionSelect,
      },
    ]);

    return toEvaluationOptionsEvaluationDTO(populatedEvaluation);
  }

  async removeQuestions(id: string, input: OptionEvaluationInput): Promise<EvaluationOptionsDTO> {
    const evaluation = await this.repository.findByIdAndUpdate(
      id,
      { $pull: { questions: { $in: input.questions } } },
      { new: true },
    );

    if (!evaluation) {
      throw new HttpNotFound('Evaluation not found');
    }

    const populatedEvaluation = await evaluation.populate([
      {
        path: 'questions',
        select: this.questionSelect,
      },
    ]);

    return toEvaluationOptionsEvaluationDTO(populatedEvaluation);
  }
}
