import { EmployeeDTO, EmployeeDTOSchema } from '#dtos/employee.dto';

export const toEmployeeDTO = (employee: any): EmployeeDTO =>
  EmployeeDTOSchema.parse(employee.toObject());

export const toEmployeeListDTO = (employees: any[]): EmployeeDTO[] =>
  EmployeeDTOSchema.array().parse(employees.map((e) => e.toObject()));
