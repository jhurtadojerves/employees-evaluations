import { HttpBadRequest, HttpNotFound } from '#utils/HttpError';
import { ListInput, ListResponse, ListResponseSchema } from '#types/common.type';
import User, { IUser, UserRole } from '#models/User';
import { toUserDTO, toUserListDTO } from '#mappers/user.mapper';

import { BaseService } from './index.service';
import { UserDTO } from '#dtos/user.dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface authInput {
  email: string;
  password: string;
}

interface loginResponse {
  user: UserDTO;
  token: string;
}
export interface userUpdateRequest {
  role: UserRole;
}

export interface userUpdateInput extends userUpdateRequest {
  id: string;
}

export class UserService implements BaseService {
  constructor(
    private readonly repository: typeof User,
    private readonly jwtSecret: string,
    private readonly jwtDuration: string,
  ) {}

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.repository.findOne({ email }).select('email role createdAt updatedAt').lean();
  }

  async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async login(input: authInput): Promise<loginResponse> {
    const { email, password } = input;

    const user = await this.repository.findOne({ email });

    if (!user) {
      throw new HttpNotFound('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new HttpBadRequest('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, this.jwtSecret, {
      expiresIn: this.jwtDuration as jwt.SignOptions['expiresIn'],
    });

    const cleanUser = toUserDTO(user);
    return { token, user: cleanUser };
  }

  async register(input: authInput): Promise<UserDTO> {
    const { email, password } = input;
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new HttpBadRequest('Email already registered');
    }

    const hashedPassword = await this.getHashedPassword(password);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return toUserDTO(user);
  }

  async update(id: string, input: userUpdateRequest): Promise<UserDTO> {
    const { role } = input;
    const user = await this.repository.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
        runValidators: true,
        select: 'email role createdAt updatedAt',
      },
    );

    if (!user) {
      throw new HttpNotFound('User not found');
    }

    return toUserDTO(user);
  }

  async list(input: ListInput): Promise<ListResponse> {
    const { limit, offset } = input;
    const [data, total] = await Promise.all([
      this.repository.find().skip(offset).limit(limit),
      this.repository.countDocuments(),
    ]);
    const cleanedData = ListResponseSchema.parse({
      total,
      data: toUserListDTO(data),
      limit,
      offset,
      count: data.length,
    });

    return cleanedData;
  }
}
