import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col space-y-4 text-center">
        <div className="text-gray-600 text-xl font-medium">Social Media</div>
        <div className="text-5xl font-medium">Page not found</div>
        <div className="text-gray-500">sorry, this page isn't available</div>
        <div className="flex items-center justify-center">
          <div
            onClick={() => navigate("/")}
            className="bg-gray-600 px-4 py-1 text-white font-medium rounded-lg hover:scale-105 cursor-pointer"
          >
            Visit Homepage
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
