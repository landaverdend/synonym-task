'use client';

import { User } from '@/lib/definitions';
import { useAppStore } from '@/state/appStore';
import { Spinner } from './Spinner';

type UserTableProps = {
  users: User[];
};
export default function UserTable({ users }: UserTableProps) {
  const { pageNumber, setPageNumber, isLoading } = useAppStore();

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1) {
      return;
    }

    setPageNumber(pageNumber);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center overflow-y-auto">
      <div className="flex flex-row gap-4 items-center justify-center">
        <button
          className="border border-gray-300 rounded-md p-2 hover:cursor-pointer"
          onClick={() => handlePageChange(pageNumber - 1)}>
          Previous
        </button>
        <span>Current Page: {pageNumber}</span>
        <button
          className="border border-gray-300 rounded-md p-2 hover:cursor-pointer"
          onClick={() => handlePageChange(pageNumber + 1)}>
          Next
        </button>
      </div>

      <div className="flex flex-col gap-4 w-3/6 rounded-md">
        {isLoading ? <Spinner /> : users.map((user) => <UserCard key={user.login.uuid} user={user} />)}
      </div>
    </div>
  );
}

function PageButton({ children }: { children: React.ReactNode }) {
  const { pageNumber, setPageNumber } = useAppStore();

  return (
    <button className="border border-gray-300 rounded-md p-2" onClick={() => setPageNumber(pageNumber)}>
      {children}
    </button>
  );
}

function UserCard({ user }: { user: User }) {
  return (
    <div className="flex flex-row  gap-10 border border-gray-300 rounded-md p-4">
      <img src={user.picture.thumbnail} alt={user.name.first} />
      <span>{user.name.first}</span>
      <span>{user.name.last}</span>
      <span>{user.email}</span>
      <span>{user.location.country}</span>
      <span>{user.nat}</span>
    </div>
  );
}
