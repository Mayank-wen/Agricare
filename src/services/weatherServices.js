// Open-Meteo API service
// No API key required - it's free and open source

export const BASE_URL = "https://api.open-meteo.com/v1/forecast"
export const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search"

// Get coordinates from city name
export const fetchCoordinates = async (city) => {
  try {
    const response = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`)

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.results || data.results.length === 0) {
      throw new Error("City not found")
    }

    return data.results[0]
  } catch (error) {
    console.error("Error fetching coordinates:", error)
    throw error
  }
}

// Get current weather and forecast data
export const fetchWeatherData = async (city) => {
  try {
    // First get coordinates for the city
    const location = await fetchCoordinates(city)

    // Then fetch weather data using coordinates with correct parameters
    const weatherResponse = await fetch(
      `${BASE_URL}?` +
      `latitude=${location.latitude}` +
      `&longitude=${location.longitude}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m` +
      `&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,visibility,uv_index,is_day` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max` +
      `&timezone=auto`
    )

    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.status}`)
    }

    const weatherData = await weatherResponse.json()
    
    return {
      current: {
        ...weatherData.current,
        location: {
          name: location.name,
          country: location.country,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      },
      hourly: weatherData.hourly,
      daily: weatherData.daily,
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

// New function to get location name from coordinates
export const getLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
    )
    const data = await response.json()
    
    return {
      name: data.address.city || 
            data.address.town || 
            data.address.village || 
            data.address.suburb || 
            "Unknown Location",
      country: data.address.country || ""
    }
  } catch (error) {
    console.error("Error getting location name:", error)
    return {
      name: "Unknown Location",
      country: ""
    }
  }
}

// Fetch weather data using coordinates
export const fetchWeatherDataByCoords = async (latitude, longitude) => {
  try {
    const locationData = await getLocationName(latitude, longitude)
    
    const weatherResponse = await fetch(
      `${BASE_URL}?` +
      `latitude=${latitude}` +
      `&longitude=${longitude}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m` +
      `&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,visibility,uv_index,is_day` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max` +
      `&timezone=auto`
    )

    if (!weatherResponse.ok) {
      throw new Error(`Weather API error: ${weatherResponse.status}`)
    }

    const weatherData = await weatherResponse.json()
    
    return {
      current: {
        ...weatherData.current,
        location: {
          name: locationData.name,
          country: locationData.country,
          latitude,
          longitude,
        },
      },
      hourly: weatherData.hourly,
      daily: weatherData.daily,
    }
  } catch (error) {
    console.error("Error fetching weather data:", error)
    throw error
  }
}

// Map Open-Meteo weather codes to our icon system
export const mapWeatherCode = (code, isDay) => {
  const codeMap = {
    0: isDay ? "01d" : "01n", // Clear sky
    1: isDay ? "02d" : "02n", // Mainly clear
    2: isDay ? "03d" : "03n", // Partly cloudy
    3: isDay ? "04d" : "04n", // Overcast
    45: isDay ? "50d" : "50n", // Fog
    48: isDay ? "50d" : "50n", // Depositing rime fog
    51: isDay ? "09d" : "09n", // Light drizzle
    53: isDay ? "09d" : "09n", // Moderate drizzle
    55: isDay ? "09d" : "09n", // Dense drizzle
    56: isDay ? "09d" : "09n", // Light freezing drizzle
    57: isDay ? "09d" : "09n", // Dense freezing drizzle
    61: isDay ? "10d" : "10n", // Slight rain
    63: isDay ? "10d" : "10n", // Moderate rain
    65: isDay ? "10d" : "10n", // Heavy rain
    66: isDay ? "10d" : "10n", // Light freezing rain
    67: isDay ? "10d" : "10n", // Heavy freezing rain
    71: isDay ? "13d" : "13n", // Slight snow fall
    73: isDay ? "13d" : "13n", // Moderate snow fall
    75: isDay ? "13d" : "13n", // Heavy snow fall
    77: isDay ? "13d" : "13n", // Snow grains
    80: isDay ? "09d" : "09n", // Slight rain showers
    81: isDay ? "09d" : "09n", // Moderate rain showers
    82: isDay ? "09d" : "09n", // Violent rain showers
    85: isDay ? "13d" : "13n", // Slight snow showers
    86: isDay ? "13d" : "13n", // Heavy snow showers
    95: isDay ? "11d" : "11n", // Thunderstorm
    96: isDay ? "11d" : "11n", // Thunderstorm with slight hail
    99: isDay ? "11d" : "11n", // Thunderstorm with heavy hail
  }

  return codeMap[code] || (isDay ? "03d" : "03n") // Default to cloudy if code not found
}

// Get weather condition description from code
export const getWeatherDescription = (code) => {
  const descriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  }

  return descriptions[code] || "Unknown"
}
