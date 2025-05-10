import { Droplets, Wind, Eye, Sun } from "lucide-react";

const WeatherMetrics = ({
  humidity = 0,
  pressure = 0,
  uv = 0,
  precipitation = 0,
  windSpeed = 0,
  visibility = 0,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#2a2a2a] p-4 rounded-2xl flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center mb-2">
          <Droplets size={20} />
        </div>
        <p className="text-2xl font-light">{Math.round(humidity) || 0}%</p>
        <p className="text-xs text-gray-400">humidity</p>
      </div>

      <div className="bg-[#2a2a2a] p-4 rounded-2xl flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v6"></path>
            <circle cx="12" cy="14" r="8"></circle>
          </svg>
        </div>
        <p className="text-2xl font-light">{Math.round(pressure)}hPa</p>
        <p className="text-xs text-gray-400">pressure</p>
      </div>

      <div className="bg-[#2a2a2a] p-4 rounded-2xl flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center mb-2">
          <Sun size={20} />
        </div>
        <p className="text-2xl font-light">{Math.round(uv)}</p>
        <p className="text-xs text-gray-400">uv</p>
      </div>

      <div className="bg-[#2a2a2a] p-4 rounded-2xl flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center mb-2">
          <Droplets size={20} />
        </div>
        <p className="text-2xl font-light">
          {typeof precipitation === "number" ? precipitation.toFixed(1) : "0.0"}
          mm
        </p>
        <p className="text-xs text-gray-400">precipitation</p>
      </div>

      <div className="bg-[#2a2a2a] p-4 rounded-2xl flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center mb-2">
          <Wind size={20} />
        </div>
        <p className="text-2xl font-light">{windSpeed}km/h</p>
        <p className="text-xs text-gray-400">wind speed</p>
      </div>

      <div className="bg-[#2a2a2a] p-4 rounded-2xl flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center mb-2">
          <Eye size={20} />
        </div>
        <p className="text-2xl font-light">{Math.round(visibility)}km</p>
        <p className="text-xs text-gray-400">visibility</p>
      </div>
    </div>
  );
};

export default WeatherMetrics;
