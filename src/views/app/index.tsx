import React, { Dispatch } from "react";
import { Link, Outlet, useNavigation } from "react-router-dom";
import { Loader } from "@/components/Loader";

export const GlobalContext = React.createContext<{
  setIsLoading: Dispatch<boolean>;
  isLoading: boolean;
} | null>(null);

export function App() {
  const navigation = useNavigation();
  return (
    <div className="container mx-auto px-5 max-w-[420px] sm:max-w-[800px] lg:max-w-[1200px]">
      <header className=" relative border-b-light-400 flex justify-center items-center  border-b pt-6 pb-4 sm:justify-between">
        <h1 className="  sm:mr-2 text-4xl font-semibold text-blue-400 md:text-2xl md:mr-0">
          <Link to="/">Podcaster</Link>
        </h1>
        {navigation.state === "loading" && (
          <Loader
            className={"text-2xl text-blue-300 absolute right-3 animate-pulse"}
          />
        )}
      </header>

      <Outlet />
      <footer className=" mt-6 flex items-center justify-center bg-blue-400  py-5 text-center font-bold text-white lg:py-8">
        <span className=" mr-2 text-xl"></span>
        <p>podcasts by Wnopraf</p>
      </footer>
    </div>
  );
}
