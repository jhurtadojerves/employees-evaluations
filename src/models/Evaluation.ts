import mongoose, { Document, Schema, Types } from 'mongoose';

export enum EvaluationState {
  ACTIVE = 1,
  INACTIVE = 0,
}

export interface IEvaluation extends Document {
  period: number;
  state: EvaluationState;
  type: string;
  title: string;
  description: string;
  questions?: Types.ObjectId[];
  createdBy: Types.ObjectId;
  employeesToEvaluate?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EvaluationSchema: Schema = new Schema(
  {
    period: { type: Number, required: true },
    state: {
      type: Number,
      enum: EvaluationState,
      default: EvaluationState.ACTIVE,
      required: true,
    },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Types.ObjectId, ref: 'User', required: true },
    employeesToEvaluate: [{ type: Types.ObjectId, ref: 'Employee' }],
    questions: [{ type: Types.ObjectId, ref: 'Question' }],
  },
  { timestamps: true },
);

export default mongoose.model<IEvaluation>('Evaluation', EvaluationSchema);
