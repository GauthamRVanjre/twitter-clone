import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

type SidebarItemsProps = {
  onClick?: () => void;
  icon: IconType;
  label: String;
  auth?: boolean;
  href?: string;
};

const SidebarItems: React.FC<SidebarItemsProps> = ({
  icon: Icon,
  label,
  auth,
  onClick,
  href,
}) => {
  let destination = href ? href : "/";
  return (
    <Link href={destination} className="flex flex-row items-center">
      <div
        onClick={onClick}
        className="relative rounded-full h-14 w-14
    flex items-center justify-center
    p-4
    hover:bg-slate-300
    hover:bg-opacity-10
    cursor-pointer
    lg:hidden
    "
      >
        <Icon size={28} />
      </div>
      <div
        onClick={onClick}
        className="
        relative
        hidden
        lg:flex
        items-center
        gap-4
        p-4
        rounded-full
        hover:bg-slate-300
        hover:bg-opacity-10
        cursor-pointer
      "
      >
        <Icon size={24} />
        <p className="hidden lg:block text-xl">{label}</p>
      </div>
    </Link>
  );
};

export default SidebarItems;
