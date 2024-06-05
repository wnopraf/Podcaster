import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";

export function PodcastDetail() {
  const params = useParams();
  const podcastList = useLoaderData() as Podcaster.PodCast[];
  const podcast = podcastList.find((elm) => {
    return elm.id.attributes["im:id"] === params.podcastId;
  });
  return (
    <div className="mt-10 flex min-h-[75vh] flex-col gap-y-14 md:gap-x-6 lg:flex-row">
      <aside className=" h-max w-full p-5 text-center shadow shadow-gray-400 lg:w-1/3 lg:text-left">
        <Link to=".">
          <div className="mx-auto w-24">
            <img
              className="h-auto w-full"
              src={podcast?.["im:image"][0].label}
              alt=""
            />
          </div>
          <div className="mt-8 border-y border-gray-300 py-6">
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
