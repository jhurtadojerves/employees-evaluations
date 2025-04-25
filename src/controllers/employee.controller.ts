import { CreateEmployeeInputSchema, UpdateEmployeeInputSchema } from '#types/employee.type';

import { BaseController } from '#controllers/index.controller';
import { EmployeeService } from '#services/employee.service';

export default class EmployeeController extends BaseController {
  constructor(protected service: EmployeeService) {
    super(service);
  }
  protected UpdateInputSchema = UpdateEmployeeInputSchema;
  protected CreateInputSchema = CreateEmployeeInputSchema;
}
