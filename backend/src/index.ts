import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import callsRouter from './routes/calls';
import loginRouter from './routes/login';
import settingsRouter from './routes/settings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.use('/api/calls', callsRouter);
app.use('/api/login', loginRouter);
app.use('/api/settings', settingsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Network Call Tracker API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});