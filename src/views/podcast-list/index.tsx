import React, { Dispatch, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import { PodCast } from "../../types";

import { PodcastItem } from "./podcast-item-view";
import { useSearch } from "./hooks/search-util";

import { getPodcasts } from "./podcasts";

export async function podcastsLoader() {
  const data = await getPodcasts();
  return data;
}
export function PodcastList() {
  /* const { data, error, isLoading } = useFetch<PodCastApi>(
  "podcasList",
  import.meta.env.VITE_PODCASTS
 ); */
  const data = useLoaderData();
  const { filteredPodcasts, setSearch } = useSearch(data as PodCast[]);

  const renderedPodcast = filteredPodcasts?.length
    ? filteredPodcasts
    : (data as PodCast[]);
  return (
    <div>
      <PodcastSearch
        setState={setSearch}
        filterResults={renderedPodcast?.length}
      />
      {/* auto-rows-[150px] to keep item height controled */}
      <div className=" mt-[5rem] p-7 grid grid-cols-4 gap-y-48 gap-x-8 ">
        {renderedPodcast?.map((elm) => {
          return (
            <PodcastItem
              title={elm["im:name"].label}
              author={elm["im:artist"].label}
              imgUrl={elm["im:image"][0].label}
              podcastId={elm.id.attributes["im:id"]}
            />
          );
        })}
      </div>
    </div>
  );
}

const PodcastSearch: React.FunctionComponent<{
  setState: Dispatch<string>;
  filterResults?: number;
}> = ({ setState, filterResults }) => {
  const [value, setValue] = useState<string>();
  useEffect(() => {
    setState(value as string);
  }, [value]);
  return (
    <div className=" h-9 flex items-center justify-end mt-5">
      <span className="mr-4 px-1 bg-blue-300 rounded-sm text-white text-sm font-bold">
        {filterResults}
      </span>
      <input
        className=" w-60 h-full border rounded-sm border-light-500 focus:outline-blue-300 indent-2"
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder="Filter podcasts..."
      />
    </div>
  );
};
