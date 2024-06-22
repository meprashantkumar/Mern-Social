import React from "react";

const Message = ({ ownMessage, message }) => {
  return (
    <div className={`mb-2 ${ownMessage ? "text-right" : "text-left"}`}>
      <span
        className={`inline-block p-2 rounded-lg ${
          ownMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {message}
      </span>
    </div>
  );
};

export default Message;
