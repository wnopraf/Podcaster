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
    <div>
      <header className="shadow shadow-gray-400">
        <h1 className=" p-2 text-2xl font-semibold">
          Episodes: &nbsp;{data.resultCount}
        </h1>
      </header>
      <table className="mt-10 ">
        <thead>
          <th className=" w-4/5 text-left">Title</th>
          <th className=" w-1/5 text-left">Date</th>
          <th className=" w-1/5 text-left">Duration</th>
        </thead>
        {data.results.map((elm) => {
          return (
            <tr className="h-10 even:bg-gray-100 border-t-2 border-b-2 border-gray-300">
              <td className="text-blue-500 pl-3">
                {
                  <Link to={href + "/episode/" + elm.trackId}>
                    {elm.trackName}
                  </Link>
                }
              </td>
              <td>{new Date(elm.releaseDate).toLocaleDateString()}</td>
              <td>{millsToMinuteFormat(elm.trackTimeMillis)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

const millsToMinuteFormat = (mills: number) => {
  if (!mills) return "00:00";
  const minutes = Math.trunc(mills / 1000 / 60);
  const secs = (mills / 1000) % 60;
  const isSecTenDivisible = secs % 10 === 0;
  return `${minutes}:${secs}${isSecTenDivisible ? 0 : ""}`;
};
