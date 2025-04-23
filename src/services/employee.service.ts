import Employee, { IEmployee } from '#models/Employee';

import { HttpNotFound } from '#utils/HttpError';
import { ListResponseInput } from '#controllers/index.controller';
import User from '#models/User';

interface listInput {
  limit: number;
  offset: number;
}

interface Employees {
  data: IEmployee[];
  total: number;
}

export interface CreateEmployee {
  name: string;
  position: string;
  salary: number;
  email: string;
}

export interface UpdateEmployee {
  id: string;
  name?: string;
  position?: string;
  salary?: number;
}

export class EmployeService {
  constructor(
    private readonly repository: typeof Employee,
    private readonly userRepository: typeof User,
  ) {}

  private async getPaginated(input: listInput): Promise<Employees> {
    const { limit, offset } = input;

    const [data, total] = await Promise.all([
      Employee.find().skip(offset).limit(limit).populate({
        path: 'user',
        select: 'name email role createdAt updatedAt -_id',
      }),
      Employee.countDocuments(),
    ]);

    return { data, total };
  }

  private async getEmploy(id: string): Promise<IEmployee | null> {
    return this.repository.findById(id).populate({
      path: 'user',
      select: 'name email role createdAt updatedAt',
    });
  }

  async list(input: listInput): Promise<ListResponseInput> {
    const { limit, offset } = input;
    const results = await this.getPaginated(input);
    const { total, data } = results;

    return {
      total,
      data,
      limit,
      offset,
    } as ListResponseInput;
  }

  async get(id: string): Promise<IEmployee> {
    const employee = await this.getEmploy(id);

    if (!employee) {
      throw new HttpNotFound('Employee with this id not found');
    }

    return employee;
  }

  async create(input: CreateEmployee): Promise<IEmployee> {
    const { name, position, salary, email } = input;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpNotFound(`User with email ${email} not found`);
    }
    const employee = new this.repository({ name, position, salary, user: user._id });
    await employee.save();

    return employee.populate({
      path: 'user',
      select: 'name email role createdAt updatedAt -_id',
    });
  }

  async update(input: UpdateEmployee) {
    const { id, name, position, salary } = input;
    const updateFields: Partial<Omit<UpdateEmployee, 'id'>> = {};
    if (name != null) updateFields.name = name;
    if (position != null) updateFields.position = position;
    if (salary != null) updateFields.salary = salary;

    const employee = await this.repository.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!employee) {
      throw new HttpNotFound('Employee not found');
    }

    return employee.populate({
      path: 'user',
      select: 'name email role createdAt updatedAt -_id',
    });
  }
}
