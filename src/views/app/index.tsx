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
    <div className="container mx-auto px-5 ">
      <header className="border-b-light-400 flex justify-center  border-b py-6 md:justify-between">
        <h1 className=" text-4xl text-blue-400 md:text-2xl">
          <Link to="/">Podcaster</Link>
        </h1>
        {navigation.state === "loading" && <Loader />}
      </header>

      <Outlet />
      <footer className=" mt-6 flex items-center justify-center bg-blue-300  py-5 text-center font-bold text-white lg:py-8">
        <span className=" mr-1 text-xl"></span>
        <p>podcasts by Wnopraf</p>
      </footer>
    </div>
  );
}
