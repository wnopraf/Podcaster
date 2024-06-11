export function SkeletonUi() {
  const skeletonData = new Array(12).fill(null);
  return (
    <>
      <div className=" mt-4 flex animate-pulse flex-col items-center justify-center sm:flex-row sm:justify-between">
        <span className=" mb-4 flex w-[30px] justify-around gap-y-1 rounded-sm bg-slate-300 p-1 font-semibold  text-white sm:mb-0 sm:ml-auto sm:mr-2">
          <span className=" h-[10px] w-[2px] bg-white"></span>
          <span className=" h-[10px] w-[2px] bg-white"></span>
          <span className=" h-[10px] w-[2px] bg-white"></span>
        </span>
        <input className=" rounded-sm border-2" type="text" />
      </div>
      <div className=" mt-32 grid grid-cols-1  gap-x-12 gap-y-32  sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4 ">
        {skeletonData.map((_, index) => {
          return <SkeletonItem key={index} />;
        })}
      </div>
    </>
  );
}

const SkeletonItem = () => {
  return (
    <div className=" relative flex h-[77px] animate-pulse flex-col items-center justify-center p-3 shadow-md shadow-gray-400">
      <div className="  absolute -top-1/2 size-20 rounded-full bg-slate-300" />

      <h2 className=" mt-9 h-3 w-1/3 rounded-md  bg-slate-300"></h2>
      <span className="mt-1 h-3 w-1/2 rounded-md bg-slate-300"></span>
    </div>
  );
};
