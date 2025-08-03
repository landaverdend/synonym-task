import { SortBy } from '@/lib/definitions';
import { create } from 'zustand';

type SearchState = {
  sortBy: SortBy | null;
  setSortBy: (sortBy: SortBy | null) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  sortBy: null,
  setSortBy: (sortBy) => set({ sortBy }),
}));
