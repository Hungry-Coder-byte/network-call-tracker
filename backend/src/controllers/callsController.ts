import { Request, Response } from 'express';
import Call from '../models/Calls';

// Fetch all network calls
export const getAllCalls = async (): Promise<any[]> => {
  return await Call.find();
};

// Fetch a specific network call by ID
export const getCallById = async (id: string): Promise<any | null> => {
  return await Call.findById(id);
};

// Create a new network call
export const createCall = async (req: Request, res: Response): Promise<void> => {
  const { payload, response } = req.body;

  try {
    const newCall = new Call({ payload, response });
    await newCall.save();
    res.status(201).json(newCall);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create network call.' });
  }
};

// Update an existing network call
export const updateCall = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { payload, response } = req.body;

  try {
    const updatedCall = await Call.findByIdAndUpdate(id, { payload, response }, { new: true });
    if (!updatedCall) {
      res.status(404).json({ message: 'Network call not found.' });
      return;
    }
    res.status(200).json(updatedCall);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update network call.' });
  }
};

// Delete a network call
export const deleteCall = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedCall = await Call.findByIdAndDelete(id);
    if (!deletedCall) {
      res.status(404).json({ message: 'Network call not found.' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete network call.' });
  }
};