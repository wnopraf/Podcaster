import { Params } from "react-router-dom";

import {
  PODCAST_DETAIL_QUERY_PARAMS_URL,
  PODCAST_DETAIL_ROOT_URL,
} from "@/config/site";
import { cacheApiFetcher } from "@/lib/cache";
import { CacheLS } from "@/lib/local-storagae-cache";

const podCastDetailCache = new CacheLS<Podcaster.PodcastDetail>();
const makeUrlDetailPodcast = (id: string) => {
  return (
    PODCAST_DETAIL_ROOT_URL +
    encodeURIComponent(id) +
    PODCAST_DETAIL_QUERY_PARAMS_URL
  );
};

export async function getEpisodes({ params }: { params: Params<"podcastId"> }) {
  if (!params.podcastId) return;
  const podcastUrl = makeUrlDetailPodcast(params.podcastId);
  podCastDetailCache.setCache(params.podcastId, podcastUrl);
  const data = await cacheApiFetcher<Podcaster.PodcastDetail>(
    params.podcastId,
    podCastDetailCache
  );
  return data;
}
