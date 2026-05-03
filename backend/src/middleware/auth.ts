import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const authSchema = z.object({
  authorization: z.string().startsWith('Bearer '),
});

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  try {
    authSchema.parse({ authorization: authHeader });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader!.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  });
};