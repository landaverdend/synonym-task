`use client`;
import { APIResponse, callAPI } from '@/lib/actions';
import { UserCache } from '@/lib/db';
import { User } from '@/lib/definitions';
import { useAppStore } from '@/state/appStore';

const cache = UserCache.getInstance();
const DEFAULT_PAGE_SIZE = 10;

export const useUserApi = () => {
  const { pageNumber, setIsLoading, setGlobalError, offlineMode, setUsers, setOfflineMode } = useAppStore();

  const fetchAndSaveData = async () => {
    setIsLoading(true);

    try {
      let users: User[] = [];

      const pageEndIndex = pageNumber * DEFAULT_PAGE_SIZE + DEFAULT_PAGE_SIZE;
      const cacheSize = await cache.getCacheSize();

      // Criteria for using the cache:
      // 1. If there is cache data already saved in dexie, then grab that.

      const shouldFetchFromCache = pageEndIndex <= cacheSize || offlineMode;
      if (shouldFetchFromCache) {
        users = await fetchFromCache();
      } else {
        users = await fetchFromAPI();
      }

      setUsers(users);
    } catch (error) {
      setGlobalError(error instanceof Error ? error.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFromAPI = async () => {
    const maxRetries = 3;
    const baseDelay = 1000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const data = await callAPI({ page: pageNumber, results: DEFAULT_PAGE_SIZE });
        cache.saveUsers(data.results);
        return data.results;
      } catch (error) {
        // If this is the last attempt, re-throw the error
        if (attempt === maxRetries) {
          setOfflineMode(true);
          throw error;
        }

        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Log retry attempt for debugging
        console.warn(`API call failed, retrying in ${Math.round(delay)}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
      }
    }

    throw new Error('Reached max retries');
  };
  const fetchFromCache = async () => {
    const users = await cache.getUsers(pageNumber, DEFAULT_PAGE_SIZE);
    return users;
  };

  return { fetchAndSaveData };
};
