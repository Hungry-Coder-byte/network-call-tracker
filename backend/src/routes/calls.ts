import { Router } from 'express';
import { z } from 'zod';
import { getAllCalls, getCallById, createCall, updateCall, deleteCall } from '../controllers/callsController';

const router = Router();

// Schema for validating call data
const callSchema = z.object({
  id: z.string().optional(),
  payload: z.string().nonempty(),
  response: z.string().nonempty(),
});

// Route to fetch all network calls
router.get('/', async (req, res) => {
  try {
    const calls = await getAllCalls();
    res.status(200).json(calls);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch network calls.' });
  }
});

// Route to fetch a specific network call by ID
router.get('/:id', async (req, res) => {
  const result = callSchema.safeParse({ id: req.params.id });
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid ID format.' });
  }

  try {
    const call = await getCallById(req.params.id);
    if (!call) {
      return res.status(404).json({ message: 'Call not found.' });
    }
    res.status(200).json(call);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch call details.' });
  }
});

// Route to create a new network call
router.post('/', async (req, res) => {
  const result = callSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid call data.' });
  }

  try {
    const newCall = await createCall(result.data);
    res.status(201).json(newCall);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create call.' });
  }
});

// Route to update an existing network call
router.patch('/:id', async (req, res) => {
  const result = callSchema.safeParse({ ...req.body, id: req.params.id });
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid call data.' });
  }

  try {
    const updatedCall = await updateCall(result.data);
    if (!updatedCall) {
      return res.status(404).json({ message: 'Call not found.' });
    }
    res.status(200).json(updatedCall);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update call.' });
  }
});

// Route to delete a network call
router.delete('/:id', async (req, res) => {
  const result = callSchema.safeParse({ id: req.params.id });
  if (!result.success) {
    return res.status(400).json({ message: 'Invalid ID format.' });
  }

  try {
    const deletedCall = await deleteCall(req.params.id);
    if (!deletedCall) {
      return res.status(404).json({ message: 'Call not found.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete call.' });
  }
});

export default router;