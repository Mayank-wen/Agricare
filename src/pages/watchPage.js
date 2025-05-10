import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";

import {
  PracticalTrainingVideos,
  SustainableAgricultureVideos,
} from "../utils/video.js";

export function WatchPage() {
  const [currentVideoData, setCurrentVideoData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const videoType = location.state?.videoType || "practical";
    const category = location.state?.category;

    const videos =
      videoType === "practical"
        ? PracticalTrainingVideos
        : SustainableAgricultureVideos;

    if (category && videos[category]?.length > 0) {
      setCurrentVideoData(videos[category][0]);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-black text-white">
    

      {/* Video Player */}
      <div className="relative w-full h-screen bg-black">
        {currentVideoData && (
          <iframe
            src={`${currentVideoData.url}?autoplay=1&rel=0&controls=0&showinfo=0&modestbranding=1`}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={currentVideoData.title}
          />
        )}
      </div>

      {/* Content Info */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {currentVideoData?.title || "Loading..."}
            </h1>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-4">More Videos</h2>
            <div className="grid gap-4">
              {Object.entries(
                location.state?.videoType === "practical"
                  ? PracticalTrainingVideos
                  : SustainableAgricultureVideos
              ).map(([category, videos]) => (
                <div key={category}>
                  <h3 className="font-medium text-gray-400 mb-2">{category}</h3>
                  {videos.map((video, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-2 hover:bg-white/10 rounded cursor-pointer"
                      onClick={() => setCurrentVideoData(video)}
                    >
                      <div className="w-24 h-16 relative flex-shrink-0 bg-gray-800">
                        <img
                          src={`https://img.youtube.com/vi/${
                            video.url.split("/embed/")[1]
                          }/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{video.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
