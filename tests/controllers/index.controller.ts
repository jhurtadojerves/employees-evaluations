import { NextFunction, Request, Response } from 'express';
import { ZodSchema, z } from 'zod';

import { BaseController } from '#controllers/index.controller';
import { BaseService } from '#services/index.service';
import { HttpNotImplemented } from '#utils/HttpError';

describe('BaseController - NotImplemented paths', () => {
  class DummyService implements Partial<BaseService> {}

  class DummyController extends BaseController {
    protected UpdateInputSchema: ZodSchema = z.object({});
    protected CreateInputSchema: ZodSchema = z.object({});
    constructor() {
      super(new DummyService());
    }
  }

  const controller = new DummyController();
  const req = {
    params: { id: 'fake-id' },
    body: {},
    query: {},
  } as unknown as Request;

  const res = {
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn() as NextFunction;

  it('should throw HttpNotImplemented for update', async () => {
    await controller.update(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(HttpNotImplemented));
  });

  it('should throw HttpNotImplemented for list', async () => {
    await controller.list(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(HttpNotImplemented));
  });

  it('should throw HttpNotImplemented for get', async () => {
    await controller.get(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(HttpNotImplemented));
  });

  it('should throw HttpNotImplemented for create', async () => {
    await controller.create(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(HttpNotImplemented));
  });
});
