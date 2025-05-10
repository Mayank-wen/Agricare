import { mapWeatherCode } from "../services/weatherServices"
import { getWeatherIcon } from "../utils/weatherIcons"

const WeatherCard = ({
  city,
  country,
  temp,
  condition,
  description,
  maxTemp,
  minTemp,
  pressure,
  date,
  weatherCode,
  isDay,
  variant = "vertical",
}) => {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const day = date ? dayNames[date.getDay()] : "Unknown"
  const month = date ? monthNames[date.getMonth()] : "Unknown"
  const dateNum = date ? date.getDate() : "-"

  // Map Open-Meteo weather code to our icon system
  const iconCode = mapWeatherCode(weatherCode, isDay)
  const WeatherIcon = getWeatherIcon(iconCode)

  const safeTemp = typeof temp === "number" ? temp : "N/A"
  const safeMaxTemp = typeof maxTemp === "number" ? maxTemp : "N/A"
  const safeMinTemp = typeof minTemp === "number" ? minTemp : "N/A"
  const safePressure = typeof pressure === "number" ? `${Math.round(pressure)} hPa` : "N/A"

  if (variant === "horizontal") {
    return (
      <div className="bg-gradient-to-br from-[#ff4d8f] to-[#ff8d64] p-6 rounded-3xl relative overflow-hidden">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">{city}</h1>
            <p className="text-xl mt-2">{condition}</p>
          </div>
          <div className="text-right">
            <div className="flex items-start">
              <span className="text-8xl font-light">{safeTemp}</span>
              <span className="text-2xl mt-2">°</span>
            </div>
            <div className="flex flex-col text-sm mt-2">
              <span>Max: {safeMaxTemp}°</span>
              <span>Min: {safeMinTemp}°</span>
            </div>
          </div>
        </div>

        <div className="absolute right-10 bottom-0">
          <div className="relative">
            <WeatherIcon className="w-40 h-40" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div className="bg-gradient-to-br from-[#ff4d8f] to-[#ff8d64] p-6 rounded-3xl">
        <h1 className="text-3xl font-bold">
          {city}, {country}
        </h1>
        <p className="text-sm opacity-90">
          {day}, {month} {dateNum}
        </p>

        <div className="flex items-center mt-4">
          <div className="relative">
            <WeatherIcon className="w-32 h-32" />
          </div>

          <div className="ml-4">
            <div className="flex items-start">
              <span className="text-8xl font-light">{safeTemp}</span>
              <span className="text-2xl mt-2">°</span>
            </div>
            <p className="text-xl">{condition}</p>
            <div className="flex text-sm mt-2 space-x-4">
              <span>Max: {safeMaxTemp}°</span>
              <span>Min: {safeMinTemp}°</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pressure Indicator */}
      <div className="absolute bottom-0 right-0 bg-gradient-to-r from-[#ff4d8f] to-[#ff8d64] p-3 rounded-tl-3xl">
        <p className="text-sm">Pressure:</p>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
          <span>{safePressure}</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
