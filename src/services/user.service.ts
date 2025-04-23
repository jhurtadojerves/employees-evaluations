import { HttpBadRequest, HttpNotFound } from '#utils/HttpError';
import User, { IUser } from '#models/User';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface loginInput {
  email: string;
  password: string;
}

export interface registerInput extends loginInput {
  name: string;
}

interface loginResponse {
  user: IUser;
  token: string;
}

export class UserService {
  constructor(
    private readonly repository: typeof User,
    private readonly jwtSecret: string,
  ) {}

  async findUserByEmail(email: string): Promise<IUser | null> {
    return this.repository
      .findOne({ email })
      .select('name email role createdAt updatedAt -_id')
      .lean();
  }

  async login(input: loginInput): Promise<loginResponse> {
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
      expiresIn: '1h',
    });

    return { token, user };
  }

  async register(input: registerInput): Promise<IUser> {
    const { email, password, name } = input;
    const existingUser = await this.findUserByEmail(email);

    if (existingUser) {
      throw new HttpBadRequest('Email already registered');
    }

    const hashedPassword = await this.getHashedPassword(password);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const publicUser = await this.findUserByEmail(email);

    if (!publicUser) {
      throw new HttpNotFound('User not found');
    }

    return publicUser;
  }

  async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
