import { CreateQuestionInput, UpdateQuestionInput } from '#types/question.type';
import { ListInput, ListResponse, ListResponseSchema } from '#types/common.type';
import { toQuestionDTO, toQuestionListDTO } from '#mappers/question.mapper';

import { BaseService } from './index.service';
import { HttpNotFound } from '#utils/HttpError';
import Question from '#models/Question';
import { QuestionDTO } from '#dtos/question.dto';
import { cleanObject } from '#utils/cleanObject';
import { getRequestContext } from '#utils/getRequest';

export class QuestionService implements BaseService {
  private userSelect = 'email role createdAt updatedAt';

  constructor(private readonly repository: typeof Question) {}

  async create(input: CreateQuestionInput): Promise<QuestionDTO> {
    const req = getRequestContext();
    const createdBy = (req as unknown as Request & { userId?: string }).userId;
    const { text, type, options } = input;

    const question = new this.repository({ text, type, options, createdBy });
    await question.save();

    const populatedQuestion = await question.populate({
      path: 'createdBy',
      select: this.userSelect,
    });
    return toQuestionDTO(populatedQuestion);
  }

  async list(input: ListInput): Promise<ListResponse> {
    const { limit, offset } = input;
    const [data, total] = await Promise.all([
      this.repository.find().skip(offset).limit(limit).populate({
        path: 'createdBy',
        select: this.userSelect,
      }),
      this.repository.countDocuments(),
    ]);
    const cleanedData = ListResponseSchema.parse({
      total,
      data: toQuestionListDTO(data),
      limit,
      offset,
      count: data.length,
    });

    return cleanedData;
  }

  async update(id: string, input: UpdateQuestionInput) {
    const updateFields = cleanObject(input);

    const question = await this.repository.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      throw new HttpNotFound('Question not found');
    }

    const populatedQuestion = await question.populate({
      path: 'createdBy',
      select: this.userSelect,
    });

    return toQuestionDTO(populatedQuestion);
  }
}
