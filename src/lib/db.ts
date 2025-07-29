import Dexie, { type EntityTable } from 'dexie';
import { User } from './definitions';

const MAX_CACHED_USERS = 1000;

type UserCacheDB = Dexie & {
  users: EntityTable<User, 'login'>;
};
// Singleton wrapper for user cache/db actions
export class UserCache {
  private db: UserCacheDB;

  private static _instance: UserCache;

  private constructor() {
    this.db = new Dexie('UserDatabase') as Dexie & {
      users: EntityTable<User, 'login'>;
    };

    this.db.version(1).stores({
      users: 'login.uuid, email, name.first, name.last, location.country, nat, fetchTime, isFavorited',
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
        fetchTime: new Date(),
        isFavorited: false,
      }));

      await this.db.users.bulkPut(cachedUsers);
    } catch (error) {
      console.error('Error saving users: ', error);
      throw error;
    }
  }

  public async getUsers(pageNumber: number, pageSize: number) {
    const startIndex = pageNumber * pageSize;

    const users = await this.db.users.orderBy('fetchTime').offset(startIndex).limit(pageSize).toArray();

    return users;
  }

  public async getFavoritedUsers() {
    const users = await this.db.users.where('isFavorited').equals('true').toArray();

    return users;
  }

  public async toggleFavorited(uuid: string) {
    await this.db.users
      .where('login.uuid')
      .equals(uuid)
      .modify((user) => {
        user.isFavorited = !user.isFavorited;
      });
  }

  private async evictOldestUsers(numToEvict: number) {
    console.log(`Evicting ${numToEvict} oldest users`);
    await this.db.users.orderBy('fetchTime').limit(numToEvict).delete();
  }

  public async clearCache() {
    await this.db.users.clear();
  }

  public getCacheSize() {
    return this.db.users.count();
  }
}
