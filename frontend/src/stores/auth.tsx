import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '../libs/axiosAuth';
import axiosBearer from '../libs/axiosAuthBearer';

export type User = {
  id: number;
  email: string;
  rut: string;
  p_nombre: string;
  s_nombre: string;
  p_apellido: string;
  s_apellido: string;
  telefono: string | null;
  rol: string;
};

type State = {
  accessToken: string;
  refreshToken: string;
  userData: User | string;
  isAuthenticated: boolean;
};

type Actions = {
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  setUserData: (data: User) => void;
  setIsisAuthenticated: (value: boolean) => void;
  logout: () => void;
  getUserData: () => Promise<User | null>;
  checkTokens: (nav?: () => Promise<void>) => Promise<void> | Promise<boolean>;
};

const initialState: State = {
  accessToken: '',
  refreshToken: '',
  userData: '',
  isAuthenticated: false,
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,
      setAccessToken: (token: string) => set(() => ({ accessToken: token })),
      setUserData: (data: User) => set(() => ({ userData: data })),
      setRefreshToken: (token: string) => set(() => ({ refreshToken: token })),
      setIsisAuthenticated: (value: boolean) =>
        set(() => ({ isAuthenticated: value })),
      logout: () => set(initialState),
      getUserData: async () => {
        if (get().refreshToken && get().accessToken && get().isAuthenticated) {
          try {
            const res = await axiosBearer.get('/user/');
            set(() => ({ userData: res.data }));
            console.log('AA');
            return res.data;
          } catch {
            return get().logout();
          }
        }
        return get().logout();
      },
      checkTokens: async (nav?: () => Promise<void>) => {
        if (!get().accessToken) {
          get().logout();
          if (typeof nav !== 'undefined') {
            nav();
          }
          return;
        }
        try {
          await axios.post('/auth/token/verify/', { token: get().accessToken });
        } catch (err) {
          try {
            const res = await axios.post('/auth/token/refresh/', {
              refresh: get().refreshToken,
            });
            set(() => ({ accessToken: res.data.access }));
          } catch (errr) {
            get().logout();
          }
        }
      },
    }),
    { name: 'auth' }
  )
);
