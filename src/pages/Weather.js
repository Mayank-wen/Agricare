"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import WeatherCard from "../components/WeatherCard";
import WeatherMetrics from "../components/WeatherMetrics";
import HourlyForecast from "../components/HourlyForecast";
import DayForecast from "../components/DayForecast";
import WeatherMap from "../components/WeatherMap";
import {
  fetchWeatherData,
  getWeatherDescription,
  GEO_URL,
  BASE_URL,
  fetchWeatherDataByCoords,
} from "../services/weatherServices";
import "../css/Weather.css";

function Weather() {
  const [city, setCity] = useState("New York");
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Today");
  const [userLocation, setUserLocation] = useState(null);

  // Define getCurrentLocation function outside useEffect
  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        setLoading(true);
        setError(null);

        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        });

        const weatherData = await fetchWeatherDataByCoords(
          position.coords.latitude,
          position.coords.longitude
        );

        setWeatherData(weatherData);
        setCity(weatherData.current.location.name);
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (err) {
        console.error("Location error:", err);
        setError("Could not get your location. Using default city.");
        setCity("New York");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Geolocation is not supported by your browser");
      setCity("New York");
      setLoading(false);
    }
  };

  // Use getCurrentLocation in useEffect
  useEffect(() => {
    getCurrentLocation();
  }, []); // Run once on mount

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      // Weather data will be fetched by the remaining useEffect when city changes
      setSearchInput("");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="text-2xl">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="text-2xl text-red-400">{error}</div>
      </div>
    );
  }

  if (!weatherData) return null;

  const { current, hourly, daily } = weatherData || {};
  const weatherDescription = getWeatherDescription(current?.weather_code);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <div className="container mx-auto p-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search for a city"
                className="w-full bg-[#2a2a2a] rounded-full py-2 pl-10 pr-4 text-gray-300 focus:outline-none"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="px-4 py-2 bg-[#ff4d8f] rounded-full hover:bg-[#ff3d7f] transition-colors"
            >
              Use My Location
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Main Weather Card */}
            <WeatherCard
              city={current?.location?.name ?? "Unknown"}
              country={current?.location?.country ?? "Unknown"}
              temp={Math.round(current?.temperature_2m ?? 0)}
              condition={weatherDescription ?? "Unknown"}
              description={weatherDescription ?? "Unknown"}
              maxTemp={Math.round(daily?.temperature_2m_max?.[0] ?? 0)}
              minTemp={Math.round(daily?.temperature_2m_min?.[0] ?? 0)}
              pressure={current?.surface_pressure ?? 0}
              date={new Date()}
              weatherCode={current?.weather_code ?? 0}
              isDay={current?.is_day ?? true}
            />

            {/* Hourly Forecast */}
            <HourlyForecast
              hourly={hourly ?? {}}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Main Weather Display */}
            <WeatherCard
              city={current?.location?.name ?? "Unknown"}
              country={current?.location?.country ?? "Unknown"}
              temp={Math.round(current?.temperature_2m ?? 0)}
              condition={weatherDescription ?? "Unknown"}
              description={weatherDescription ?? "Unknown"}
              maxTemp={Math.round(daily?.temperature_2m_max?.[0] ?? 0)}
              minTemp={Math.round(daily?.temperature_2m_min?.[0] ?? 0)}
              pressure={current?.surface_pressure ?? 0}
              date={new Date()}
              weatherCode={current?.weather_code ?? 0}
              isDay={current?.is_day ?? true}
              variant="horizontal"
            />

            {/* Weather Metrics */}
            <WeatherMetrics
              humidity={current?.relative_humidity_2m ?? 0}
              pressure={current?.surface_pressure ?? 0}
              uv={hourly?.uv_index?.[0] ?? 0}
              precipitation={current?.precipitation ?? 0}
              windSpeed={Math.round(current?.wind_speed_10m ?? 0)}
              visibility={(hourly?.visibility?.[0] ?? 0) / 1000} // Convert to km
            />

            {/* Day Forecast */}
            <DayForecast
              sunrise={new Date(daily?.sunrise?.[0] ?? new Date())}
              sunset={new Date(daily?.sunset?.[0] ?? new Date())}
              date={new Date()}
            />

            {/* Map */}
            <WeatherMap
              lat={Number(current?.location?.latitude ?? 0)}
              lon={Number(current?.location?.longitude ?? 0)}
              city={current?.location?.name ?? "Unknown"}
              country={current?.location?.country ?? "Unknown"}
              pressure={current?.surface_pressure ?? 0}
              temperature={current?.temperature_2m ?? 0}
              precipitation={current?.precipitation ?? 0}
              windSpeed={current?.wind_speed_10m ?? 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
