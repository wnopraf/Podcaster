import { PODCAST_LIST_URL } from "@/config/site";
import { Cache, cacheApiFetcher } from "@/lib/cache";
import { CacheLS } from "@/lib/local-storage-cache";

const podcastsCache =
  import.meta.env.VITE_MEMCACHE === "1"
    ? new Cache<Podcaster.PodCastApi>()
    : new CacheLS<Podcaster.PodCastApi>();
podcastsCache.setCache("podcastList", PODCAST_LIST_URL);
export async function getPodcasts() {
  const data = await cacheApiFetcher("podcastList", podcastsCache);

  return data?.feed.entry;
}
