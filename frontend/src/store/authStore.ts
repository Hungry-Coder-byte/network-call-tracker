import create from 'zustand';
import axios from 'axios';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { email: string } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await axios.post('/api/login', { email, password });
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          set({ user, token, loading: false });
        } catch (error) {
          set({ loading: false, error: error.response?.data?.message || 'Login failed' });
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // unique name for the storage
    }
  )
);

export default useAuthStore;