import React from "react";
import { BsTwitter } from "react-icons/bs";
import { BsHouseFill } from "react-icons/bs";
import { BsBellFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import SidebarItems from "./SidebarItems";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import SidebarTweetButton from "./SidebarTweetButton";

const Sidebar = () => {
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
      href: "/users/123",
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
            {items.map((item) => (
              <SidebarItems
                key={item.href}
                label={item.label}
                icon={item.icon}
                auth={item.auth}
              />
            ))}
            <SidebarItems
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
              //   href="/logout"
            />
            <SidebarTweetButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
