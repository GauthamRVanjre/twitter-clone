// components/Home.js

import React from "react";

const HomeTweetLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center items-center h-16 bg-blue-400">
        <h1 className="text-white font-bold text-2xl">Twitter Clone</h1>
      </div>
      <div className="container mx-auto p-4">
        {/* Add your Twitter feed content here */}
        <div className="bg-white p-4 rounded-lg shadow">
          <p>Tweet 1</p>
          <p>Tweet 2</p>
          {/* Add more tweets */}
        </div>
      </div>
    </div>
  );
};

export default HomeTweetLayout;
