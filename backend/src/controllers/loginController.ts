import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import LoginModel, { ILogin } from '../models/Login';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const loginUser = async (email: string, password: string): Promise<string> => {
  const user: ILogin | null = await LoginModel.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};