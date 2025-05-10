"use client";
import { mapWeatherCode } from "../services/weatherServices"; // Note the capital 'S'
import { getWeatherIcon } from "../utils/weatherIcons";

const HourlyForecast = ({ hourly, activeTab, setActiveTab }) => {
  // Get today's and tomorrow's date strings
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayStr = today.toISOString().split("T")[0];
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // Filter hourly data for today and tomorrow
  const todayForecast = [];
  const tomorrowForecast = [];

  for (let i = 0; i < hourly.time.length; i++) {
    const time = new Date(hourly.time[i]);
    const timeStr = time.toISOString().split("T")[0];

    if (timeStr === todayStr) {
      // Only include future hours for today
      if (time > today) {
        todayForecast.push({
          time: time,
          temp: hourly.temperature_2m[i],
          weatherCode: hourly.weather_code[i],
          isDay: hourly.is_day[i],
        });
      }
    } else if (timeStr === tomorrowStr) {
      tomorrowForecast.push({
        time: time,
        temp: hourly.temperature_2m[i],
        weatherCode: hourly.weather_code[i],
        isDay: hourly.is_day[i],
      });
    }
  }

  // Limit to 10 items per day
  const displayForecast =
    activeTab === "Today"
      ? todayForecast.slice(0, 10)
      : tomorrowForecast.slice(0, 10);

  // Split into two rows
  const firstRow = displayForecast.slice(0, 5);
  const secondRow = displayForecast.slice(5);

  return (
    <div className="bg-[#2a2a2a] rounded-3xl p-4">
      <div className="flex justify-between mb-4">
        <button
          className={`${
            activeTab === "Today"
              ? "border-b-2 border-white font-medium"
              : "text-gray-400"
          } pb-1`}
          onClick={() => setActiveTab("Today")}
        >
          Today
        </button>
        <button
          className={`${
            activeTab === "Tomorrow"
              ? "border-b-2 border-white font-medium"
              : "text-gray-400"
          } pb-1`}
          onClick={() => setActiveTab("Tomorrow")}
        >
          Tomorrow
        </button>
        <button className="text-[#ff4d8f]">Next 10 Days</button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {firstRow.map((item, index) => {
          const time = item.time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
          const temp = Math.round(item.temp);
          const iconCode = mapWeatherCode(item.weatherCode, item.isDay);
          const WeatherIcon = getWeatherIcon(iconCode);
          const isHighlighted = index === 1; // Highlight the second item as in the design

          return (
            <div
              key={item.time.toString()}
              className={`p-3 rounded-3xl flex flex-col items-center ${
                isHighlighted
                  ? "bg-gradient-to-b from-[#ff4d8f] to-[#ff8d64]"
                  : "bg-[#222222]"
              }`}
            >
              <p className="text-sm">{time}</p>
              <div className="my-2 relative h-12 w-12">
                <WeatherIcon className="h-12 w-12" />
              </div>
              <p className="text-xl font-medium">{temp}°</p>
            </div>
          );
        })}
      </div>

      {secondRow.length > 0 && (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {secondRow.map((item) => {
            const time = item.time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
            const temp = Math.round(item.temp);
            const iconCode = mapWeatherCode(item.weatherCode, item.isDay);
            const WeatherIcon = getWeatherIcon(iconCode);

            return (
              <div
                key={item.time.toString()}
                className="p-3 rounded-3xl flex flex-col items-center bg-[#222222]"
              >
                <p className="text-sm">{time}</p>
                <div className="my-2 relative h-12 w-12">
                  <WeatherIcon className="h-12 w-12" />
                </div>
                <p className="text-xl font-medium">{temp}°</p>
              </div>
            );
          })}

          {/* Fill empty slots if needed */}
          {Array(5 - secondRow.length)
            .fill(0)
            .map((_, index) => (
              <div key={`empty-${index}`} className="p-3 rounded-3xl"></div>
            ))}
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
