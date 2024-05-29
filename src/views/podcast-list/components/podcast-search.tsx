import { Dispatch, useEffect, useState } from "react";

export const PodcastSearch: React.FunctionComponent<{
 setState: Dispatch<string>;
 filterResults?: number;
}> = ({ setState, filterResults }) => {
 const [value, setValue] = useState<string>();
 useEffect(() => {
  setState(value as string);
 }, [value]);
 return (
  <div className=" h-9 flex items-center justify-end mt-5">
   <span className="mr-4 px-1 bg-blue-300 rounded-sm text-white text-sm font-bold">
    {filterResults}
   </span>
   <input
    className=" w-60 h-full border rounded-sm border-light-500 focus:outline-blue-300 indent-2"
    type="text"
    value={value}
    onChange={(event) => {
     setValue(event.target.value);
    }}
    placeholder="Filter podcasts..."
   />
  </div>
 );
};
