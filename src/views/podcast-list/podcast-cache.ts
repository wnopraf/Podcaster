import { PODCAST_LIST_URL } from "@/config/site";
import { Cache, cacheApiFetcher } from "@/lib/cache";

const podcastsCache = new Cache<Podcaster.PodCastApi>();
export async function getPodcasts() {
  podcastsCache.setCache("podcastList", PODCAST_LIST_URL);
  const data = await cacheApiFetcher("podcastList", podcastsCache);

  return data?.feed.entry;
}
