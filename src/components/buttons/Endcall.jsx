import React from "react";
import { useNavigate } from "react-router-dom";

const Endcall = ({ socket, videoStream, remoteVideoStream, pc, joined }) => {
  const navigate = useNavigate();
  const endCall = async () => {
    if (!joined) {
      navigate("/");
    }
    socket.emit("userDisconnected");
    await videoStream.getTracks().forEach((track) => track.stop());
    await remoteVideoStream.getTracks().forEach((track) => track.stop());

    // Clear up the peer connection
    pc = null;
    pc.close();

    // Remove the srcObject from the video elements
    document.querySelector(".local-video").srcObject = null;
    document.querySelector(".remote-video").srcObject = null;
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
