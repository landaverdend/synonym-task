'use client';

import { callAPI } from '@/lib/api';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    callAPI({ page: 1, results: 10 })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="font-sans flex flex-col items-center justify-center h-screen">
      <div> Hello World!</div>
    </div>
  );
}
