import { Request, Response } from 'express';
import SettingsModel, { ISettings } from '../models/Settings';

export const getSettings = async (): Promise<ISettings | null> => {
  return await SettingsModel.findOne().exec();
};

export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  const { theme, notifications } = req.body;

  try {
    const updatedSettings = await SettingsModel.findOneAndUpdate(
      {},
      { theme, notifications },
      { new: true, upsert: true }
    ).exec();

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update settings.' });
  }
};