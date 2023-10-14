"use client";
import React, { useEffect, useState } from "react";
import Input from "./Input";
import { FaSpinner } from "react-icons/fa";
import { usersTypes } from "../types/types";
import UsersCard from "./UsersCard";
import { useSession } from "next-auth/react";
import { useUser } from "../UserContext";

const SearchBar = () => {
  const [userInput, setUserInput] = useState("");
  const [users, setUsers] = useState<usersTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();
  const { userDetails } = useUser();

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();

    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [userDetails, users]);

  return (
    <>
      <Input
        placeholder="whom to follow?"
        value={userInput}
        type="text"
        onChange={(e) => setUserInput(e.target.value)}
      />
      {/* {users List} */}
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <FaSpinner className="animate-spin text-2xl" />
        </div>
      )}

      {users
        .filter((user) => user.name.includes(userInput))
        .map((user: usersTypes) => {
          return (
            <UsersCard
              user={user}
              id={session?.user.id}
              currentUsersFollowing={userDetails?.followingIds}
            />
          );
        })}
    </>
  );
};

export default SearchBar;
