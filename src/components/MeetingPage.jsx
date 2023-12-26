import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketIO from "socket.io-client";
import { Video } from "./Video";
import { useNavigate } from "react-router-dom";
import Endcall from "./buttons/Endcall";
import ToggleVideo from "./buttons/ToggleVideo";
import ToggleAudio from "./buttons/ToggleAudio";
import "react-notifications-component/dist/theme.css";
import { Store } from "react-notifications-component";
import Share from "./buttons/Share";

let pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: "stun:stun.l.google.com:19302",
    },
  ],
});

export function MeetingPage() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [meetingJoined, setMeetingJoined] = useState(false);
  const [videoStream, setVideoStream] = useState();
  const [remoteVideoStream, setRemoteVideoStream] = useState();

  const params = useParams();
  const roomId = params.roomId;

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    const meetingLink = `http://localhost:3000/meeting/meet/${roomId}`;
    Store.addNotification({
      title: "Meeting Link copied to clipboard",
      message: `Share this link with others to join the meeting`,
      type: "success",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

  useEffect(() => {
    const s = socketIO.connect("https://p2pserver-zrex.onrender.com");

    s.on("callEnded", async () => {
      // Stop all tracks
      pc.close();
      pc = null;
      navigate("/");

      Store.addNotification({
        title: "Meeting ended",
        message: "The meeting has been ended!",
        type: "danger",
        insert: "top",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    });

    s.on("connect", () => {
      setSocket(s);
      s.emit("join", {
        roomId,
      });

      window.navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then(async (stream) => {
          setVideoStream(stream);
        });

      s.on("localDescription", async ({ description }) => {
        console.log({ description });
        pc.setRemoteDescription(description);
        pc.ontrack = (e) => {
          setRemoteVideoStream(new MediaStream([e.track]));
        };

        s.on("iceCandidate", ({ candidate }) => {
          pc.addIceCandidate(candidate);
        });

        pc.onicecandidate = ({ candidate }) => {
          s.emit("iceCandidateReply", { candidate });
        };
        await pc.setLocalDescription(await pc.createAnswer());
        s.emit("remoteDescription", { description: pc.localDescription });
      });
      s.on("remoteDescription", async ({ description }) => {
        // Receiving video -
        console.log({ description });
        pc.setRemoteDescription(description);
        pc.ontrack = (e) => {
          setRemoteVideoStream(new MediaStream([e.track]));
        };

        s.on("iceCandidate", ({ candidate }) => {
          pc.addIceCandidate(candidate);
        });

        pc.onicecandidate = ({ candidate }) => {
          s.emit("iceCandidateReply", { candidate });
        };
      });
    });
  }, []);

  if (!videoStream) {
    return <div>Loading...</div>;
  }

  if (!meetingJoined) {
    return (
      <div className="mt-24 mb-24 min-h-screen flex flex-col items-evenly justify-center sm:mt-24 mb-24 ">
        <div className="max-w-md w-full space-y-8 m-4 p-4 bg-white rounded-lg shadow-md">
          <div>
            <p className="text-center text-lg font-semibold text-gray-700 mb-4 p-2 shadow-lg bg-opacity-50 bg-white rounded-md">
              Hi welcome to meeting {roomId}.
            </p>
          </div>

          <div className="flex justify-center relative drop-shadow-2xl rounded-lg">
            <Video stream={videoStream} className="mx-auto " />

            <div className=" bg-white w-full gap-1 flex justify-center absolute bottom-0 rounded-lg p-2">
              <ToggleAudio videoStream={videoStream} />
              <ToggleVideo videoStream={videoStream} />
              <Endcall
                videoStream={videoStream}
                remoteVideoStream={remoteVideoStream}
                pc={pc}
                socket={socket}
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="black_btn"
              onClick={async () => {
                // sending pc
                pc.onicecandidate = ({ candidate }) => {
                  socket.emit("iceCandidate", { candidate });
                };
                pc.addTrack(videoStream.getVideoTracks()[0]);
                try {
                  await pc.setLocalDescription(await pc.createOffer());
                  console.log({ aa: pc.localDescription });
                  socket.emit("localDescription", {
                    description: pc.localDescription,
                  });
                } catch (err) {
                  console.log({ msg: err?.message });
                  console.error(err);
                }

                setMeetingJoined(true);
              }}
              disabled={!socket}
            >
              Join meeting
            </button>
          </div>
        </div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0">
          <input
            type="text"
            id="roomid"
            value={roomId}
            readOnly
            className="flex-grow w-full bg-gray-100 rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-base px-4 py-2 mr-4 mb-4 sm:mb-0"
          />

          <button onClick={copyRoomId} className="outline_btn">
            Copy ID
          </button>
        </div>
      </div>
    );
  }
  console.log({ remoteVideoStream, videoStream });
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center flex-1 px-4 sm:px-8 md:px-16 lg:px-20 text-center">
        <Video className="local-video" stream={videoStream} />
        <Video className="remote-video" stream={remoteVideoStream} />
        <div className="bg-white w-full gap-1 flex justify-center absolute bottom-0 rounded-lg p-2">
          <ToggleAudio videoStream={videoStream} />
          <ToggleVideo videoStream={videoStream} />
          <Endcall
            videoStream={videoStream}
            remoteVideoStream={remoteVideoStream}
            pc={pc}
            socket={socket}
          />
          <Share copyRoomId={copyRoomId} />
        </div>
      </div>
    </div>
  );
}
