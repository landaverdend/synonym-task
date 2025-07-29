'use client';

import { useAppStore } from '@/state/appStore';

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
      <button
        className="border border-gray-300 rounded-md p-2 hover:cursor-pointer"
        onClick={() => handlePageChange(pageNumber - 1)}>
        Previous
      </button>
      <span>Current Page: {pageNumber + 1}</span>
      <button
        className="border border-gray-300 rounded-md p-2 hover:cursor-pointer"
        onClick={() => handlePageChange(pageNumber + 1)}>
        Next
      </button>
    </div>
  );
}
