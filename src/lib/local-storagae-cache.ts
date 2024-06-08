import { ICache, IData } from "./cache";

export class CacheLS<T> implements ICache<T> {
  setCache(
    id: string,
    resourceUrl: string,
    deltaCacheMillis: number = 24 * 60 * 60 * 1000
  ) {
    const storeItem = this.getItem(id);
    if (storeItem !== null) {
      return;
    }
    localStorage.setItem(
      id,
      JSON.stringify({
        data: {},
        lastSaved: 0,
        resourceUrl,
        deltaCacheMillis,
      })
    );
  }

  getItem(id: string): IData<T> | null {
    const storeItem = localStorage.getItem(id);
    if (storeItem !== null) {
      return JSON.parse(storeItem);
    }
    return null;
  }
  setItem(id: string, data: T): void {
    let storeItem = this.getItem(id);
    if (storeItem !== null) {
      storeItem = {
        ...storeItem,
        data: data,
        lastSaved: Date.now() + storeItem.deltaCacheMillis,
      };
    }
    localStorage.setItem(id, JSON.stringify(storeItem));
  }
  isRevalidated(id: string): boolean {
    const storeItem = this.getItem(id);
    if (storeItem !== null && storeItem.lastSaved < Date.now()) {
      return true;
    }
    return false;
  }
}
