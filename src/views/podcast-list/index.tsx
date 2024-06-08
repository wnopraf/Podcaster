import React from "react";
import { useLoaderData } from "react-router-dom";

import { PodcastSearch } from "./components/podcast-search";
import { useSearch } from "./hooks/search-util";
import { getPodcasts } from "./podcast-cache";
import { PodcastItem } from "./podcast-item-view";

export async function podcastsLoader() {
  const data = await getPodcasts();
  return data;
}
export function PodcastList() {
  const data = useLoaderData() as Podcaster.PodCast[];
  const { filteredPodcasts, setSearch } = useSearch(data);

  return (
    <div className="min-h-[75vh]">
      <PodcastSearch
        setSearch={setSearch}
        filterResults={filteredPodcasts?.current.length}
      />
      {/* auto-rows-[150px] to keep item height controled */}
      {filteredPodcasts.current.length === 0 && (
        <div className=" h-vh mt-12 text-center text-3xl text-gray-400 sm:text-6xl ">
          No Podcasts found
        </div>
      )}
      <div className=" mt-32 grid grid-cols-1 justify-items-center gap-x-12 gap-y-32 *:h-max sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4 ">
        {/* <div className=" mt-[8rem] p-7 flex flex-wrap *:w-1/5 gap-x-[1rem] gap-y-[5rem] justify-evenly *:h-max"> */}
        {filteredPodcasts?.current.map((elm) => {
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
