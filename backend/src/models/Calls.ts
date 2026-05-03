import mongoose, { Document, Schema } from 'mongoose';

export interface ICall extends Document {
  payload: string;
  response: string;
  createdAt: Date;
  updatedAt: Date;
}

const CallSchema: Schema<ICall> = new Schema(
  {
    payload: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CallModel = mongoose.model<ICall>('Call', CallSchema);

export default CallModel;