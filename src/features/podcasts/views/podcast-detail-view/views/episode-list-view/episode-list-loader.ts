import { Params } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";

import {
  PODCAST_DETAIL_QUERY_PARAMS_URL,
  PODCAST_DETAIL_ROOT_URL,
} from "@/config/site";

const makeUrlDetailPodcast = (id: string) => {
  return (
    PODCAST_DETAIL_ROOT_URL +
    encodeURIComponent(id) +
    PODCAST_DETAIL_QUERY_PARAMS_URL
  );
};

export function getEpisodes(queryClient: QueryClient) {
  return async ({ params }: { params: Params<"podcastId"> }) => {
    if (!params.podcastId) return;
    const podcastUrl = makeUrlDetailPodcast(params.podcastId);

    const data = await queryClient.ensureQueryData<Podcaster.PodcastDetail>({
      queryKey: ["PodcastDetail", params.podcastId],
      queryFn: async () => {
        const data = await fetch(podcastUrl).then((res) => res.json());
        return JSON.parse(data.contents);
      },
    });
    return data;
  };
}
