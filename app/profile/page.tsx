"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import ProfileLayout from "../components/profile/ProfileLayout";

const page = () => {
  return (
    <div className="flex w-full m-2">
      <div className="w-1/4">
        {/* Sidebar */}
        <Sidebar />
      </div>
      <div className="w-1/2">
        <ProfileLayout />
      </div>
      <div className="w-1/4">
        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
};

export default page;
