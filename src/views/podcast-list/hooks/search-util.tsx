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

  filteredPodcasts.current = podcasts?.map((elm) => {
    elm["im:name"].label = elm["im:name"].label.toLowerCase();
    elm["im:artist"].label = elm["im:artist"].label.toLowerCase();
    return elm;
  });
  if (filteredPodcasts.current !== undefined) {
    const filterdByAuthor = filteredPodcasts.current.filter((elm) => {
      return elm["im:artist"].label.includes(search?.toLowerCase() as string);
    });
    const filteredByName = filteredPodcasts?.current.filter((elm) => {
      if (filterdByAuthor?.includes(elm)) {
        return false;
      }
      return elm["im:name"].label.includes(search?.toLowerCase() as string);
    });
    filteredPodcasts.current = [
      ...(filteredByName as Podcaster.PodCast[]),
      ...(filterdByAuthor as Podcaster.PodCast[]),
    ];
  }
  return {
    setSearch,
    filteredPodcasts,
  };
}
