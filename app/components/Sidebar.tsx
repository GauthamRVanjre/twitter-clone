"use client";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { BsHouseFill } from "react-icons/bs";
import { BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItems from "./SidebarItems";
import { BiLogOut } from "react-icons/bi";
import { signOut, useSession } from "next-auth/react";
import SidebarTweetButton from "./SidebarTweetButton";
import LoginModel from "./models/LoginModel";
import RegisterModel from "./models/RegisterModel";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const items = [
    {
      label: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      auth: true,
    },

    {
      label: "Profile",
      href: `/profile/${session?.user?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];
  return (
    <>
      <div className="col-span-1 h-full pr-4 md:pr-6">
        <div className="flex flex-col items-end">
          <div className="space-y-2 lg:w-[230px]">
            <div className="ml-4">
              <BsTwitter size={32} />
            </div>

            {status === "authenticated" &&
              items.map((item) => (
                <SidebarItems
                  key={item.href}
                  label={item.label}
                  icon={item.icon}
                  auth={item.auth}
                  href={item.href}
                />
              ))}

            {status === "authenticated" ? (
              <>
                <SidebarItems
                  onClick={() => {
                    signOut();
                    localStorage.clear();
                  }}
                  icon={BiLogOut}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <LoginModel />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
