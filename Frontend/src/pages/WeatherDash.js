import React, { useEffect, useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import styled from "styled-components";
import axios from "axios";
import Loader from "../Components/Loader";
import WeatherCard from "../Components/WeatherCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const Container = styled.div`
  padding: 20px;
  background: #f5f5f5;
   overflowX: hidden
`;

// Update the DashboardHeader styled component
const DashboardHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  h2 {
    color: white;
    margin-bottom: 10px;
    font-size: 2em;
  }
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// Add new styled component for the weather card wrapper
// Update the WeatherCardWrapper styled component
const WeatherCardWrapper = styled.div`
  width: 100%;
  max-width:1300px;
  height:400px
  margin: 0 ;

  .card {
    width: 100% !important;
    height: 400px !important; // Changed from auto to 100%
    min-height: unset; // Remove min-height
    padding: 30px;
    display: flex;
    flex-direction: column;

    .container {
      right: 0;
      top: -30px;
      transform: scale(1.2); // Increased scale
      @media (max-width: 768px) {
        transform: scale(0.9);
      }
    }

    .card-header {
      margin-top: 140px; // Increased margin
      span:first-child {
        font-size: 32px; // Increased font size
      }
      span:last-child {
        font-size: 24px; // Increased font size
      }
    }

    .temp {
      font-size: 96px; // Increased font size
      left: 20px;
      bottom: 40px;
    }

    .temp-scale {
      right: 40px;
      bottom: 40px;
      width: 120px;
      height: 50px;

      span {
        font-size: 20px; // Increased font size
      }
    }

    .weather-details {
      margin-right: 40px;
      margin-bottom: 40px;
      gap: 60px; // Increased gap
    }
  }

  @media (max-width: 768px) {
    height: calc(100vh - 60px);
    
    .card {
      padding: 20px;
      
      .card-header span:first-child {
        font-size: 24px;
      }
      
      .temp {
        font-size: 72px;
      }
    }
  }
`;


const ChartsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const ChartWrapper = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 300px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  padding: 20px;
`;

const ForecastSection = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ForecastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const Card = styled.div`
  width: 320px;
  background: #fff480;
  color: black;
  border: 4px solid aliceblue;
  position: relative;
  border-radius: 2.5em;
  padding: 2em;
  transition: transform 0.4s ease;

  &:hover {
    cursor: pointer;
    transform: scale(0.97);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2em;
  height: 100%;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(0.96);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CardTitle = styled.span`
  font-weight: bold;
  font-size: 1.2em;
`;

const CardText = styled.p`
  margin: 0;
  font-weight: 600;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const getWeatherCondition = (code) => {
  if (code === undefined || code === null) return "Clear";
  // Clear
  if (code === 0) return "Clear";
  // Clouds
  if (code >= 1 && code <= 3) return "Clouds";
  // Fog
  if (code >= 45 && code <= 48) return "Fog";
  // Drizzle
  if (code >= 51 && code <= 57) return "Rain";
  // Rain
  if (code >= 61 && code <= 67) return "Rain";
  // Snow
  if (code >= 71 && code <= 77) return "Snow";
  // Thunderstorm
  if (code >= 95 && code <= 99) return "Thunderstorm";

  return "Clear"; // default case
};

// Add this after the imports
const getLocationName = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
    );

    const address = response.data.address;
    return {
      city:
        address.city ||
        address.town ||
        address.village ||
        address.suburb ||
        "Unknown Location",
      state: address.state || "",
      country: address.country || "",
    };
  } catch (err) {
    console.error("Error getting location name:", err);
    return null;
  }
};

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({ lat: 20.5937, lon: 78.9629 });
  // Add new state for location name
  const [locationName, setLocationName] = useState(null);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Get location coordinates
              const newLocation = {
                lat: position.coords.latitude,
                lon: position.coords.longitude,
              };

              // Update location state
              setLocation(newLocation);
              setLoading(true);

              // Get location name using reverse geocoding
              const locationData = await getLocationName(
                position.coords.latitude,
                position.coords.longitude
              );

              if (locationData) {
                setLocationName(locationData);
              } else {
                throw new Error("Could not get location name");
              }
            } catch (err) {
              console.error("Location error:", err);
              setError(
                "Error getting location details. Using default location."
              );
              // Fallback to default location (Bhubaneswar)
              setLocation({ lat: 20.2961, lon: 85.8245 });
              setLocationName({
                city: "Bhubaneswar",
                state: "Odisha",
                country: "India",
              });
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            setError("Unable to get current location. Using default location.");
            // Fallback to default location (Bhubaneswar)
            setLocation({ lat: 20.2961, lon: 85.8245 });
            setLocationName({
              city: "Bhubaneswar",
              state: "Odisha",
              country: "India",
            });
            setLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        setError("Geolocation is not supported by this browser");
        setLoading(false);
      }
    };

    getCurrentLocation();
  }, []); // Run only once on component mount

  // Update the weather forecast API URL to include wind speed
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const [weatherResponse, forecastResponse] = await Promise.all([
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
          ),
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean,precipitation_sum,wind_speed_10m_max&timezone=auto`
          ),
        ]);

        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Failed to load weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    // Refresh data every 5 minutes
    const interval = setInterval(() => {
      fetchWeatherData();
    }, 300000);

    return () => clearInterval(interval);
  }, [location]);

  // Update the location effect
  useEffect(() => {
    const updateLocation = async (lat, lon) => {
      const name = await getLocationName(lat, lon);
      setLocationName(name);
    };

    if (location.lat && location.lon) {
      updateLocation(location.lat, location.lon);
    }
  }, [location]);

  // Update the formatForecastData function
  const formatForecastData = () => {
    if (!forecastData?.daily) return null;

    const forecast = forecastData.daily.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
      shortDate: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      tempMax: forecastData.daily.temperature_2m_max[index],
      tempMin: forecastData.daily.temperature_2m_min[index],
      precipitation: forecastData.daily.precipitation_probability_mean[index],
      rainfall: forecastData.daily.precipitation_sum[index] || 0,
      windSpeed: forecastData.daily.wind_speed_10m_max[index] || 0,
      isToday: index === 0,
    }));

    return {
      days: forecast.map((f) => f.shortDate),
      temps: forecast.map((f) => f.tempMax),
      humidity: forecast.map((f) => f.precipitation),
      rainfall: forecast.map((f) => f.rainfall),
      forecast,
    };
  };

  const data = formatForecastData();

  const tempData = data
    ? {
        labels: data.days,
        datasets: [
          {
            label: "Temperature (°C)",
            data: data.temps,
            borderColor: "#FF6B6B",
            tension: 0.4,
            fill: false,
          },
        ],
      }
    : null;

  const humidityData = data
    ? {
        labels: data.days,
        datasets: [
          {
            label: "Humidity (%)",
            data: data.humidity,
            backgroundColor: "#4ECDC4",
          },
        ],
      }
    : null;

  // Update the rainfallData configuration
  const rainfallData = data
    ? {
        labels: data.days,
        datasets: [
          {
            label: "Rainfall (mm)",
            data: data.rainfall,
            backgroundColor: "#3498db", // Consistent blue color for rainfall
            borderColor: "#2980b9",
            borderWidth: 1,
          },
        ],
      }
    : null;

  // Update chart options to handle long labels
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0, // Make labels horizontal
          minRotation: 0, // Make labels horizontal
          font: {
            size: 12,
          },
          autoSkip: true,
          maxTicksLimit: 7, // Limit the number of x-axis labels
        },
      },
    },
  };

  // For Pie chart, create separate options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!weatherData || !forecastData) return null;
  return (
    <Container>
      <DashboardHeader>
        <WeatherCardWrapper>
          <WeatherCard
            temperature={weatherData?.current?.temperature_2m}
            location={{
              city: locationName?.city || "Loading...",
              country: locationName?.state
                ? `${locationName.state}, ${locationName.country}`
                : locationName?.country || "Loading...",
            }}
            date={new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
            weatherCondition={getWeatherCondition(
              weatherData?.current?.weather_code
            )}
            isNight={new Date().getHours() > 18 || new Date().getHours() < 6}
            humidity={weatherData?.current?.relative_humidity_2m}
            windSpeed={`${weatherData?.current?.wind_speed_10m} km/h`}
            moisture={weatherData?.current?.relative_humidity_2m || 0}
          />
        </WeatherCardWrapper>
      </DashboardHeader>

      <ForecastSection>
        <h2>7-Day Forecast</h2>
        <ForecastGrid>
          {formatForecastData()?.forecast.map((day, index) => (
            <Card
              key={index}
              style={{
                background: day.isToday ? "#4a90e2" : "#fff480",
                color: day.isToday ? "white" : "black",
              }}
            >
              <CardContent>
                <CardTop>
                  <CardTitle>
                    {day.isToday
                      ? "Today"
                      : new Date(
                          forecastData.daily.time[index]
                        ).toLocaleDateString("en-US", { weekday: "short" })}
                  </CardTitle>
                  <CardText>{day.date.split(",")[1]}</CardText>
                </CardTop>
                <CardBottom>
                  <div>
                    <CardText>
                      High: {day.tempMax?.toFixed(1) ?? "N/A"}°C
                    </CardText>
                    <CardText>
                      Low: {day.tempMin?.toFixed(1) ?? "N/A"}°C
                    </CardText>
                    <CardText>Rain: {day.precipitation ?? "N/A"}%</CardText>
                    <CardText>
                      Wind: {day.windSpeed?.toFixed(1) ?? "N/A"} km/h
                    </CardText>
                  </div>
                </CardBottom>
              </CardContent>
            </Card>
          ))}
        </ForecastGrid>
      </ForecastSection>

      <ChartsContainer>
        {tempData && (
          <ChartWrapper>
            <h3>Temperature Trend</h3>
            <Line data={tempData} options={chartOptions} />
          </ChartWrapper>
        )}

        {humidityData && (
          <ChartWrapper>
            <h3>Humidity Levels</h3>
            <Bar data={humidityData} options={chartOptions} />
          </ChartWrapper>
        )}

        {rainfallData && (
          <ChartWrapper>
            <h3>Rainfall Distribution</h3>
            <Bar
              data={rainfallData}
              options={{
                ...chartOptions,
                scales: {
                  ...chartOptions.scales,
                  y: {
                    ...chartOptions.scales.y,
                    title: {
                      display: true,
                      text: "Rainfall (mm)",
                    },
                  },
                },
              }}
            />
          </ChartWrapper>
        )}
      </ChartsContainer>
    </Container>
  );
};

export default WeatherDashboard;
