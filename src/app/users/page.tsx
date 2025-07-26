'use client';

import { callAPI } from '@/lib/actions';
import { db, saveUsers } from '@/lib/db';
import { User } from '@/lib/definitions';
import { useAppStore } from '@/state/appStore';
import UserTable from '@/ui/UserList';
import { useEffect, useState } from 'react';

export default function UsersPage() {
  const { isLoading, setIsLoading, globalError } = useAppStore();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setIsLoading(true);

    const fetchAndSaveData = async () => {
      setIsLoading(true);

      try {
        const data = await callAPI({ page: 1, results: 10 });
        saveUsers(data.results);
        setUsers(data.results);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSaveData();
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center h-screen">
      <UserTable users={users} />
    </div>
  );
}
