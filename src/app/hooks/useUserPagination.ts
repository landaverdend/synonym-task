import { callAPI } from '@/lib/actions';
import { saveUsers } from '@/lib/db';
import { User } from '@/lib/definitions';
import { useAppStore } from '@/state/appStore';
import { useEffect, useState } from 'react';

export const useUserPagination = () => {
  const { pageNumber, setIsLoading, setGlobalError } = useAppStore();
  const [currentPageUsers, setCurrentPageUsers] = useState<User[]>([]);

  // This could maybe go somewhere else
  const fetchAndSaveData = async () => {
    setIsLoading(true);

    try {
      const data = await callAPI({ page: 1, results: 10 });
      saveUsers(data.results);
      setCurrentPageUsers(data.results);
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSaveData();
  }, [pageNumber]); // Re-run when pageNumber changes

  return { currentPageUsers, fetchAndSaveData };
};
