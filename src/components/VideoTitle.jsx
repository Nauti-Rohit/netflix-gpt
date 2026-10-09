import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 z-10 flex h-screen flex-col justify-center bg-gradient-to-r from-black px-24 text-white">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="w-1/4 py-6 text-lg">{overview}</p>
      <div className="flex gap-4">
        <button className="rounded-md bg-white/50 px-8 py-4 text-lg font-bold text-black hover:bg-red-500 hover:text-white">
          Play
        </button>
        <button className="rounded-md bg-gray-500 px-8 py-4 text-lg font-bold text-white hover:bg-gray-600">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
