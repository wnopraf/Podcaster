import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import "./index.css";
import { PodcastDetail } from "./views/podcast-detail/index.tsx";
import { PodcastList } from "./views/podcast-list/index.tsx";
import { getPodcasts } from "./views/podcast-list/podcasts.ts";
import {
  EpisodeList,
  getEpisodes,
} from "./views/podcast-detail/components/episode-list.tsx";

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
        children: [
          {
            index: true,
            loader: getEpisodes,
            element: <EpisodeList />,
          },
        ],
      },
      {
        path: "hola",
        element: <div>hola</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
