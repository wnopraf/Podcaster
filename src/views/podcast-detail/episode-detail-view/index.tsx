import { useLoaderData, useParams } from "react-router-dom";
import { IPodcastDetail } from "../../../types";

export function EpisodeDetail() {
  const { episodeId } = useParams();
  const data = useLoaderData() as IPodcastDetail;
  const episode = data.results.find((elm) => {
    return elm.trackId.toString() === episodeId;
  });

  return (
    <div className=" p-5 shadow shadow-gray-500">
      <div>
        <h1 className="text-2xl font-semibold mb-5">{episode?.trackName}</h1>
        <p
          dangerouslySetInnerHTML={{ __html: episode?.description as string }}
        ></p>
      </div>
      <figure className="mt-5">
        <audio controls src={episode?.episodeUrl}></audio>
      </figure>
    </div>
  );
}
