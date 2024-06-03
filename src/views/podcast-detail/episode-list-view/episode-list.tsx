import { useLoaderData, Link, LoaderFunctionArgs } from "react-router-dom";
import { Cache, cacheApiFetcher } from "../../../lib/cache";
import { IPodcastDetail } from "../../../types";

const makeUrlDetailPodcast = (id: string) => {
  const rootUrl = `https://itunes.apple.com/lookup?id=${id}&media=podcast
       &entity=podcastEpisode&limit=20`;
  return rootUrl;
};

const podCastDetailCache = new Cache<IPodcastDetail>();
export async function getEpisodes({ params }: LoaderFunctionArgs<"podCastId">) {
  const podcastUrl = makeUrlDetailPodcast(params.podcastId as string);
  const data = await cacheApiFetcher<IPodcastDetail>(
    podCastDetailCache,
    podcastUrl
  );
  return data;
}
export function EpisodeList() {
  const data = useLoaderData() as IPodcastDetail;

  return (
    <>
      <header className="shadow shadow-gray-400">
        <h1 className=" p-2 text-2xl font-semibold">
          Episodes: &nbsp;{data.resultCount}
        </h1>
      </header>
      <div className="px-4 pb-4 shadow shadow-gray-500">
        <table className=" w-full mt-10 p-1  ">
          <thead className=" hidden sm:grid grid-cols-1 justify-items-center gap-x-2 pt-8 pb-2 sm:grid-cols-[70%,2fr,1fr] sm:justify-items-start ">
            <th className=" pl-3 text-left">Title</th>
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
                    className=" grid grid-cols-1 justify-items-center gap-x-2 py-1 items-center even:bg-gray-100 border-t-2 border-b-2 border-gray-200 sm:grid-cols-[70%,2fr,1fr] sm:gap-x-0 sm:justify-items-start  "
                  >
                    <td className=" w-full flex gap-x-4 px-2 justify-between text-blue-500  line-clamp-2 md:flex-none md:pl-3 md:gap-x-0">
                      <span className="  text-black font-semibold capitalize sm:hidden">
                        title
                      </span>
                      {
                        <Link
                          className=" text-right line-clamp-2 sm:text-left"
                          to={`episode/${elm.trackId}`}
                          title={elm.trackName}
                        >
                          {elm.trackName}
                        </Link>
                      }
                    </td>
                    <td className="w-full flex gap-x-4 px-2 justify-between text-gray-600 line-clamp-2 md:flex-none md:pl-3 md:gap-x-0">
                      <span className=" font-semibold capitalize sm:hidden">
                        date
                      </span>{" "}
                      {new Date(elm.releaseDate).toLocaleDateString()}
                    </td>
                    <td className="w-full flex gap-x-4 px-2 justify-between text-gray-600 line-clamp-2 md:flex-none md:pl-3 md:gap-x-0">
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

const millsToMinuteFormat = (mills: number) => {
  if (!mills) return "00:00";

  let seconds: number | undefined = mills / 1000;
  let minutes: number | undefined;
  let hours: number | undefined;

  if (seconds > 60) {
    minutes = Math.trunc(seconds / 60);
    seconds = seconds % 60;
    if (minutes > 60) {
      hours = Math.trunc(minutes / 60);
      return `${toDecimal(hours)}:${toDecimal(minutes)}:${toDecimal(seconds)}`;
    }
    return `${toDecimal(minutes)}:${toDecimal(seconds)}`;
  } else {
    return `0:${toDecimal(Math.trunc(seconds))}`;
  }
  function toDecimal(time: number): string {
    if (time < 10) {
      return "0" + time;
    }
    return time.toString();
  }
};
