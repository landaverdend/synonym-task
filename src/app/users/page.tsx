'use client';

import { useAppStore } from '@/state/appStore';
import ErrorWidget from '@/ui/ErrorWidget';
import UserTable from '@/ui/UserList';
import { useEffect } from 'react';
import { useUserApi } from '../hooks/useUserApi';
import { UserCache } from '@/lib/db';
import Button from '@/ui/Button';
import ListControls from '@/ui/ListControls';

const userCache = UserCache.getInstance();

export default function UsersPage() {
  const { globalError, offlineMode, setOfflineMode, setPageNumber, pageNumber, setUsers } = useAppStore();
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

  return (
    <div className="font-sans flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-full items-center justify-center mt-30">
        <h1 className="font-bold text-4xl text-center">Random User Fetcher V2</h1>

        <Button onClick={handleClearCache}>Clear Cache</Button>
        <Button onClick={handleSetOfflineMode}>Set Offline Mode</Button>

        <ListControls />

        <div className="h-6">{offlineMode && <p className="text-red-500">Offline Mode. </p>}</div>
        {globalError && <ErrorWidget />}
      </div>
      <UserTable />
    </div>
  );
}
