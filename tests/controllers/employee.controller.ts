import { NextFunction, Request, Response } from 'express';

import EmployeeController from '#controllers/employee.controller';
import { EmployeeService } from '#services/employee.service';
import { UserRole } from '#models/User';

describe('EmployeeController', () => {
  const mockService = {
    list: jest.fn(),
    get: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  } as unknown as jest.Mocked<EmployeeService>;

  const controller = new EmployeeController(mockService);

  it('should list employees', async () => {
    const req = { query: { limit: '10', offset: '0' } } as unknown as Request;
    const res = { json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    const mockResponse = {
      data: [],
      limit: 10,
      offset: 0,
      total: 0,
      count: 0,
    };

    mockService.list.mockResolvedValue(mockResponse);

    await controller.list(req, res, next);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockService.list).toHaveBeenCalledWith({ limit: 10, offset: 0 });
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ count: 0 }));
  });

  it('should get a single employee', async () => {
    const req = { params: { id: '123' } } as unknown as Request;
    const res = { json: jest.fn() } as unknown as Response;
    const next = jest.fn() as NextFunction;

    const employeeMock = {
      _id: 'abc123',
      firstName: 'Alice',
      lastName: 'Smith',
      position: 'Developer',
      salary: 50000,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        _id: 'user-id',
        email: 'alice@example.com',
        role: UserRole.EMPLOYEE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    mockService.get.mockResolvedValue(employeeMock);

    await controller.get(req, res, next);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockService.get).toHaveBeenCalledWith('123');
    expect(res.json).toHaveBeenCalledWith(employeeMock);
  });
});
