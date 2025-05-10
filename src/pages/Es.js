import React from "react";
import "../css/Es.css";

const EthicalStandards = () => {
  return (
    <div
      className="w-full min-h-screen flex flex-col relative"
      style={{
        backgroundImage:
          "url('https://c1.wallpaperflare.com/preview/413/165/162/cloud-red-cloud-cloud-golden.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6b4c1f]/30 to-[#6b4c1f]/50"></div>

      <div className="relative z-10 w-full flex flex-col">
        <div className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl slide-in"
            style={{ fontFamily: "'Arial', sans-serif" }}  >
            <span
              className="bg-green-500 px-2 text-white font-normal slide-in delay-100"
              style={{ letterSpacing: "0.02em" }}
            >
              Ethical
            </span>
            <span
              className="text-white ml-2 font-normal slide-in delay-200"
              style={{ letterSpacing: "0.01em" }}
            >
              Standards
            </span>
          </h1>
        </div>
        <div className="bg-[#6b4c1f]/60 backdrop-blur-sm p-6 md:p-10 rounded-lg mx-2 md:mx-4 lg:mx-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            {/* Transparency Column */}
            <div className="flex-1 text-center slide-in delay-300">
              <div className="flex justify-center">
                <div className="bg-[#d4a373]/90 rounded-full w-12 h-12 flex items-center justify-center">
                  <div className="bg-[#8b5e34]/90 rounded-full w-6 h-6"></div>
                </div>
              </div>
              <h2
                className="text-2xl font-medium mt-4 text-[#fefae0]"
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                Transparency
              </h2>
              <p
                className="mt-3 text-[#e9edc9]/90 text-sm"
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                This is a space to welcome visitors to the site. Grab their
                attention with copy that clearly states what the site is about.
              </p>
            </div>

            {/* Ethics Column */}
            <div className="flex-1 text-center slide-in delay-400">
              <div className="flex justify-center">
                <div className="bg-[#d4a373]/90 rounded-full w-12 h-12 flex items-center justify-center">
                  <div className="bg-[#8b5e34]/90 rounded-full w-6 h-6"></div>
                </div>
              </div>
              <h2
                className="text-2xl font-medium mt-4 text-[#fefae0]"
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                Ethics
              </h2>
              <p
                className="mt-3 text-[#e9edc9]/90 text-sm"
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                This is a space to welcome visitors to the site. Grab their
                attention with copy that clearly states what the site is about,
                and add an engaging image or video.
              </p>
            </div>

            {/* Privacy Column */}
            <div className="flex-1 text-center slide-in delay-500">
              <div className="flex justify-center">
                <div className="bg-[#d4a373]/90 rounded-full w-12 h-12 flex items-center justify-center">
                  <div className="bg-[#8b5e34]/90 rounded-full w-6 h-6"></div>
                </div>
              </div>
              <h2
                className="text-2xl font-medium mt-4 text-[#fefae0]"
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                Privacy
              </h2>
              <p
                className="mt-3 text-[#e9edc9]/90 text-sm"
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                This is a space to welcome visitors to the site. Grab their
                attention with copy that clearly states what the site is about,
                and add an engaging image or video.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EthicalStandards;
