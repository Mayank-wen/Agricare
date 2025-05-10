// Weather icon mapping
export const getWeatherIcon = (iconCode) => {
    // Map OpenWeatherMap icon codes to custom SVG components
    const iconMap = {
      // Clear sky
      "01d": SunIcon,
      "01n": MoonIcon,
  
      // Few clouds
      "02d": SunCloudIcon,
      "02n": MoonCloudIcon,
  
      // Scattered clouds
      "03d": CloudIcon,
      "03n": CloudIcon,
  
      // Broken clouds
      "04d": CloudsIcon,
      "04n": CloudsIcon,
  
      // Shower rain
      "09d": RainIcon,
      "09n": RainIcon,
  
      // Rain
      "10d": SunRainIcon,
      "10n": MoonRainIcon,
  
      // Thunderstorm
      "11d": ThunderIcon,
      "11n": ThunderIcon,
  
      // Snow
      "13d": SnowIcon,
      "13n": SnowIcon,
  
      // Mist
      "50d": MistIcon,
      "50n": MistIcon,
    }
  
    return iconMap[iconCode] || CloudIcon
  }
  
  // SVG Weather Icons
  export const SunIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="25" fill="#FFD700" />
      <g stroke="#FFD700" strokeWidth="3">
        <line x1="50" y1="15" x2="50" y2="5" />
        <line x1="50" y1="95" x2="50" y2="85" />
        <line x1="15" y1="50" x2="5" y2="50" />
        <line x1="95" y1="50" x2="85" y2="50" />
        <line x1="25" y1="25" x2="18" y2="18" />
        <line x1="75" y1="75" x2="82" y2="82" />
        <line x1="25" y1="75" x2="18" y2="82" />
        <line x1="75" y1="25" x2="82" y2="18" />
      </g>
    </svg>
  )
  
  export const MoonIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M35,15 A30,30 0 1,0 85,65 A30,30 0 0,1 35,15 Z" fill="#F5F3CE" />
    </svg>
  )
  
  export const CloudIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,60 A20,20 0 0,1 65,60 A10,15 0 0,1 75,75 L25,75 A10,15 0 0,1 25,60" fill="white" />
    </svg>
  )
  
  export const CloudsIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M20,55 A15,15 0 0,1 50,55 A8,10 0 0,1 58,65 L20,65 A8,10 0 0,1 20,55" fill="#E0E0E0" />
      <path d="M35,70 A15,15 0 0,1 65,70 A8,10 0 0,1 73,80 L35,80 A8,10 0 0,1 35,70" fill="white" />
    </svg>
  )
  
  export const SunCloudIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="40" r="15" fill="#FFD700" />
      <path d="M30,60 A20,20 0 0,1 70,60 A10,15 0 0,1 80,75 L30,75 A10,15 0 0,1 30,60" fill="white" />
    </svg>
  )
  
  export const MoonCloudIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,30 A15,15 0 1,0 55,50 A15,15 0 0,1 25,30 Z" fill="#F5F3CE" />
      <path d="M30,60 A20,20 0 0,1 70,60 A10,15 0 0,1 80,75 L30,75 A10,15 0 0,1 30,60" fill="white" />
    </svg>
  )
  
  export const RainIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,40 A20,20 0 0,1 65,40 A10,15 0 0,1 75,55 L25,55 A10,15 0 0,1 25,40" fill="white" />
      <line x1="35" y1="65" x2="30" y2="75" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="65" x2="40" y2="75" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="55" y1="65" x2="50" y2="75" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="65" x2="60" y2="75" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
  
  export const SunRainIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="30" r="15" fill="#FFD700" />
      <path d="M25,45 A20,20 0 0,1 65,45 A10,15 0 0,1 75,60 L25,60 A10,15 0 0,1 25,45" fill="white" />
      <line x1="35" y1="70" x2="30" y2="80" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="70" x2="40" y2="80" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="55" y1="70" x2="50" y2="80" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="70" x2="60" y2="80" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
  
  export const MoonRainIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,30 A15,15 0 1,0 55,40 A15,15 0 0,1 25,30 Z" fill="#F5F3CE" />
      <path d="M25,45 A20,20 0 0,1 65,45 A10,15 0 0,1 75,60 L25,60 A10,15 0 0,1 25,45" fill="white" />
      <line x1="35" y1="70" x2="30" y2="80" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="45" y1="70" x2="40" y2="80" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="55" y1="70" x2="50" y2="80" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
      <line x1="65" y1="70" x2="60" y2="80" stroke="#4FC3F7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
  
  export const ThunderIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,40 A20,20 0 0,1 65,40 A10,15 0 0,1 75,55 L25,55 A10,15 0 0,1 25,40" fill="#9E9E9E" />
      <polygon points="45,55 35,75 45,75 40,90 60,65 50,65 55,55" fill="#FFD700" />
    </svg>
  )
  
  export const SnowIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M25,40 A20,20 0 0,1 65,40 A10,15 0 0,1 75,55 L25,55 A10,15 0 0,1 25,40" fill="white" />
      <circle cx="35" cy="70" r="3" fill="white" />
      <circle cx="45" cy="65" r="3" fill="white" />
      <circle cx="55" cy="70" r="3" fill="white" />
      <circle cx="65" cy="65" r="3" fill="white" />
      <circle cx="40" cy="75" r="3" fill="white" />
      <circle cx="50" cy="80" r="3" fill="white" />
      <circle cx="60" cy="75" r="3" fill="white" />
    </svg>
  )
  
  export const MistIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="40" x2="80" y2="40" stroke="white" strokeWidth="3" />
      <line x1="20" y1="50" x2="70" y2="50" stroke="white" strokeWidth="3" />
      <line x1="30" y1="60" x2="80" y2="60" stroke="white" strokeWidth="3" />
      <line x1="20" y1="70" x2="60" y2="70" stroke="white" strokeWidth="3" />
    </svg>
  )
  