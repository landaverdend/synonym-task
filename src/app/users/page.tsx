'use client';

import { useAppStore } from '@/state/appStore';
import ErrorWidget from '@/ui/ErrorWidget';
import UserTable from '@/ui/UserList';
import { useEffect, useMemo } from 'react';
import { useUserApi } from '../hooks/useUserApi';
import { UserCache } from '@/lib/db';
import Button from '@/ui/Button';
import ListControls from '@/ui/ListControls';
import { useSearchStore } from '@/state/searchStore';

const userCache = UserCache.getInstance();

export default function UsersPage() {
  const { setIsLoading, setGlobalError, globalError, offlineMode, setOfflineMode, setPageNumber, pageNumber, setUsers } =
    useAppStore();
  const { sortBy } = useSearchStore();
  const { fetchAndSaveData } = useUserApi();

  useEffect(() => {
    fetchAndSaveData();
  }, [pageNumber]);

  const handleClearCache = () => {
    userCache.clearCache();
    setPageNumber(0);
    setUsers([]);
  };

  const handleSetOfflineMode = () => {
    setOfflineMode(!offlineMode);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(async (searchTerm: string) => {
        setIsLoading(true);
        try {
          const users = await userCache.searchUsers(searchTerm, sortBy);
          setUsers(users);
        } catch (err) {
          setGlobalError(err instanceof Error ? err.message : 'Error searching users');
        } finally {
          setIsLoading(false);
        }
      }, 500),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="font-sans flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-full items-center justify-center mt-30">
        <h1 className="font-bold text-4xl text-center">Random User Fetcher V2</h1>

        <div className="flex flex-row gap-4">
          <Button onClick={handleClearCache}>Clear Cache</Button>
          <Button onClick={handleSetOfflineMode}>Set Offline Mode</Button>
        </div>
        <ListControls />

        <div className="h-6">{offlineMode && <p className="text-red-500">Offline Mode. </p>}</div>
        {globalError && <ErrorWidget />}

        <input type="text" placeholder="Search" className="border border-gray-300 rounded-md p-2" onChange={handleSearch} />
      </div>
      <UserTable />
    </div>
  );
}

// Debounce function to limit the rate of function calls
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
