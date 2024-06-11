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
    <div className="container mx-auto max-w-[420px] px-5 sm:max-w-[800px] lg:max-w-[1200px]">
      <header className=" border-b-light-400 relative flex items-center justify-center  border-b pb-4 pt-6 sm:justify-between">
        <h1 className="  text-4xl font-semibold text-blue-400 sm:mr-2 md:mr-0 md:text-2xl">
          <Link to="/">Podcaster</Link>
        </h1>
        {navigation.state === "loading" && (
          <Loader
            className={"absolute right-3 animate-pulse text-2xl text-blue-300"}
          />
        )}
      </header>
      <div className="min-h-[80vh]">
        {isfallBack ? <SkeletonUi /> : <Outlet />}
      </div>

      <footer className=" mt-6 flex items-center justify-center bg-blue-400  py-5 text-center font-bold text-white lg:py-8">
        <span className=" mr-2 text-xl"></span>
        <p>podcasts by Wnopraf</p>
      </footer>
    </div>
  );
}
