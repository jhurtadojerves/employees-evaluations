import { CreateEmployeeInput, UpdateEmployeeInput } from '#types/employee.type';
import { ListInput, ListResponse, ListResponseSchema } from '#types/common.type';
import { toEmployeeDTO, toEmployeeListDTO } from '#mappers/employee.mapper';

import { BaseService } from './index.service';
import Employee from '#models/Employee';
import { EmployeeDTO } from '#dtos/employee.dto';
import { HttpNotFound } from '#utils/HttpError';
import User from '#models/User';
import { cleanObject } from '#utils/cleanObject';

export class EmployeeService implements BaseService<UpdateEmployeeInput, EmployeeDTO> {
  private userSelect = 'email role createdAt updatedAt';
  constructor(
    private readonly repository: typeof Employee,
    private readonly userRepository: typeof User,
  ) {}

  async list(input: ListInput): Promise<ListResponse> {
    const { limit, offset } = input;
    const [data, total] = await Promise.all([
      Employee.find().skip(offset).limit(limit).populate({
        path: 'user',
        select: this.userSelect,
      }),
      Employee.countDocuments(),
    ]);

    const cleanedData = ListResponseSchema.parse({
      total,
      data: toEmployeeListDTO(data),
      limit,
      offset,
      count: data.length,
    });
    return cleanedData;
  }

  async get(id: string): Promise<EmployeeDTO> {
    const employee = await this.repository.findById(id).populate({
      path: 'user',
      select: this.userSelect,
    });

    if (!employee) {
      throw new HttpNotFound('Employee with this id not found');
    }

    return toEmployeeDTO(employee);
  }

  async create(input: CreateEmployeeInput): Promise<EmployeeDTO> {
    const { firstName, lastName, position, salary, email } = input;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpNotFound(`User with email ${email} not found`);
    }
    const employee = new this.repository({ firstName, lastName, position, salary, user: user._id });
    await employee.save();

    const populatedEmployee = await employee.populate({
      path: 'user',
      select: this.userSelect,
    });

    return toEmployeeDTO(populatedEmployee);
  }

  async update(id: string, input: UpdateEmployeeInput) {
    const { firstName, lastName, position, salary } = input;
    const updateFields = cleanObject({ firstName, lastName, position, salary });
    const employee = await this.repository.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      throw new HttpNotFound('Employee not found');
    }

    const populatedEmployee = await employee.populate({
      path: 'user',
      select: this.userSelect,
    });

    return toEmployeeDTO(populatedEmployee);
  }
}
