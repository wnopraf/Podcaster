import { useParams, useLoaderData, Link, useHref } from "react-router-dom";
import { Cache, cacheApiFetcher } from "../../../lib/cache";
import { IPodcastDetail } from "../../../types";
const makeUrlDetailPodcast = (id: string) => {
  const rootUrl = `https://itunes.apple.com/lookup?id=${id}&media=podcast
       &entity=podcastEpisode&limit=20`;
  return rootUrl;
};

const podCastDetailCache = new Cache<IPodcastDetail>();
export async function getEpisodes({ params }: { podcastId: string }) {
  const podcastUrl = makeUrlDetailPodcast(params.podcastId);
  const data = await cacheApiFetcher<IPodcastDetail>(
    podCastDetailCache,
    podcastUrl
  );
  return data;
}
export function EpisodeList() {
  const data = useLoaderData() as IPodcastDetail;
  const href = useHref("/");
  return (
    <>
      <header className="shadow shadow-gray-400">
        <h1 className=" p-2 text-2xl font-semibold">
          Episodes: &nbsp;{data.resultCount}
        </h1>
      </header>
      <div className="px-4 shadow shadow-gray-500">
        <table className=" w-full mt-10 p-1  ">
          <thead className="grid grid-cols-[70%,1fr,1fr] pt-8 pb-2">
            <th className=" pl-3 text-left">Title</th>
            <th className="  text-left">Date</th>
            <th className="  text-left">Duration</th>
          </thead>
          {data.results.map((elm) => {
            return (
              <tr className=" grid grid-cols-[70%,1fr,1fr] auto-rows-[50px] items-center even:bg-gray-100 border-t-2 border-b-2 border-gray-200">
                <td className="text-blue-500 pl-3">
                  {
                    <Link to={href + "/episode/" + elm.trackId}>
                      {elm.trackName}
                    </Link>
                  }
                </td>
                <td className="text-gray-600">
                  {new Date(elm.releaseDate).toLocaleDateString()}
                </td>
                <td className="text-gray-600">
                  {millsToMinuteFormat(elm.trackTimeMillis)}
                </td>
              </tr>
            );
          })}
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
