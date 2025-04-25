import { BaseController } from './index.controller';
import { Request } from 'express';
import { UpdateUserInputSchema } from '#types/user.type';
import { UserService } from '#services/user.service';
import { z } from 'zod';

export type TypedRequest<P, B> = Request<P, any, B>;
export interface UpdateUserParams {
  id: string;
}

export default class UserController extends BaseController {
  constructor(protected service: UserService) {
    super(service);
  }
  protected UpdateInputSchema = UpdateUserInputSchema;
  protected CreateInputSchema = z.object({});
}
