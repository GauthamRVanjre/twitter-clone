import React from "react";
import RegisterForm from "../components/RegisterForm";

const page = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
        }}
        className="flex justify-center items-center"
      >
        <RegisterForm />
      </div>
    </>
  );
};

export default page;
