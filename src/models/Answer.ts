import { Document, Schema, Types, model } from 'mongoose';

export interface IAnswer extends Document {
  evaluation: Types.ObjectId;
  question: Types.ObjectId;
  employee: Types.ObjectId;
  answeredBy: Types.ObjectId;
  value: string | number | boolean;
}

const AnswerSchema: Schema = new Schema(
  {
    evaluation: {
      type: Types.ObjectId,
      ref: 'Evaluation',
      required: true,
    },
    question: {
      type: Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    employee: {
      type: Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    answeredBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

export default model<IAnswer>('Answer', AnswerSchema);
