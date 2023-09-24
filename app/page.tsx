"use client";
import { useSession } from "next-auth/react";
import Sidebar from "./components/Sidebar";
import TweetsLayout from "./components/TweetsLayout";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <div className="flex w-full m-2">
        <div className="w-1/4">
          {/* Sidebar */}
          <Sidebar />
        </div>
        <div className="w-1/2">
          {/* Tweets Layout */}
          <TweetsLayout />
        </div>
        <div className="w-1/4 hidden lg:block">
          {/* Search Bar */}
          <SearchBar />
        </div>
      </div>
    </>
  );
}
