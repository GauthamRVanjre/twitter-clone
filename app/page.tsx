"use client";
import { useSession } from "next-auth/react";
import Sidebar from "./components/Sidebar";
import TweetsLayout from "./components/TweetsLayout";
import SearchBar from "./components/SearchBar";
import { useUser } from "./UserContext";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const { userDetails, setUserDetails } = useUser();
  console.log(session);

  // if(status === "authenticated"){
  //   setUserDetails({

  //   })
  // }

  const getUserDetails = async () => {
    const response = await fetch(`/api/users/${(session?.user as any)?.id}`);
    const data = await response.json();

    setUserDetails({
      name: data.name,
      email: data.email,
      username: data.username,
      profilePic: data.profilePic,
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      getUserDetails();
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
    }
  });

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
