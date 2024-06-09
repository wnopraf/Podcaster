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
    <div className=" mt-5 flex flex-col items-center justify-center gap-y-3 sm:flex-row sm:justify-end">
      <span className="text-md mr-4 rounded-sm bg-blue-400 px-1 font-bold text-white sm:text-sm">
        {filterResults}
      </span>
      <input
        className=" border-light-500 h-9 w-full  rounded-sm border indent-2 focus:outline-blue-400 sm:h-8 sm:w-60"
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
