import { useRef, useState } from "react";

export function useSearch(podcasts: Podcaster.PodCast[] | []) {
  const [search, setSearch] = useState<string>();
  const filteredPodcasts = useRef(podcasts);
  if (typeof search === "undefined" || search.length === 0) {
    filteredPodcasts.current = podcasts;
    return {
      setSearch,
      filteredPodcasts,
    };
  }

  if (filteredPodcasts.current !== undefined) {
    filteredPodcasts.current = filterCriteria(search, podcasts);
  }
  return {
    setSearch,
    filteredPodcasts,
  };
}

export function filterCriteria(
  criteria: string,
  podcasts: Podcaster.PodCast[]
) {
  const podcastsToUpperCase = podcasts.map((elm) => {
    elm["im:name"].label = elm["im:name"].label.toLowerCase();
    elm["im:artist"].label = elm["im:artist"].label.toLowerCase();
    return elm;
  });
  const authorFilter = podcastsToUpperCase.filter((elm) => {
    return elm["im:artist"].label.includes(criteria.toLowerCase());
  });
  const podcastNameFilter = podcastsToUpperCase.filter((elm) => {
    if (authorFilter.includes(elm)) {
      return false;
    }
    return elm["im:name"].label.includes(criteria.toLowerCase());
  });
  return [...podcastNameFilter, ...authorFilter];
}
