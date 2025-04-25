/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextFunction, Request, Response } from 'express';

import { BaseService } from '#services/index.service';
import { Document } from 'mongoose';
import { HttpNotImplemented } from '#utils/HttpError';
import { ListInputSchema } from '#types/common.type';
import { StatusCodes } from 'http-status-codes';
import { ZodSchema } from 'zod';

export interface HttpErrorInput {
  statusCode?: StatusCodes;
  message: string;
  next: NextFunction;
}

export interface ObjectCreatedInput {
  data: Record<string, any> | Document;
  res: Response;
}

export abstract class BaseController {
  constructor(protected service: BaseService) {}
  protected abstract UpdateInputSchema: ZodSchema;
  protected abstract CreateInputSchema: ZodSchema;
  protected ListInputSchema = ListInputSchema;

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (this.service.update) {
        const { id } = req.params;
        const input = this.UpdateInputSchema.parse(req.body);
        const response = await this.service.update(id, input);
        res.json(response);
      } else {
        throw new HttpNotImplemented();
      }
    } catch (error: unknown) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (this.service.list) {
        const input = this.ListInputSchema.parse(req.query);
        const response = await this.service.list(input);
        res.json(response);
      } else {
        throw new HttpNotImplemented();
      }
    } catch (error: unknown) {
      next(error);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (this.service.get) {
        const { id } = req.params;
        const response = await this.service.get(id);
        res.json(response);
      } else {
        throw new HttpNotImplemented();
      }
    } catch (error: unknown) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (this.service.create) {
        const input = this.CreateInputSchema.parse(req.body);
        const response = await this.service.create(input);
        res.json(response);
      } else {
        throw new HttpNotImplemented();
      }
    } catch (error: unknown) {
      next(error);
    }
  };
}
