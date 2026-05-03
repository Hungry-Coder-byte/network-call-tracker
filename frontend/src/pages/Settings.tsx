import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark']),
  notifications: z.boolean(),
});

interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('/api/settings');
        const validatedSettings = settingsSchema.parse(response.data);
        setSettings(validatedSettings);
      } catch (err) {
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      await axios.patch('/api/settings', settings);
      alert('Settings updated successfully');
    } catch (err) {
      setError('Failed to update settings');
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Settings</h1>
      <form onSubmit={handleUpdateSettings} className="space-y-4">
        <div>
          <label className="block mb-2">Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value as 'light' | 'dark' })}
            className="border rounded p-2 w-full"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
              className="mr-2"
            />
            Enable Notifications
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded p-2 w-full">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;