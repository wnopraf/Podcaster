import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { ErrorPage } from "@/components/error-page";
import { SkeletonUi } from "@/components/skeleton";
import { PodcastDetail } from "@/features/podcasts/views/podcast-detail-view";
import { EpisodeDetail } from "@/features/podcasts/views/podcast-detail-view/views/episode-detail-view";
import { EpisodeList } from "@/features/podcasts/views/podcast-detail-view/views/episode-list-view";
import { getEpisodes } from "@/features/podcasts/views/podcast-detail-view/views/episode-list-view/episode-list-loader";
import { PodcastList } from "@/features/podcasts/views/podcast-list-view";
import { getPodcasts } from "@/features/podcasts/views/podcast-list-view/podcast-list-loader";

import { App } from "./app";

import "./index.css";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <PodcastList />,
        loader: getPodcasts,
      },
      {
        path: "podcast/:podcastId",
        element: <PodcastDetail />,
        loader: getPodcasts,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            loader: getEpisodes,
            element: <EpisodeList />,
          },
          {
            path: "episode/:episodeId",
            element: <EpisodeDetail />,
            loader: getEpisodes,
          },
        ],
      },
    ],
  },
];
if (import.meta.env.DEV) {
  routes.push({ path: "/skeleton", element: <SkeletonUi /> });
}
const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<App isfallBack />} />
  </React.StrictMode>
);
