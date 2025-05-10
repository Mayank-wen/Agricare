import { useCallback, useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"

export default function PlatformSolutions() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5
      setMousePosition({ x, y })
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #1e3a5f 0%, #a9b2b9 50%, #1e3a5f 100%)",
      }}
    >
      {/* Orbs */}
      <div
        className="absolute left-[20%] top-[25%] h-12 w-12 rounded-full bg-gradient-to-b from-white to-gray-300"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          boxShadow: "inset 2px -2px 10px rgba(0,0,0,0.2)",
        }}
      />
      <div
        className="absolute right-[20%] top-[25%] h-12 w-12 rounded-full bg-gradient-to-b from-white to-gray-300"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * -20}px)`,
          boxShadow: "inset 2px -2px 10px rgba(0,0,0,0.2)",
        }}
      />
      <div
        className="absolute left-[20%] bottom-[15%] h-12 w-12 rounded-full bg-gradient-to-b from-white to-gray-300"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * 20}px)`,
          boxShadow: "inset 2px -2px 10px rgba(0,0,0,0.2)",
        }}
      />
      <div
        className="absolute right-[20%] bottom-[15%] h-12 w-12 rounded-full bg-gradient-to-b from-white to-gray-300"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          boxShadow: "inset 2px -2px 10px rgba(0,0,0,0.2)",
        }}
      />

      {/* Content */}
      <div className="flex h-full flex-col items-center justify-center">
        <div className="grid w-full grid-cols-1 gap-8 px-4 md:grid-cols-2 md:gap-16 md:px-16 lg:px-32">
          <div
            className="flex flex-col items-center text-center"
            style={{
              transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`,
            }}
          >
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">AI Ensemble Framework</h2>
            <p className="text-sm text-gray-100 md:text-base">
              This is a space to welcome visitors to the site. Grab their attention with copy that clearly states what
              the site is about, and add an engaging image or video.
            </p>
          </div>
          <div
            className="flex flex-col items-center text-center"
            style={{
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * -15}px)`,
            }}
          >
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">Predictive Analytics</h2>
            <p className="text-sm text-gray-100 md:text-base">
              This is a space to welcome visitors to the site. Grab their attention with copy that clearly states what
              the site is about, and add an engaging image or video.
            </p>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col items-center"
          style={{
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
          }}
        >
          <div
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cream-100"
            style={{
              backgroundColor: "rgba(255, 250, 240, 0.8)",
            }}
          >
            <Sparkles className="h-8 w-8 text-gray-600" />
          </div>
          <h1
            className="mb-8 text-center font-serif text-5xl font-light text-cream-100 md:text-6xl lg:text-7xl"
            style={{
              color: "#f5f0e6",
              fontFamily: "serif",
            }}
          >
            Platform
            <br />
            Solutions
          </h1>
          <button
            className="flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 font-medium text-gray-800 transition-transform hover:scale-105"
            style={{
              transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
            }}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 text-yellow-400">
              <Sparkles className="h-3 w-3" />
            </span>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}
