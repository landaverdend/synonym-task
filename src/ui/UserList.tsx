'use client';

import { User } from '@/lib/definitions';
import { useAppStore } from '@/state/appStore';
import { Spinner } from './Spinner';
import Button from './Button';
import { UserCache } from '@/lib/db';

type UserTableProps = {};
export default function UserTable({}: UserTableProps) {
  const { isLoading, users } = useAppStore();

  return (
    <div className="flex flex-col gap-4 w-full items-center overflow-y-auto">
      <div className="flex flex-col gap-4 w-3/6 rounded-md">
        {isLoading ? (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <Spinner />
          </div>
        ) : (
          users.map((user) => <UserCard key={user.login.uuid} user={user} />)
        )}
      </div>
    </div>
  );
}

const cache = UserCache.getInstance();
function UserCard({ user }: { user: User }) {
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
    <div className="flex flex-row  gap-10 border border-gray-300 rounded-md p-4">
      <img src={user.picture.thumbnail} alt={user.name.first} />
      <span>{user.name.first}</span>
      <span>{user.name.last}</span>
      <span>{user.email}</span>
      <span>{user.location.country}</span>
      <span>{user.nat}</span>

      <Button onClick={() => toggleFavorite(user)} className={`${isFavorited ? 'bg-red-500' : 'bg-green-500'}`}>
        {isFavorited ? 'Unfavorite' : 'Favorite'}
      </Button>
    </div>
  );
}
