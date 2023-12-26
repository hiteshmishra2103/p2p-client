import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "tailwindcss/tailwind.css";

export const CreateMeeting = () => {
  const [room, setRoom] = useState("");

  const generateRoomId = () => {
    const roomId =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    return roomId;
  };

  const copyRoomId = () => {
    if (room === "") {
      alert("Please enter a room ID");
      return;
    }
    navigator.clipboard.writeText(`${room}`);
    alert(`Room ID ${room} copied to clipboard.`);
  };

  //   if (redirect) {
  //     router.push(`/meeting/${room}`);
  //   }

  return (
    <>
      <section className="mt-24 text-gray-600 body-font section">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="text-6xl font-medium title-font mb-4 text-gray-900">
              Welcome to the P2P Meeting App
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Connect with others in real-time
            </p>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0">
            <input
              type="text"
              placeholder="Enter Room ID"
              id="roomid"
              value={room}
              onChange={(e) => {
                setRoom(e.target.value);
              }}
              className="flex-grow w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0"
            />

            <button
              onClick={copyRoomId}
              className="outline_btn mb-4 ml-4 inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none  rounded text-lg sm:mb-0"
            >
              Copy Room ID
            </button>

            {room === "" ? (
              <Link
                aria-disabled="true"
                className=" black_btn ml-4 inline-flex text-white bg-grey border-0 py-2 px-6 focus:outline-none  rounded text-lg"
              >
                <button>Join Now</button>
              </Link>
            ) : (
              <Link
                className="black_btn ml-4 inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none  rounded text-lg"
                to={`/meeting/meet/${room}`}
              >
                <button>Join Now</button>
              </Link>
            )}
          </div>
          <br />

          <div className="flex flex-col text-center w-full mt-10 mb-10 items-center">
            <h1 className="text-4xl font-medium title-font mb-4 text-gray-900">
              OR
            </h1>
            <a
              href={`/meeting/meet/${generateRoomId()}`}
              className="p-6 mt-6 text-left text-black border-2 border-black w-96 rounded-xl hover:text-blue-600 hover:border-blue-600 focus:text-blue-600 "
            >
              <h3 className="text-2xl font-bold ">
                Create Instant Meeting &rarr;
              </h3>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
