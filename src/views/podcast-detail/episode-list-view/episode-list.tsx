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
          <thead className=" hidden sm:grid grid-cols-1 justify-items-center gap-x-2 pt-8 pb-2 sm:grid-cols-[70%,1fr,1fr] sm:justify-items-start ">
            <th className=" pl-3 text-left">Title</th>
            <th className="  text-left">Date</th>
            <th className="  text-left">Duration</th>
          </thead>
          <tbody>
            {data.results.map((elm) => {
              return (
                /* auto-rows-[50px] */
                <tr
                  key={elm.trackId}
                  className=" grid grid-cols-1 justify-items-center gap-x-2 py-1 items-center even:bg-gray-100 border-t-2 border-b-2 border-gray-200 sm:grid-cols-[70%,1fr,1fr] sm:gap-x-0 sm:justify-items-start  "
                >
                  <td className=" w-full flex gap-x-4 px-2 justify-between text-blue-500  line-clamp-2 md:flex-none md:pl-3 md:gap-x-0">
                    <span className="  text-black font-semibold capitalize sm:hidden">
                      title
                    </span>
                    {<Link to={`episode/${elm.trackId}`}>{elm.trackName}</Link>}
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
  const minutes = Math.trunc(mills / 1000 / 60);
  const secs = minutes > 0 ? (mills / 1000) % 60 : Math.trunc(mills / 1000);

  return `${minutes}:${
    secs.toString().length < 2 ? secs.toString() + 0 : secs
  }`;
};
