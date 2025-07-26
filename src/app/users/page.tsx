'use client';

import { useAppStore } from '@/state/appStore';
import ErrorWidget from '@/ui/ErrorWidget';
import UserTable from '@/ui/UserList';
import { useEffect } from 'react';
import { useUserPagination } from '../hooks/useUserPagination';
import { UserCache } from '@/lib/db';
import Button from '@/ui/Button';
import ListControls from '@/ui/ListControls';

export default function UsersPage() {
  const { globalError, offlineMode, setOfflineMode } = useAppStore();
  const { currentPageUsers, fetchAndSaveData } = useUserPagination();

  useEffect(() => {
    fetchAndSaveData();
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col gap-4 w-full items-center mt-30">
        <h1 className="font-bold text-4xl">Random User Fetcher V1</h1>
        <Button onClick={() => UserCache.getInstance().clearCache()}>Clear Cache</Button>
        <Button onClick={() => setOfflineMode(!offlineMode)}>Set Offline Mode</Button>

        <ListControls />

        {offlineMode && <p className="text-red-500">Offline Mode</p>}
        {globalError && <ErrorWidget />}
      </div>
      <UserTable users={currentPageUsers} />
    </div>
  );
}
