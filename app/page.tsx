"use client";
import { useSession } from "next-auth/react";
import Sidebar from "./components/Sidebar";
import TweetsLayout from "./components/TweetsLayout";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <h1>{JSON.stringify(session)}</h1>
      <div className="flex w-full m-2">
        <div className="w-1/4">
          {/* Sidebar */}
          <Sidebar />
        </div>
        <div className="w-1/2">
          {/* Tweets Layout */}
          <TweetsLayout />
        </div>
        <div className="w-1/4">
          {/* Search Bar */}
          <SearchBar />
        </div>
      </div>
    </>
  );
}
