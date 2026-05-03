import { Router } from 'express';
import { z } from 'zod';
import { loginUser } from '../controllers/loginController';

const router = Router();

// Schema for validating login data
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Route to handle user login
router.post('/', async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const token = await loginUser(validatedData.email, validatedData.password);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

export default router;