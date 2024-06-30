import React from "react";
import { useLoaderData } from "react-router-dom";

import { PodcastItem } from "./components/podcast-item";
import { PodcastSearch } from "./components/podcast-search";
import { useSearch } from "./hooks/use-search";

export function PodcastList() {
  const data = useLoaderData() as Podcaster.PodCast[];
  return <PodcastSearchData data={data} />;
}

export function PodcastSearchData({ data }: { data: Podcaster.PodCast[] }) {
  const { filteredPodcasts, setSearch } = useSearch(data);

  return (
    <div className="mx-auto min-h-[75vh]  lg:max-w-full">
      <PodcastSearch
        setSearch={setSearch}
        filterResults={filteredPodcasts?.current.length}
      />
      {/* auto-rows-[150px] to keep item height controled */}
      {filteredPodcasts.current.length === 0 && (
        <p
          id="no-podcasts"
          className=" h-vh mt-20 text-center text-4xl font-medium capitalize text-gray-400 sm:text-5xl lg:text-6xl "
        >
          no podcasts found
        </p>
      )}
      <div
        id="podcast-list"
        className=" mt-[30vw] grid grid-cols-1 gap-y-[40vw] *:h-max sm:gap-x-16 sm:mt-[15vw] sm:grid-cols-2 sm:justify-items-stretch sm:gap-y-[20vw] lg:gap-x-8 lg:mt-[8vw] lg:grid-cols-4 lg:gap-y-[12vw] xl:mt-20 xl:gap-y-40  "
      >
        {/* <div className=" mt-[8rem] p-7 flex flex-wrap *:w-1/5 gap-x-[1rem] gap-y-[5rem] justify-evenly *:h-max"> */}
        {filteredPodcasts?.current.map((elm) => {
          return (
            <PodcastItem
              title={elm["im:name"].label}
              author={elm["im:artist"].label}
              imgUrl={elm["im:image"][2].label}
              podcastId={elm.id.attributes["im:id"]}
              key={elm.id.attributes["im:id"]}
            />
          );
        })}
      </div>
    </div>
  );
}
