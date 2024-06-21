import { QueryClient } from "@tanstack/react-query";

import { PODCAST_LIST_URL } from "@/config/site";

export function getPodcasts(queryClient: QueryClient) {
  return async () => {
    const data = await queryClient.ensureQueryData<Podcaster.PodCastApi>({
      queryKey: ["podcastList"],
      queryFn: async () => {
        const data = await fetch(PODCAST_LIST_URL).then((data) => data.json());

        return JSON.parse(data.contents);
      },
    });
    return data?.feed.entry;
  };
}
