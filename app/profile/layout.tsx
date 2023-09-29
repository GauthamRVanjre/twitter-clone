import React from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full m-2">
      <div className="w-1/4">
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="w-1/2">{children}</div>
      <div className="w-1/4 hidden lg:block">
        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
};

export default Layout;
