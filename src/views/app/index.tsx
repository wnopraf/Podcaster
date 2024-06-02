import { Link, Outlet, useNavigation } from "react-router-dom";
import React, { Dispatch } from "react";
import { Loader } from "../../ui/Loader";

export const GlobalContext = React.createContext<{
  setIsLoading: Dispatch<boolean>;
  isLoading: boolean;
} | null>(null);

export function App() {
  const navigation = useNavigation();
  return (
    <div className="container mx-auto px-5">
      <header className="flex justify-center md:justify-between  py-6 border-b border-b-light-400">
        <h1 className=" text-4xl md:text-2xl text-blue-400">
          <Link to="/">Podcaster</Link>
        </h1>
        {navigation.state === "loading" && <Loader />}
      </header>

      <Outlet />
      <footer className=" py-10 md:py-20 bg-blue-300 text-center text-white mt-6">
        <p>
          <span className=" text-xl mr-1"></span> podcasts by Wnopraf
        </p>
      </footer>
    </div>
  );
}
