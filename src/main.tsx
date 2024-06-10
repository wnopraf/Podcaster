import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "@/components/error-page";
import { App } from "@/views/app";
import { PodcastDetail } from "@/views/podcast-detail";
import { EpisodeDetail } from "@/views/podcast-detail/episode-detail-view";
import { EpisodeList } from "@/views/podcast-detail/episode-list-view/";
import { PodcastList } from "@/views/podcast-list";
import { getPodcasts } from "@/views/podcast-list/podcast-list-loader";

import "./index.css";

import { getEpisodes } from "./views/podcast-detail/episode-list-view/episode-list-loader";

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<App isfallBack />} />
  </React.StrictMode>
);
