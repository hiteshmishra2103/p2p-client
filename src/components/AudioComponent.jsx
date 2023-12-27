import React, { useRef, useEffect } from "react";

export const AudioComponent = ({ stream }) => {
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef && audioRef.current) {
      audioRef.current.srcObject = stream;
    }
  }, [audioRef, stream]);

  return (
    <div>
      <audio
        className="rounded-xl w-full h-full text-left hover:text-blue-600 focus:text-blue-600"
        ref={audioRef}
        autoPlay={true}
        playsInline={true}
      />
    </div>
  );
};
