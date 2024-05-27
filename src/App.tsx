import { Link, Router } from "@reach/router";
import React, { Dispatch, useState } from "react";
import { Loader } from "./ui/Loader";
import { PodcastList } from "./views/podcast-list";

export const GlobalContext = React.createContext<{
 setIsLoading: Dispatch<boolean>;
 isLoading: boolean;
} | null>(null);

export function App() {
 const [isLoading, setIsLoading] = useState(true);
 return (
  <div className="lg:container lg:mx-auto">
   <header className="flex justify-between items-center py-6 border-b border-b-light-400">
    <h1 className=" text-2xl text-blue-300">
     <Link to="/">Podcaster</Link>
    </h1>
    {isLoading && <Loader />}
   </header>

   <Router>
    <PodcastList path="/" setIsLoading={setIsLoading} />
    {/*  <PodcastDetail path='podcast' >
            <EpisodeList path=':podcastId'/>
            <EpisodeDetail path= ':podcastId/episode/:episodeId' />
        </PodcastDetail> */}
   </Router>
  </div>
 );
}
