import { Router } from 'express';
import { z } from 'zod';
import { getSettings, updateSettings } from '../controllers/settingsController';

const router = Router();

// Schema for validating settings data
const settingsSchema = z.object({
  theme: z.enum(['light', 'dark']),
  notifications: z.boolean(),
});

// Route to fetch user settings
router.get('/', async (req, res) => {
  try {
    const settings = await getSettings();
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch settings.' });
  }
});

// Route to update user settings
router.patch('/', async (req, res) => {
  try {
    const validatedData = settingsSchema.parse(req.body);
    const updatedSettings = await updateSettings(validatedData);
    res.status(200).json(updatedSettings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json({ message: 'Failed to update settings.' });
  }
});

export default router;