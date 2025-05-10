import { Sun } from "lucide-react"

const DayForecast = ({ sunrise, sunset, date }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
  }

  const sunriseTime = formatTime(sunrise)
  const sunsetTime = formatTime(sunset)

  // Calculate dates for display
  const today = new Date(date)
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const friday = new Date(today)
  while (friday.getDay() !== 5) {
    // 5 is Friday
    friday.setDate(friday.getDate() + 1)
  }

  const formatDate = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${monthNames[date.getMonth()]} ${date.getDate()}`
  }

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-3xl">
      <div className="flex justify-between mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-400">Yesterday</p>
          <p className="text-xs text-gray-500">{formatDate(yesterday)}</p>
        </div>
        <div className="text-center bg-gradient-to-b from-[#ff4d8f] to-[#ff8d64] px-4 py-2 rounded-full">
          <p className="font-medium">Today</p>
          <p className="text-xs">{formatDate(today)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Tomorrow</p>
          <p className="text-xs text-gray-500">{formatDate(tomorrow)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-400">Friday</p>
          <p className="text-xs text-gray-500">{formatDate(friday)}</p>
        </div>
      </div>

      <div className="relative">
        <div className="w-full h-0.5 bg-gray-700 rounded-full mb-2"></div>
        <div className="flex justify-between">
          <div className="text-center">
            <p className="text-xl">{sunriseTime}</p>
            <p className="text-xs text-gray-400">sunrise</p>
          </div>

          <div className="absolute left-1/2 -top-4 transform -translate-x-1/2">
            <Sun className="text-yellow-400" size={24} />
          </div>

          <div className="text-center">
            <p className="text-xl">{sunsetTime}</p>
            <p className="text-xs text-gray-400">sunset</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayForecast
