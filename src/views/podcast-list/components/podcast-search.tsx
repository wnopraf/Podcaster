import { Dispatch, useEffect, useState } from "react";

export const PodcastSearch: React.FunctionComponent<{
  setSearch: Dispatch<string>;
  filterResults?: number;
}> = ({ setSearch, filterResults }) => {
  const [value, setValue] = useState<string>();
  useEffect(() => {
    setSearch(value as string);
  }, [value, setSearch]);
  return (
    <div className=" mx-auto mt-5 flex  flex-col items-center justify-center gap-y-3 sm:max-w-full sm:flex-row sm:justify-end">
      <span className="text-lg mr-3 rounded-lg bg-blue-500 px-1 font-bold text-white">
        {filterResults}
      </span>
      <input
        className=" border-light-500 h-9 w-[90%] rounded-sm border indent-2 focus:outline-blue-400 sm:w-1/2  lg:w-1/3 shadow-inner"
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        placeholder="Filter podcasts..."
        aria-label="search"
      />
    </div>
  );
};
