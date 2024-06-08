import { PODCAST_LIST_URL } from "@/config/site";
import { Cache, cacheApiFetcher } from "@/lib/cache";
import { CacheLS } from "@/lib/local-storagae-cache";

const podcastsCache = new CacheLS<Podcaster.PodCastApi>();
podcastsCache.setCache("podcastList", PODCAST_LIST_URL);
export async function getPodcasts() {
  const data = await cacheApiFetcher("podcastList", podcastsCache);

  return data?.feed.entry;
}
