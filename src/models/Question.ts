import mongoose, { Document, Schema, Types } from 'mongoose';

import { QuestionType } from '#types/question.type';

export interface IQuestion extends Document {
  _id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId;
}

const QuestionSchema: Schema = new Schema(
  {
    text: { type: String, required: true },
    type: {
      type: String,
      enum: QuestionType,
      default: QuestionType.TEXT,
      required: true,
    },
    options: [{ type: String, required: true }],
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IQuestion>('Question', QuestionSchema);
