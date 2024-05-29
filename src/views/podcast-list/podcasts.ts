import { Cache, cacheApiFetcher } from "../../lib/cache";
import { PodCastApi } from "../../types";

const podcastsCache = new Cache<PodCastApi>();
export async function getPodcasts() {
 const data = await cacheApiFetcher(
  podcastsCache,
  import.meta.env.VITE_PODCASTS
 );
 return data.feed.entry;
}
