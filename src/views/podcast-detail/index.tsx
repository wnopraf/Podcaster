import { Outlet, useLoaderData, useParams, Link } from "react-router-dom";

import { PodCast } from "../../types";

export function PodcastDetail() {
  const params = useParams();
  const podcastList = useLoaderData() as PodCast[];
  const podcast = podcastList.find((elm) => {
    return elm.id.attributes["im:id"] === params.podcastId;
  });
  return (
    <div className="flex flex-col gap-y-14 md:gap-x-6 lg:flex-row    mt-10">
      <aside className=" w-full text-center lg:text-left lg:w-1/3 h-max p-5 shadow shadow-gray-400">
        <Link to=".">
          <div className="w-24 mx-auto">
            <img
              className="w-full h-auto"
              src={podcast?.["im:image"][0].label}
              alt=""
            />
          </div>
          <div className="mt-8 py-6 border-t border-b border-gray-300">
            <h1 className="font-semibold">{podcast?.["im:name"].label}</h1>
            <p className=" italic">
              <span>by</span>
              <span className="capitalize">
                {" "}
                {podcast?.["im:artist"].label}
              </span>
            </p>
          </div>
        </Link>

        <div className="mt-8">
          <h2 className="mb-1 font-semibold text-gray-800">Description</h2>
          <p
            className="italic"
            dangerouslySetInnerHTML={{
              __html: podcast?.summary.label as string,
            }}
          ></p>
        </div>
      </aside>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
