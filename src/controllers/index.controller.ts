import { NextFunction, Response } from 'express';

import { Document } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

export interface HttpErrorInput {
  statusCode?: StatusCodes;
  message: string;
  next: NextFunction;
}

export interface ObjectCreatedInput {
  data: Record<string, any> | Document;
  res: Response;
}

export interface ListResponseInput {
  total: number;
  limit: number;
  offset: number;
  data: Record<string, any>[] | Document[];
}

export abstract class BaseController {
  protected handleList(input: ListResponseInput, res: Response) {
    const { data } = input;
    res.status(StatusCodes.OK).json({
      ...input,
      count: data.length,
    });
  }
}
