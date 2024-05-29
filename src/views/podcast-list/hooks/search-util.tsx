import { useState } from "react";
import { PodCast } from "../../../types";

export function useSearch(podcasts: PodCast[] | null) {
  const [search, setSearch] = useState<string>();

  const filteredPodcasts = podcasts
    ?.map((elm) => {
      elm["im:name"].label = elm["im:name"].label.toLowerCase();
      elm["im:artist"].label = elm["im:artist"].label.toLowerCase();
      return elm;
    })
    .filter((elm) => {
      return (
        elm["im:name"].label.includes(search?.toLocaleLowerCase() as string) ||
        elm["im:artist"].label.includes(search?.toLocaleLowerCase() as string)
      );
    });
  return {
    setSearch,
    filteredPodcasts,
  };
}
