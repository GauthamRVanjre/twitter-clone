"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the user details type
interface UserDetails {
  name: string;
  email: string;
  username: string;
  profilePic: string;
  Bio: string;
}

// Create a context
interface UserContextType {
  userDetails: UserDetails | null;
  setUserDetails: (user: UserDetails | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook to access the context
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
