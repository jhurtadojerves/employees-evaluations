import mongoose, { Document, Schema, Types } from 'mongoose';

import { IUser } from './User';

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  position: string;
  salary: number;
  user: Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    user: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
  },
  { timestamps: true },
);

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
