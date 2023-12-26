import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export const LandingPage = () => {
  let roomid = null;
  const generateRoomId = () => {
    const roomId =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    roomid = roomId;
    return roomId;
  };

  return (
    <>
      <section className="mt-24 -z-50 mb-24">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <main className="flex flex-col items-center min-h-screen justify-center flex-1 overflow-visible text-center">
            <h1 className="text-6xl font-bold">
              Welcome to the P2P Meeting App
            </h1>

            <p className="mt-3 text-2xl">Connect with others in real-time</p>

            <div className="flex flex-wrap items-center justify-around sm:w-full mt-6">
              <Link
                to={`/meeting/meet/${generateRoomId()}`}
                className="p-6 mt-6 text-left border w-full sm:w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
              >
                <h3 className="text-2xl font-bold">
                  Create Instant Meeting &rarr;
                </h3>
                <p className="mt-4 text-xl">
                  Create a meeting and share the link with others to join.
                </p>
              </Link>

              <Link
                to={`/meeting/join`}
                className="p-6 mt-6 text-left border w-full sm:w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
              >
                <h3 className="text-2xl font-bold">Join Meeting &rarr;</h3>
                <p className="mt-4 text-xl">
                  Join a meeting by entering the meeting ID.
                </p>
              </Link>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};
