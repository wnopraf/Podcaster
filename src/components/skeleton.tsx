export function SkeletonUi() {
  const skeletonData = new Array(12).fill(null);
  return (
    <>
      <div className=" mt-4 flex flex-col items-center justify-center sm:flex-row sm:justify-between animate-pulse">
        <span className=" mb-4 w-[30px] flex gap-y-1 justify-around sm:mb-0 sm:ml-auto sm:mr-2 p-1  bg-slate-300 text-white font-semibold rounded-sm">
          <span className=" w-[2px] h-[10px] bg-white"></span>
          <span className=" w-[2px] h-[10px] bg-white"></span>
          <span className=" w-[2px] h-[10px] bg-white"></span>
        </span>
        <input className="border border-2 rounded-sm" type="text" />
      </div>
      <div className=" mt-32 grid grid-cols-1  gap-x-12 gap-y-32  sm:grid-cols-2 sm:justify-items-stretch lg:grid-cols-4 ">
        {skeletonData.map((elm, index) => {
          return <SkeletonItem key={index} />;
        })}
      </div>
    </>
  );
}

const SkeletonItem = () => {
  return (
    <div className=" h-[77px] relative flex flex-col justify-center items-center p-3 shadow-md shadow-gray-400 animate-pulse">
      <div className=" h-10 w-10  rounded-full bg-slate-300 w-20 h-20 absolute -top-1/2" />

      <h2 className=" mt-9 w-1/3 h-3 rounded-md  bg-slate-300"></h2>
      <span className="mt-1 w-1/2 h-3 bg-slate-300 rounded-md"></span>
    </div>
  );
};
