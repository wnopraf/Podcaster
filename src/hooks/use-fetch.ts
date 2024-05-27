import { Dispatch, useEffect, useState } from "react";

let cache: unknown = null;
let cacheTimeStamp = 0;
interface CacheResponse<T> {
 isLoading: boolean;
 data: T | null;
 error: null | typeof Error;
}
export function useFetch<CacheData>(url: string, deltaCacheReval: number = 24) {
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
     const data = (await fetch(url).then((data) => data.json())) as CacheData;
     setApiResult((state) => ({ ...state, data, isLoading: false }));

     cache = data;
     cacheTimeStamp = Date.now();
    } catch (e) {
     const error = e as typeof Error;
     setApiResult((state) => ({ ...state, isLoading: false, error }));
    }
   } else {
    setApiResult((state) => ({ ...state, data: cache as CacheData }));
   }
  }
 }, []);
 return apiResult;
}
