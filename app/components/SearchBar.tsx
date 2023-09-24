"use client";
import React, { useState } from "react";
import Input from "./Input";

const SearchBar = () => {
  const [userInput, setUserInput] = useState("");
  return (
    <>
      <Input
        placeholder="whom to follow?"
        value={userInput}
        type="text"
        onChange={(e) => setUserInput(e.target.value)}
      />
      {/* {users List} */}
    </>
  );
};

export default SearchBar;
