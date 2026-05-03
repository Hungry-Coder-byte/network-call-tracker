import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  theme: 'light' | 'dark';
  notifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema({
  theme: {
    type: String,
    enum: ['light', 'dark'],
    required: true,
  },
  notifications: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

const SettingsModel = mongoose.model<ISettings>('Settings', SettingsSchema);

export default SettingsModel;