import { Link, useLoaderData } from "react-router-dom";

import { millsToMinuteFormat } from "./util";

export function EpisodeList() {
  const data = useLoaderData() as Podcaster.PodcastDetail;

  return (
    <>
      <header className="shadow shadow-gray-400">
        <h1 className=" p-2 text-2xl font-semibold">
          Episodes: &nbsp;{data.resultCount}
        </h1>
      </header>
      <div className="px-4 pb-4 shadow shadow-gray-500">
        <table className=" mt-10 w-full p-1  ">
          <thead className=" hidden grid-cols-1 justify-items-center gap-x-2 px-2 pb-2 pt-8 sm:grid sm:grid-cols-[65%,1fr,1fr] sm:justify-items-start ">
            <th className=" text-left">Title</th>
            <th className="  text-left">Date</th>
            <th className="  text-left">Duration</th>
          </thead>
          <tbody>
            {data.results
              .filter((elm) => elm.kind === "podcast-episode")
              .map((elm) => {
                return (
                  /* auto-rows-[50px] */
                  <tr
                    key={elm.trackId}
                    className=" grid grid-cols-1 items-center justify-items-center gap-x-2 border-y-2 border-gray-200 px-2 py-1 even:bg-gray-100 sm:grid-cols-[65%,1fr,1fr] sm:justify-items-start  "
                  >
                    <td className=" line-clamp-2 flex gap-x-3 w-full justify-between  text-blue-500 md:flex-none  ">
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
                    <td className="line-clamp-2 flex w-full justify-between gap-x-4 text-gray-600 md:flex-none  md:gap-x-0">
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
