import { CreateEmployee, EmployeService, UpdateEmployee } from '#services/employee.service';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from '#controllers/index.controller';

export default class EmployeeController extends BaseController {
  constructor(private service: EmployeService) {
    super();
  }
  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const result = await this.service.list({ limit, offset });
      this.handleList(result, res);
    } catch (error) {
      next(error);
    }
  };
  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const employee = await this.service.get(id);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  };
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, position, salary, email } = req.body as CreateEmployee;
      const employee = await this.service.create({ name, position, salary, email });

      res.json(employee);
    } catch (error) {
      next(error);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, position, salary } = req.body as UpdateEmployee;

      const employee = await this.service.update({ id, name, position, salary });

      res.json(employee);
    } catch (error) {
      next(error);
    }
  };
}
