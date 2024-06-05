import { useLoaderData, useParams } from "react-router-dom";

export function EpisodeDetail() {
  const { episodeId } = useParams();
  const data = useLoaderData() as Podcaster.PodcastDetail;
  const episode = data.results.find((elm) => {
    return elm.trackId.toString() === episodeId;
  });

  return (
    <div className="p-5 text-center  shadow shadow-gray-500 lg:text-left">
      <div>
        <h1 className="mb-5 text-2xl font-semibold">{episode?.trackName}</h1>
        <p
          dangerouslySetInnerHTML={{ __html: episode?.description as string }}
        ></p>
      </div>
      <figure className="mt-5">
        <audio className="w-full" controls src={episode?.episodeUrl}></audio>
      </figure>
    </div>
  );
}
