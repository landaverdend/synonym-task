'use client';

import { useAppStore } from '@/state/appStore';
import Button from './Button';

export default function ListControls() {
  const { pageNumber, setPageNumber } = useAppStore();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 0) {
      return;
    }

    setPageNumber(pageNumber);
  };

  return (
    <div className="flex flex-row gap-4 items-center justify-center">
      <Button onClick={() => handlePageChange(pageNumber - 1)}>Previous</Button>
      <span>Current Page: {pageNumber + 1}</span>
      <Button onClick={() => handlePageChange(pageNumber + 1)}>Next</Button>
    </div>
  );
}
