import { useState } from "react";

let cache: unknown = null;
let cacheTimeStamp = 0;
export async function useFetch<CacheData>(
  url: string,
  deltaCacheReval: number = 24
) {
  const [isLoading, setIsloading] = useState(false);

  const deltaCacheRevalToMs = deltaCacheReval * 60 * 60 * 1000;
  const deltaCacheDiff = Date.now() - cacheTimeStamp;
  const isRevalidated = deltaCacheDiff > deltaCacheRevalToMs;
  if (isRevalidated) {
    try {
      setIsloading(true);
      const data = await fetch(url).then((data) => data.json());
      setIsloading(false);
      cache = data;
      cacheTimeStamp = Date.now();
      return {
        data,
        isLoading,
      };
    } catch (error) {
      return {
        error,
      };
    }
  } else {
    return {
      data: cache as CacheData,
      isLoading,
      error: null,
    };
  }
}
