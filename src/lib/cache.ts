export interface ICache<T> {
  setCache(id: string, resourceUrl: string, deltaCacheMillis: number): void;
  getItem(id: string): IData<T> | null;
  setItem(id: string, data: T): void;
  isRevalidated(id: string): boolean;
  setLastSaved?(id: string, millis: number): void;
}
export interface IData<T> {
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
    if (this.getItem(id) !== null) return;
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
  setLastSaved(id: string, millis: number): void {
    const store = this.getItem(id);
    if (store !== null) {
      this.store[id].lastSaved = millis;
    }
  }
  getItem(id: string): IData<T> | null {
    if (this.store[id] !== undefined) {
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

export async function cacheApiFetcher<T>(
  id: string,
  cache: ICache<T>
): Promise<T | undefined> {
  // init cache

  if (cache.isRevalidated(id)) {
    const cacheobj = cache.getItem(id);
    if (cacheobj !== null) {
      const { resourceUrl } = cacheobj;
      try {
        const data = (await fetch(resourceUrl).then((result) =>
          result.json()
        )) as { contents: string };
        const jsonData = JSON.parse(data.contents) as T;
        cache.setItem(id, jsonData);
        return jsonData;
      } catch (error) {
        console.log(error);
      }
    }
  }
  const cacheItem = cache.getItem(id);
  if (cacheItem !== null) {
    return cacheItem.data;
  } else {
    // deliberated guard against localstorage removal
    // todo reset cache lifecycle
    location.reload();
  }
}
