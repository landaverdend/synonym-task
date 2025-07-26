'use client';

import { callAPI } from '@/lib/actions';
import { db, saveUsers } from '@/lib/db';
import { User } from '@/lib/definitions';
import { useAppStore } from '@/state/appStore';
import ErrorWidget from '@/ui/ErrorWidget';
import UserTable from '@/ui/UserList';
import { useEffect, useState } from 'react';
import { useUserPagination } from '../hooks/useUserPagination';

export default function UsersPage() {
  const { isLoading, setIsLoading, globalError } = useAppStore();
  const { currentPageUsers, fetchAndSaveData } = useUserPagination();

  useEffect(() => {
    fetchAndSaveData();
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col gap-4 w-full items-center mt-30">
        <h1 className="font-bold text-4xl">Random User Fetcher V1</h1>
        {globalError && <ErrorWidget />}
      </div>
      <UserTable users={currentPageUsers} />
    </div>
  );
}
