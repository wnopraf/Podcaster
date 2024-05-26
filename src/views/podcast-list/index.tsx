import React from "react";
import { useFetch } from "../../hooks/use-fetch";

export function PodcastList() {
 const {} = useFetch(import.meta.env.VITE_PODCASTS);
}

const PodcastSearch: React.FunctionComponent<{
 setState: () => void;
 filterResults: number;
}> = ({ setState, filterResults }) => {
 return (
  <div className="flex items-center">
   <span className="mr-4 p-5 bg-blue-300 rounded-sm text-white font-bold">
    {filterResults}
   </span>
   <input type="text" onChange={setState} />
  </div>
 );
};
