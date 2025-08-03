'use client';

import { SortBy, User } from '@/lib/definitions';
import { useAppStore } from '@/state/appStore';
import { Spinner } from './Spinner';
import Button from './Button';
import { UserCache } from '@/lib/db';
import { useSearchStore } from '@/state/searchStore';

type UserTableProps = {};
export default function UserTable({}: UserTableProps) {
  const { users, isLoading } = useAppStore();
  const { sortBy, setSortBy } = useSearchStore();

  const handleSort = (sortBy: SortBy) => {
    if (sortBy === sortBy) {
      setSortBy(null);
    } else {
      setSortBy(sortBy);
    }
  };

  return (
    <table className="table-auto border-separate border-spacing-y-10 sm:w-4/5">
      <thead className="sticky top-0 bg-blue-500 text-black z-100">
        <tr>
          <UserHeader header="Image" className="text-center" />
          <UserHeader
            header="Name"
            onClick={() => {
              handleSort('name');
            }}
          />
          <UserHeader
            header="Country"
            onClick={() => {
              handleSort('country');
            }}
          />
          <UserHeader
            header="Favorite"
            onClick={() => {
              handleSort('favorite');
            }}
          />
        </tr>
      </thead>

      <tbody className="relative">
        {isLoading && (
          <tr>
            <td colSpan={5} className="text-center">
              <Spinner />
            </td>
          </tr>
        )}
        {!isLoading && users.map((user) => <UserRecord key={user.login.uuid} user={user} />)}
      </tbody>
    </table>
  );
}

function UserHeader({ header, className, onClick }: { header: string; className?: string; onClick?: () => void }) {
  return (
    <th className={`${className ?? ''} text-left p-2 cursor-pointer hover:bg-blue-200`} onClick={onClick}>
      {header}
    </th>
  );
}

const cache = UserCache.getInstance();
function UserRecord({ user }: { user: User }) {
  const isFavorited = user.isFavorited ?? false;
  const { users, setUsers } = useAppStore();

  const toggleFavorite = (user: User) => {
    try {
      cache.toggleFavorited(user.login.uuid);
    } catch (error) {
      alert('Failed to toggle favorite');
    }

    // update the reference in zustand store.
    setUsers(users.map((u) => (u.login.uuid === user.login.uuid ? { ...u, isFavorited: !isFavorited } : u)));
  };

  return (
    <tr className="z-100">
      <td className="text-center sm:text-sm md:text-base">
        <img src={user.picture.thumbnail} alt={user.name.first} className="w-10 h-10 rounded-full mx-auto" />
      </td>
      <td className="sm:text-sm md:text-base">
        {user.name.first} {user.name.last}
      </td>
      <td className="sm:text-sm md:text-base">{user.location.country}</td>
      <td className="sm:text-sm md:text-base">
        <Button onClick={() => toggleFavorite(user)} className={`${isFavorited ? 'bg-red-500' : 'bg-green-500'}`}>
          {isFavorited ? 'Unfavorite' : 'Favorite'}
        </Button>
      </td>
    </tr>
  );
}
