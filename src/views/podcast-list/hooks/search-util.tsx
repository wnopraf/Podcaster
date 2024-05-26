import { useState } from "react";
import { PodCast } from "../../../types";

export function useSearch(podcasts: PodCast[]) {
 const [search, setSearch] = useState<string>();
 const filteredPodcasts = podcasts.filter((elm) => {
  return (
   elm["im:name"].label.includes(search as string) ||
   elm["im:artist"].label.includes(search as string)
  );
 });
 return {
  setSearch,
  filteredPodcasts,
 };
}
