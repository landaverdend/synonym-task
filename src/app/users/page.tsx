'use client';

import { callAPI } from '@/lib/actions';
import { db } from '@/lib/db';
import { useAppStore } from '@/state/appStore';
import { useEffect } from 'react';

export default function UsersPage() {
  const { isLoading, setIsLoading } = useAppStore();

  useEffect(() => {
    setIsLoading(true);

    const fetchAndSaveData = async () => {
      setIsLoading(true);

      try {
        const data = await callAPI({ page: 1, results: 10 });
        console.log(data);
        db.users.bulkPut(data.results);

        const users = await db.users.toArray();
        console.log('the users saved: ', users);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndSaveData();
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center h-screen">
      {isLoading && <div>Loading...</div>}
      {!isLoading && <span>Not loading...</span>}
    </div>
  );
}
