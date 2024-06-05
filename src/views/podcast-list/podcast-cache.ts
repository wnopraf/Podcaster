import { Cache, cacheApiFetcher } from "@/lib/cache";

const podcastsCache = new Cache<Podcaster.PodCastApi>();
export async function getPodcasts() {
  podcastsCache.setCache("podcastList", import.meta.env.VITE_PODCASTS);
  const data = await cacheApiFetcher("podcastList", podcastsCache);

  return data?.feed.entry;
}
