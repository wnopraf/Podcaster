import { useEffect, useState } from "react";

interface CacheStore {
  store: Cache;
  getCache(key: string): Cache["key"];
  setCache(key: string, cache: unknown): void;
}
type Cache = {
  [key: string]: unknown;
};
const cacheStore: CacheStore = {
  store: {},
  getCache(key: string) {
    return this.store[key];
  },
  setCache<T>(key: string, cache: T) {
    this.store[key] = cache;
  },
};
let cacheTimeStamp = 0;
interface CacheResponse<T> {
  isLoading: boolean;
  data: T | null;
  error: null | typeof Error;
}
export function useFetch<CacheData>(
  id: string,
  url: string,
  deltaCacheReval: number = 24
) {
  const [apiResult, setApiResult] = useState<CacheResponse<CacheData>>({
    isLoading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    fetchApi();
    async function fetchApi() {
      const deltaCacheRevalToMs = deltaCacheReval * 60 * 60 * 1000;
      const deltaCacheDiff = Date.now() - cacheTimeStamp;
      const isRevalidated = deltaCacheDiff > deltaCacheRevalToMs;

      if (isRevalidated) {
        try {
          const data = (await fetch(url).then((data) =>
            data.json()
          )) as CacheData;
          setApiResult((state) => ({ ...state, data, isLoading: false }));

          cacheStore.setCache(id, data);
          cacheTimeStamp = Date.now();
        } catch (e) {
          const error = e as typeof Error;
          setApiResult((state) => ({ ...state, isLoading: false, error }));
        }
      } else {
        const cache = cacheStore.getCache(id);
        setApiResult((state) => ({ ...state, data: cache as CacheData }));
      }
    }
  }, [id, url, deltaCacheReval]);
  return apiResult;
}
