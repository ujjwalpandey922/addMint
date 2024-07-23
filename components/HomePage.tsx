"use client";
import React, { useState } from "react";
import Mint from "./Mint";
import Collection from "./Collection";
import Link from "next/link";

const Home: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);

  return (
    <div className="container min-h-screen shadow-[0px_0px_15px_15px_rgba(0,0,0,1)_inset] mx-auto p-12 w-full bg-slate-200 ">
      <header className="w-full mb-4 flex justify-between items-center">
        <Link
          href="/"
          className="md:text-3xl hover:bg-gradient-to-l hover:from-indigo-500 hover:via-blue-500 hover:to-sky-500 cursor-pointer transition-all text-xl  font-bold bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500 inline-block text-transparent bg-clip-text  text-center  relative z-20"
        >
          AddMINT
        </Link>
        <div className="flex gap-4">
          <button
            onClick={() => setCurrentTab(1)}
            className={`${
              currentTab === 1 &&
              "bg-blue-500 text-white border-blue-500 cursor-none"
            } rounded-xl px-4 py-2 border border-black hover:bg-blue-500 hover:text-white transition-all`}
          >
            Mint
          </button>
          <button
            onClick={() => setCurrentTab(2)}
            className={`${
              currentTab === 2 &&
              "bg-blue-500 text-white border-blue-500 cursor-none"
            } rounded-xl px-4 py-2 border border-black hover:bg-blue-500 hover:text-white transition-all`}
          >
            Collection
          </button>
        </div>
      </header>

      {currentTab === 1 ? <Mint /> : <Collection />}
    </div>
  );
};

export default Home;
