interface ICache<T> {
  getItem(id: string): IData<T> | null;
  setItem(id: string, data: T): void;
}
interface IData<T> {
  data: T;
  lastSaved: number;
  resourceUrl: string;
  deltaCacheMillis: number;
}
export class Cache<T> implements ICache<T> {
  private store: { [id: string]: IData<T> } = {};

  setCache(
    id: string,
    resourceUrl: string,
    deltaCacheMillis: number = 24 * 60 * 60 * 1000
  ) {
    this.store[id] = {
      data: {} as T,
      resourceUrl,
      lastSaved: 0,
      deltaCacheMillis: deltaCacheMillis as number,
    };
  }

  setItem(id: string, data: T) {
    const store = this.getItem(id);
    if (store !== null) {
      this.store[id] = {
        ...store,
        data: data,
        lastSaved: Date.now() + store.deltaCacheMillis,
      };
    }
  }
  getItem(id: string): IData<T> | null {
    if (this.store[id] !== null) {
      return this.store[id];
    }
    return null;
  }
  isRevalidated(id: string): boolean {
    if (this.store[id].lastSaved < Date.now()) {
      return true;
    }
    return false;
  }
}

export async function cacheApiFetcher<T>(id: string, cache: Cache<T>) {
  // init cache

  if (cache.isRevalidated(id)) {
    const cacheobj = cache.getItem(id);
    if (cacheobj !== null) {
      const { resourceUrl } = cacheobj;
      try {
        const data = (await fetch(resourceUrl).then((result) =>
          result.json()
        )) as T;
        cache.setItem(id, data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  }
  return cache.getItem(id)?.data;
}
