`use client`;
import { callAPI } from '@/lib/actions';
import { UserCache } from '@/lib/db';
import { User } from '@/lib/definitions';
import { useAppStore } from '@/state/appStore';
import { useEffect, useState } from 'react';

const cache = UserCache.getInstance();

export const useUserPagination = () => {

  const { pageNumber, setIsLoading, setGlobalError, offlineMode } = useAppStore();
  const [currentPageUsers, setCurrentPageUsers] = useState<User[]>([]);

  const fetchFromAPI = async () => {
    const data = await callAPI({ page: pageNumber, results: 10 });
    cache.saveUsers(data.results);
    return data.results;
  };

  const fetchFromCache = async () => {
    const users = await cache.getUsers(pageNumber, 10);
    return users;
  };

  // This could maybe go somewhere else
  const fetchAndSaveData = async () => {
    setIsLoading(true);

    try {
      let users: User[] = [];

      if (offlineMode) {
        users = await fetchFromCache();
      } else {
        users = await fetchFromAPI();
      }

      setCurrentPageUsers(users);
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
