import React from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import { Loader } from "@/components/loader";
import { SkeletonUi } from "@/components/skeleton";

interface Props {
  isfallBack?: boolean;
}
export function App({ isfallBack }: Props) {
  const navigation = useNavigation();

  return (
    <div className="container mx-auto px-5 sm:max-w-full  lg:max-w-[1200px]">
      <header className=" border-b-light-400 relative mx-auto  flex  items-center justify-center  border-b pb-4 pt-6  sm:justify-between lg:max-w-full">
        <h1 className="  text-4xl font-semibold text-blue-500 sm:mr-2 md:mr-0 lg:text-2xl">
          <Link to="/">Podcaster</Link>
        </h1>
        {navigation.state === "loading" && (
          <Loader
            className={"absolute right-3 animate-pulse text-2xl text-blue-500"}
          />
        )}
      </header>
      <div className="min-h-[80vh]">
        {isfallBack ? <SkeletonUi /> : <Outlet />}
      </div>

      <footer className=" mt-6 flex items-center justify-center bg-blue-500  py-5 text-center font-bold text-white lg:py-8">
        <span className=" mr-2 text-xl"></span>
        <p>podcasts by Wnopraf</p>
      </footer>
    </div>
  );
}
