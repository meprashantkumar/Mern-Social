import React from "react";
import { UserData } from "../../context/UserContext";
import { BsSendCheck } from "react-icons/bs";

const Chat = ({ chat, setSelectedChat, isOnline }) => {
  const { user: loggedInUser } = UserData();
  let user;
  if (chat) user = chat.users[0];
  return (
    <div>
      {user && (
        <div
          className="bg-gray-200 py-2 px-1 rounded-md cursor-pointer mt-3"
          onClick={() => setSelectedChat(chat)}
        >
          <div className="flex justify-center items-center gap-2">
            {isOnline && (
              <div className="text-5xl font-bold text-green-400">.</div>
            )}
            <img
              src={user.profilePic.url}
              alt=""
              className="w-8 h-8 rounded-full"
            />
            <span>{user.name}</span>
          </div>

          <span className="flex justify-center items-center gap-1">
            {loggedInUser._id === chat.latestMessage.sender ? (
              <BsSendCheck />
            ) : (
              ""
            )}
            {chat.latestMessage.text.slice(0, 18)}...
          </span>
        </div>
      )}
    </div>
  );
};

export default Chat;
