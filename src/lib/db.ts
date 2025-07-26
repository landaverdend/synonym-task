import Dexie, { type EntityTable } from 'dexie';
import { User } from './definitions';

const db = new Dexie('UserDatabase') as Dexie & {
  users: EntityTable<User, 'login'>;
};

db.version(1).stores({
  users: 'login.uuid, email, name.first, name.last, location.country, nat',
});

export async function saveUsers(users: User[]) {
  try {
    await db.users.bulkPut(users);
  } catch (error) {
    console.error('Error saving users: ', error);
    throw error;
  }
}

export { db };
