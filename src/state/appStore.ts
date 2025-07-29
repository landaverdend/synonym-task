import { User } from '@/lib/definitions';
import { create } from 'zustand';

type AppState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  globalError: string | null;
  setGlobalError: (globalError: string | null) => void;

  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;

  offlineMode: boolean;
  setOfflineMode: (offlineMode: boolean) => void;

  users: User[];
  setUsers: (users: User[]) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  globalError: null,
  setGlobalError: (globalError) => set({ globalError }),

  pageNumber: 0,
  setPageNumber: (pageNumber) => set({ pageNumber }),

  offlineMode: false,
  setOfflineMode: (offlineMode) => set({ offlineMode }),

  users: [],
  setUsers: (users) => set({ users }),
}));
