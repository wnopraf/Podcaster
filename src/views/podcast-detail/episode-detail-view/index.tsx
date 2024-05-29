import { useLoaderData, useParams } from "react-router-dom";
import { IPodcastDetail } from "../../../types";

export function EpisodeDetail() {
  const { episodeId } = useParams();
  const data = useLoaderData() as IPodcastDetail;
  const episode = data.results.find((elm) => {
    return elm.trackId.toString() === episodeId;
  });

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold mb-5">{episode?.trackName}</h1>
        <p dangerouslySetInnerHTML={{ __html: episode?.description }}></p>
      </div>
      <figure className="mt-5">
        <audio controls src={episode?.episodeUrl}></audio>
      </figure>
    </div>
  );
}
