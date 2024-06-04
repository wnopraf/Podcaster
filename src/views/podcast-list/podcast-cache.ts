import { Cache, cacheApiFetcher } from "../../lib/cache";
import { PodCastApi } from "../../types";

const podcastsCache = new Cache<PodCastApi>();
export async function getPodcasts() {
  podcastsCache.setCache("podcastList", import.meta.env.VITE_PODCASTS);
  const data = await cacheApiFetcher("podcastList", podcastsCache);

  return data?.feed.entry;
}
