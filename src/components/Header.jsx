import React from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 z-50 left-0 rounded-lg flex items-center bg-white items-center justify-around p-4 h-24 w-full sm:h-30">
      <p>
        <button className="text-xl" onClick={() => navigate("/")}>
          P2P
        </button>
      </p>

      <p className="hidden sm:flex">
        <span>By:</span>
        <a
          className=" text-blue-600 underline ml-1 hover:text-blue-800"
          href="
          https://hiteshmishra.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hitesh Mishra
        </a>
      </p>
      <p className="flex justify-center ">
        <button
          onClick={() => navigate("/meeting/join")}
          className="outline_btn  ml-1 cursor-pointer"
        >
          Join now
        </button>
      </p>
    </header>
  );
};

