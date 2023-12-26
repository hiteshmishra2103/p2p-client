import React from 'react'
import { useState } from 'react';

const ToggleVideo = ({ videoStream }) => {
    const [videoEnabled, setVideoEnabled] = useState(true);
    const toggleVideo = () => {
        const tracks = videoStream.getVideoTracks();
        tracks.forEach((track) => (track.enabled = !track.enabled));
        setVideoEnabled(!videoEnabled);
    };

    return (
        <button onClick={toggleVideo}>
            {videoEnabled ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="white" className="black_btn h-6 w-6 box-content pr-2 pl-2 hover:bg-zinc-700">
                    {" "}
                    <polygon points="23 7 16 12 23 17 23 7" />{" "}
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="white" className="black_btn h-6 w-6 box-content pr-2 pl-2  hover:bg-zinc-700">
                    {" "}
                    <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />{" "}
                    <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
            )}
        </button>
    )
}

export default ToggleVideo