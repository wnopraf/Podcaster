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
      <div className="w-1/2  mx-auto mt-[calc(-25%)]">
        <img
          className="rounded-full w-full h-auto"
          src={imgUrl}
          alt="podcast cover"
        />
      </div>
      <div className="mt-3 text-center">
        <h4 className="capitalize line-clamp-2" title={title}>
          {title}
        </h4>
        <span className="block mt-1 line-clamp-1 text-gray-500" title={author}>
          Author:&nbsp;{author}
        </span>
      </div>
    </Link>
  );
}
