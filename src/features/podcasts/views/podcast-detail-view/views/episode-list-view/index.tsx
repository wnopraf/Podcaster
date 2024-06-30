import { Link, useLoaderData } from "react-router-dom";

import { millsToMinuteFormat } from "./episode-list.util";

export function EpisodeList() {
  const data = useLoaderData() as Podcaster.PodcastDetail;

  return (
    <>
      <header className="shadow shadow-gray-400">
        <h1 className=" p-3 text-2xl font-semibold">
          Episodes: &nbsp;{data.resultCount}
        </h1>
      </header>
      <div className="mt-5 px-4 pb-3  shadow shadow-gray-500">
        <table className=" w-full p-1  ">
          <thead>
            <tr className=" hidden grid-cols-1 justify-items-center gap-x-2 px-2 pb-2 pt-8 sm:grid sm:grid-cols-[70%,1fr,1fr] sm:justify-items-start ">
              <th>Title</th>
              <th>Date</th>
              <th className=" sm:justify-self-center">Duration</th>
            </tr>
          </thead>

          <tbody>
            {data.results
              .filter((elm) => elm.kind === "podcast-episode")
              .map((elm) => {
                return (
                  /* auto-rows-[50px] */
                  <tr
                    key={elm.trackId}
                    className=" grid grid-cols-1 items-center justify-items-center gap-x-2 border-y border-gray-200 px-2 py-1 even:bg-gray-100 sm:grid-cols-[70%,1fr,1fr] sm:justify-items-start  "
                  >
                    <td className="  line-clamp-2 flex w-full justify-between gap-x-3 text-blue-500  sm:w-[95%] md:flex-none  ">
                      <span className="  font-semibold capitalize text-black sm:hidden">
                        title
                      </span>
                      {
                        <Link
                          className=" line-clamp-2 text-right sm:text-left"
                          to={`episode/${elm.trackId}`}
                          title={elm.trackName}
                        >
                          {elm.trackName}
                        </Link>
                      }
                    </td>
                    <td className="line-clamp-2 flex w-full  justify-between gap-x-4 text-gray-600 md:flex-none  ">
                      <span className=" font-semibold capitalize sm:hidden">
                        date
                      </span>{" "}
                      {new Date(elm.releaseDate).toLocaleDateString()}
                    </td>
                    <td className="line-clamp-2 flex w-full justify-between  gap-x-4 text-gray-600 sm:justify-center md:flex-none  md:gap-x-0">
                      <span className=" font-semibold capitalize sm:hidden">
                        duration
                      </span>{" "}
                      {millsToMinuteFormat(elm.trackTimeMillis)}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
