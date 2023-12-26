import React from "react";
import { useNavigate } from "react-router-dom";

const Endcall = ({ socket, videoStream, remoteVideoStream, pc }) => {
  const endCall = async () => {
    await videoStream.getTracks().forEach((track) => track.stop());
    await remoteVideoStream.getTracks().forEach((track) => track.stop());

    // Close the peer connection
    pc.close();

    // Clear up the peer connection
    pc = null;

    // Remove the srcObject from the video elements
    document.querySelector(".local-video").srcObject = null;
    document.querySelector(".remote-video").srcObject = null;

    socket.emit("userDisconnected");
    console.log("end call");
  };

  return (
    <button onClick={endCall}>
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1"
        stroke="white"
        className="red_btn h-6 w-6 box-content pr-4 pl-4  "
      >
        {" "}
        <path stroke="none" d="M0 0h24v24H0z" />{" "}
        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />{" "}
        <path d="M16 4l4 4m0 -4l-4 4" />
      </svg>
    </button>
  );
};

export default Endcall;
