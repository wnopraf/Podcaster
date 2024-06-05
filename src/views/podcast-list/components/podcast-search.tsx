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
    <div className=" mt-5 flex h-9 items-center justify-end">
      <span className="mr-4 rounded-sm bg-blue-300 px-1 text-sm font-bold text-white">
        {filterResults}
      </span>
      <input
        className=" border-light-500 h-full w-60 rounded-sm border indent-2 focus:outline-blue-300"
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
