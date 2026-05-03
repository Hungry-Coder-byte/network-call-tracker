import mongoose, { Document, Schema } from 'mongoose';

export interface ILogin extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const LoginSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const LoginModel = mongoose.model<ILogin>('Login', LoginSchema);

export default LoginModel;