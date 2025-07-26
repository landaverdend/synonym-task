import { create } from 'zustand';

type AppState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  globalError: string | null;
  setGlobalError: (globalError: string | null) => void;

  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),

  globalError: null,
  setGlobalError: (globalError) => set({ globalError }),

  pageNumber: 1,
  setPageNumber: (pageNumber) => set({ pageNumber }),
}));
