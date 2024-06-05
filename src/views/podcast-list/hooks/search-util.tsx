import { useState } from "react";

export function useSearch(podcasts: Podcaster.PodCast[] | null) {
  const [search, setSearch] = useState<string>();

  let filteredPodcasts = podcasts?.map((elm) => {
    elm["im:name"].label = elm["im:name"].label.toLowerCase();
    elm["im:artist"].label = elm["im:artist"].label.toLowerCase();
    return elm;
  });
  const filterdByAuthor = filteredPodcasts?.filter((elm) => {
    return elm["im:artist"].label.includes(search?.toLowerCase() as string);
  });
  const filteredByName = filteredPodcasts?.filter((elm) => {
    if (filterdByAuthor?.includes(elm)) {
      return false;
    }
    return elm["im:name"].label.includes(search?.toLowerCase() as string);
  });
  filteredPodcasts = [
    ...(filteredByName as Podcaster.PodCast[]),
    ...(filterdByAuthor as Podcaster.PodCast[]),
  ];
  return {
    setSearch,
    filteredPodcasts,
  };
}
