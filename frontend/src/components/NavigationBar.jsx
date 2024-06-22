import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { BsCameraReelsFill, BsCameraReels } from "react-icons/bs";
import { IoSearchCircleOutline, IoSearchCircle } from "react-icons/io5";
import {
  IoChatbubbleEllipses,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { RiAccountCircleFill, RiAccountCircleLine } from "react-icons/ri";

const NavigationBar = () => {
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="fixed bottom-0 w-full bg-white py-3">
      <div className="flex justify-around">
        <Link
          to={"/"}
          onClick={() => setTab("/")}
          className="flex flex-col items-center text-2xl"
        >
          <span>{tab === "/" ? <AiFillHome /> : <AiOutlineHome />}</span>
        </Link>
        <Link
          to={"/reels"}
          onClick={() => setTab("/reels")}
          className="flex flex-col items-center text-2xl"
        >
          <span>
            {tab === "/reels" ? <BsCameraReelsFill /> : <BsCameraReels />}
          </span>
        </Link>
        <Link
          onClick={() => setTab("/search")}
          to={"/search"}
          className="flex flex-col items-center text-2xl"
        >
          <span>
            {tab === "/search" ? <IoSearchCircle /> : <IoSearchCircleOutline />}
          </span>
        </Link>
        <Link
          onClick={() => setTab("/chat")}
          to={"/chat"}
          className="flex flex-col items-center text-2xl"
        >
          <span>
            {tab === "/chat" ? (
              <IoChatbubbleEllipses />
            ) : (
              <IoChatbubbleEllipsesOutline />
            )}
          </span>
        </Link>
        <Link
          onClick={() => setTab("/account")}
          to={"/account"}
          className="flex flex-col items-center text-2xl"
        >
          <span>
            {tab === "/account" ? (
              <RiAccountCircleFill />
            ) : (
              <RiAccountCircleLine />
            )}
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
