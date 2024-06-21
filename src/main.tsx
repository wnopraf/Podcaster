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

import { experimental_createPersister } from "@tanstack/query-persist-client-core";
import { QueryClient } from "@tanstack/react-query";




export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      persister: experimental_createPersister({
        storage: window.localStorage,
        maxAge: 1000 * 60 * 60 * 24,
      }),
    },
  },
});
const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <PodcastList />,
        loader: getPodcasts(queryClient),
      },
      {
        path: "podcast/:podcastId",
        element: <PodcastDetail />,
        loader: getPodcasts(queryClient),
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            loader: getEpisodes(queryClient),
            element: <EpisodeList />,
          },
          {
            path: "episode/:episodeId",
            element: <EpisodeDetail />,
            loader: getEpisodes(queryClient),
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
