interface ICache<T> {
  getItem(): T;
  setItem(data: T): void;
}

export class Cache<T> implements ICache<T> {
  private store: { data: T | null; lastSaved: number } = {
    data: null,
    lastSaved: 0,
  };
  private deltaCacheMills: number = 24 * 60 * 60 * 1000;

  setItem(data: T) {
    if (data !== null) {
      this.store = {
        data,
        lastSaved: Date.now() + this.deltaCacheMills,
      };
    }
  }
  getItem(): T {
    return this.store.data as T;
  }
  isRevalidated(): boolean {
    if (this.store.lastSaved < Date.now()) {
      return true;
    }
    return false;
  }
}

export async function cacheApiFetcher<T>(cache: Cache<T>, resoruceUrl: string) {
  if (cache.isRevalidated()) {
    try {
      const data = (await fetch(resoruceUrl).then((result) =>
        result.json()
      )) as T;
      cache.setItem(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return cache.getItem();
}
