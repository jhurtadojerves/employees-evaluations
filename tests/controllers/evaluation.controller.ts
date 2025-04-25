/* eslint-disable @typescript-eslint/unbound-method */
import { NextFunction, Request, Response } from 'express';

import EvaluationController from '#controllers/evaluation.controller';
import { EvaluationService } from '#services/evaluation.service';
import { EvaluationState } from '#models/Evaluation';
import { UserRole } from '#models/User';

describe('EvaluationController', () => {
  const mockService = {
    disable: jest.fn(),
    addQuestions: jest.fn(),
    removeQuestions: jest.fn(),
  } as unknown as jest.Mocked<EvaluationService>;

  const controller = new EvaluationController(mockService);

  const mockRes = (): Response => ({ json: jest.fn() }) as unknown as Response;

  const mockNext = jest.fn() as NextFunction;

  it('should disable evaluation', async () => {
    const req = { params: { id: 'e123' } } as unknown as Request;
    const res = mockRes();
    const result = {
      _id: 'e123',
      period: 2024,
      type: 'performance',
      title: 'Mid-Year Review',
      description: 'Evaluation description',
      state: EvaluationState.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        _id: 'u123',
        email: 'admin@example.com',
        role: UserRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      employeesToEvaluate: [],
      questions: [],
    };

    mockService.disable.mockResolvedValue(result);

    await controller.disable(req, res, mockNext);

    expect(mockService.disable).toHaveBeenCalledWith('e123');
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('should add questions to evaluation', async () => {
    const req = {
      params: { id: 'e123' },
      body: { questions: ['q1', 'q2'] },
    } as unknown as Request;
    const res = mockRes();
    const result = {
      _id: 'e123',
      period: 2024,
      type: 'performance',
      title: 'Evaluación Anual',
      description: 'Evaluación de desempeño',
      state: EvaluationState.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        _id: 'u1',
        email: 'admin@example.com',
        role: UserRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      employeesToEvaluate: [],
      questions: [],
    };

    mockService.addQuestions.mockResolvedValue(result);

    await controller.addQuestions(req, res, mockNext);

    expect(mockService.addQuestions).toHaveBeenCalledWith('e123', { questions: ['q1', 'q2'] });
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('should remove questions from evaluation', async () => {
    const req = {
      params: { id: 'e123' },
      body: { questions: ['q1'] },
    } as unknown as Request;
    const res = mockRes();
    const result = {
      _id: 'e123',
      period: 2024,
      type: 'performance',
      title: 'Evaluación Anual',
      description: 'Evaluación de desempeño',
      state: EvaluationState.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        _id: 'u1',
        email: 'admin@example.com',
        role: UserRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      employeesToEvaluate: [],
      questions: [],
    };

    mockService.removeQuestions.mockResolvedValue(result);

    await controller.removeQuestions(req, res, mockNext);

    expect(mockService.removeQuestions).toHaveBeenCalledWith('e123', { questions: ['q1'] });
    expect(res.json).toHaveBeenCalledWith(result);
  });
});
