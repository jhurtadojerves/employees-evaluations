/* eslint-disable @typescript-eslint/unbound-method */
import { NextFunction, Request, Response } from 'express';

import UserController from '#controllers/user.controller';
import { UserRole } from '#models/User';
import { UserService } from '#services/user.service';

describe('UserController', () => {
  const mockService = {
    update: jest.fn(),
  } as unknown as jest.Mocked<UserService>;

  const controller = new UserController(mockService);

  const mockRes = () =>
    ({
      json: jest.fn(),
    }) as unknown as Response;

  const next = jest.fn() as NextFunction;

  it('should update a user', async () => {
    const req = {
      params: { id: 'u123' },
      body: { role: UserRole.ADMIN },
    } as unknown as Request;

    const res = mockRes();

    const updated = {
      _id: 'u123',
      email: 'admin@example.com',
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockService.update.mockResolvedValue(updated);

    await controller.update(req, res, next);

    expect(mockService.update).toHaveBeenCalledWith('u123', req.body);
    expect(res.json).toHaveBeenCalledWith(updated);
  });
});
