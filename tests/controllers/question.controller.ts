/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { NextFunction, Request, Response } from 'express';

import QuestionController from '#controllers/question.controller';
import { QuestionService } from '#services/question.service';
import { QuestionType } from '#types/question.type';
import { UserRole } from '#models/User';

describe('QuestionController', () => {
  const mockService = {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<QuestionService>;

  const controller = new QuestionController(mockService);

  const mockRes = () =>
    ({
      json: jest.fn(),
    }) as unknown as Response;

  const next = jest.fn() as NextFunction;

  it('should list questions', async () => {
    const req = { query: { limit: '10', offset: '0' } } as unknown as Request;
    const res = mockRes();

    const responseMock = {
      data: [],
      limit: 10,
      offset: 0,
      total: 0,
      count: 0,
    };

    mockService.list.mockResolvedValue(responseMock);

    await controller.list(req, res, next);

    expect(mockService.list).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ count: 0 }));
  });

  it('should create a question', async () => {
    const question = {
      _id: 'q123',
      text: '¿Qué opinas?',
      type: QuestionType.TEXT,
      createdBy: {
        _id: 'u123',
        email: 'test@example.com',
        role: UserRole.EMPLOYEE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const req = {
      body: {
        text: question.text,
        type: question.type,
      },
      user: {
        _id: question.createdBy._id,
      },
    } as unknown as Request;

    const res = mockRes();

    mockService.create.mockResolvedValue(question);

    await controller.create(req, res, next);

    expect(mockService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        text: question.text,
        type: question.type,
      }),
    );

    expect(res.json).toHaveBeenCalledWith(question);
  });

  it('should update a question', async () => {
    const req = {
      params: { id: 'q123' },
      body: { text: '¿Nuevo texto?' },
    } as unknown as Request;

    const res = mockRes();
    const updated = { ...req.body, _id: 'q123' };

    mockService.update.mockResolvedValue(updated);

    await controller.update(req, res, next);

    expect(mockService.update).toHaveBeenCalledWith('q123', { text: '¿Nuevo texto?' });
    expect(res.json).toHaveBeenCalledWith(updated);
  });
});
