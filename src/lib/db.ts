import Dexie, { type EntityTable } from 'dexie';
import { CachedUser, User } from './definitions';

const MAX_CACHED_USERS = 1000;

type UserCacheDB = Dexie & {
  users: EntityTable<CachedUser, 'login'>;
};
// Singleton wrapper for user cache/db actions
export class UserCache {
  private db: UserCacheDB;
  private maxCachedUsers: number = MAX_CACHED_USERS;

  private static _instance: UserCache;

  private constructor() {
    this.db = new Dexie('UserDatabase') as Dexie & {
      users: EntityTable<CachedUser, 'login'>;
    };

    this.db.version(1).stores({
      users: 'login.uuid, email, name.first, name.last, location.country, nat, lastAccessed',
    });
  }

  public static getInstance() {
    if (!UserCache._instance) {
      UserCache._instance = new UserCache();
    }

    return UserCache._instance;
  }

  public async saveUsers(users: User[]) {
    try {
      const count = await this.db.users.count();

      if (count > MAX_CACHED_USERS) {
        await this.evictOldestUsers(users.length);
      }

      const cachedUsers = users.map((user) => ({
        ...user,
        lastAccessed: new Date(),
      }));

      await this.db.users.bulkPut(cachedUsers);
    } catch (error) {
      console.error('Error saving users: ', error);
      throw error;
    }
  }

  public async getUsers(pageNumber: number, pageSize: number) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const users = await this.db.users.orderBy('lastAccessed').offset(startIndex).limit(pageSize).toArray();

    return users;
  }

  private async evictOldestUsers(numToEvict: number) {
    console.log(`Evicting ${numToEvict} oldest users`);
    await this.db.users.orderBy('lastAccessed').limit(numToEvict).delete();
  }

  public async clearCache() {
    await this.db.users.clear();
  }
}
