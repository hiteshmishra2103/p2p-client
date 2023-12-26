import React, { useRef, useEffect } from "react";

export const Video = ({ stream, className }) => {
  const videoRef = useRef();
  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

  return (
    <div className={className}>
      <video
        className="rounded-xl w-full h-full text-left hover:text-blue-600 focus:text-blue-600"
        ref={videoRef}
        autoPlay={true}
        playsInline={true}
      />
    </div>
  );
};
