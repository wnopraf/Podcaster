import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { App } from "@/app";
import { ErrorPage } from "@/components/error-page";
import { PodcastDetail } from "@/views/podcast-detail-view";
import { EpisodeDetail } from "@/views/podcast-detail-view/views/episode-detail-view";
import { EpisodeList } from "@/views/podcast-detail-view/views/episode-list-view";
import { PodcastList } from "@/views/podcast-list-view";
import { getPodcasts } from "@/views/podcast-list-view/podcast-list-loader";

import "./index.css";

import { SkeletonUi } from "./components/skeleton";
import { getEpisodes } from "./views/podcast-detail-view/views/episode-list-view/episode-list-loader";

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
