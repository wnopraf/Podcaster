import { Link } from "react-router-dom";

interface PodcastItem {
  title: string;
  author: string;
  imgUrl: string;
  podcastId: string;
}

export function PodcastItem({ title, author, imgUrl, podcastId }: PodcastItem) {
  return (
    <Link
      to={`podcast/${podcastId}`}
      className=" p-3 shadow-md shadow-gray-400"
    >
      <div className="mx-auto  mt-[calc(-25%)] w-1/2">
        <img
          className="h-auto w-full rounded-full"
          src={imgUrl}
          alt="podcast cover"
        />
      </div>
      <div className="mt-1 text-center">
        <h2 className="line-clamp-2 uppercase" title={title}>
          {title}
        </h2>
        <span className="mt-1 line-clamp-1 block text-gray-500" title={author}>
          Author:&nbsp;{author}
        </span>
      </div>
    </Link>
  );
}
