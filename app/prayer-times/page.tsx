"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTheme as useAppTheme } from "@/contexts/theme-context"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { Clock, Search, Loader2, Timer } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface PrayerTimeData {
  name: string
  arabicName: string
  time: string
}

interface LocationData {
  city: string
  country: string
  latitude: number
  longitude: number
}

// Add this interface and city data after the existing interfaces
interface CityData {
  name: string
  country: string
  latitude: number
  longitude: number
}

export default function PrayerTimesPage() {
  const { currentTheme } = useAppTheme()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const { language } = useLanguage()
  const { toast } = useToast()

  // Prayer times state
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeData[]>([])
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [locationInput, setLocationInput] = useState("")
  const [date, setDate] = useState<string>("")

  // Add this state for suggestions after the other state declarations
  const [suggestions, setSuggestions] = useState<CityData[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Add these new state variables after the existing state declarations
  const [currentTime, setCurrentTime] = useState(new Date())
  const [nextPrayer, setNextPrayer] = useState<{
    name: string
    arabicName: string
    time: string
    timeRemaining: string
  } | null>(null)

  // Prayer times information
  const prayerTimesInfo = [
    { name: "Fajr", arabicName: "الفجر", description: "Dawn prayer, before sunrise" },
    { name: "Dhuhr", arabicName: "الظهر", description: "Midday prayer, after the sun passes its zenith" },
    {
      name: "Asr",
      arabicName: "العصر",
      description:
        "Afternoon prayer, when the shadow of an object is the same length as the object plus its shadow at noon",
    },
    { name: "Maghrib", arabicName: "المغرب", description: "Sunset prayer, after sunset" },
    { name: "Isha", arabicName: "العشاء", description: "Night prayer, after the twilight has disappeared" },
  ]

  // Add this list of common cities after the prayerTimesInfo array
  const commonCities: CityData[] = [
    { name: "Mecca", country: "Saudi Arabia", latitude: 21.4225, longitude: 39.8262 },
    { name: "Medina", country: "Saudi Arabia", latitude: 24.5247, longitude: 39.5692 },
    { name: "Cairo", country: "Egypt", latitude: 30.0444, longitude: 31.2357 },
    { name: "Istanbul", country: "Turkey", latitude: 41.0082, longitude: 28.9784 },
    { name: "Dubai", country: "UAE", latitude: 25.2048, longitude: 55.2708 },
    { name: "Riyadh", country: "Saudi Arabia", latitude: 24.7136, longitude: 46.6753 },
    { name: "Jakarta", country: "Indonesia", latitude: -6.2088, longitude: 106.8456 },
    { name: "Kuala Lumpur", country: "Malaysia", latitude: 3.139, longitude: 101.6869 },
    { name: "Karachi", country: "Pakistan", latitude: 24.8607, longitude: 67.0011 },
    { name: "Lahore", country: "Pakistan", latitude: 31.5204, longitude: 74.3587 },
    { name: "Delhi", country: "India", latitude: 28.7041, longitude: 77.1025 },
    { name: "Mumbai", country: "India", latitude: 19.076, longitude: 72.8777 },
    { name: "Dhaka", country: "Bangladesh", latitude: 23.8103, longitude: 90.4125 },
    { name: "London", country: "UK", latitude: 51.5074, longitude: -0.1278 },
    { name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 },
    { name: "New York", country: "USA", latitude: 40.7128, longitude: -74.006 },
    { name: "Los Angeles", country: "USA", latitude: 34.0522, longitude: -118.2437 },
    { name: "Toronto", country: "Canada", latitude: 43.6532, longitude: -79.3832 },
    { name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093 },
    { name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503 },
  ]

  // Format time to 12-hour format
  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":")
      const hour = Number.parseInt(hours, 10)
      const ampm = hour >= 12 ? "PM" : "AM"
      const formattedHour = hour % 12 || 12
      return `${formattedHour}:${minutes} ${ampm}`
    } catch (error) {
      return timeString
    }
  }

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoadingTimes(true)
    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            try {
              // Get location name from coordinates
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
              )
              const data = await response.json()

              const city = data.address.city || data.address.town || data.address.village || "Unknown"
              const country = data.address.country || "Unknown"

              setLocation({
                city,
                country,
                latitude,
                longitude,
              })

              // Fetch prayer times for this location
              fetchPrayerTimes(latitude, longitude)
            } catch (error) {
              console.error("Error getting location name:", error)
              setIsLoadingTimes(false)
              toast({
                title: "Error",
                description: "Failed to get your location. Using default location (Cairo, Egypt) instead.",
                variant: "destructive",
              })
              // Fall back to default location
              setLocation({
                city: "Cairo",
                country: "Egypt",
                latitude: 30.0444,
                longitude: 31.2357,
              })
              fetchPrayerTimes(30.0444, 31.2357)
            }
          },
          (error) => {
            console.error("Geolocation error:", error)
            setIsLoadingTimes(false)
            toast({
              title: "Location Access Denied",
              description: "Using default location (Cairo, Egypt) instead. You can also search for a city.",
              variant: "destructive",
            })
            // Fall back to default location
            setLocation({
              city: "Cairo",
              country: "Egypt",
              latitude: 30.0444,
              longitude: 31.2357,
            })
            fetchPrayerTimes(30.0444, 31.2357)
          },
        )
      } catch (error) {
        console.error("Geolocation API error:", error)
        setIsLoadingTimes(false)
        toast({
          title: "Geolocation Error",
          description: "Using default location (Cairo, Egypt) instead. You can also search for a city.",
          variant: "destructive",
        })
        // Fall back to default location
        setLocation({
          city: "Cairo",
          country: "Egypt",
          latitude: 30.0444,
          longitude: 31.2357,
        })
        fetchPrayerTimes(30.0444, 31.2357)
      }
    } else {
      setIsLoadingTimes(false)
      toast({
        title: "Geolocation Not Supported",
        description: "Your browser doesn't support geolocation. Using default location (Cairo, Egypt).",
        variant: "destructive",
      })
      // Fall back to default location
      setLocation({
        city: "Cairo",
        country: "Egypt",
        latitude: 30.0444,
        longitude: 31.2357,
      })
      fetchPrayerTimes(30.0444, 31.2357)
    }
  }

  // Add this function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocationInput(value)

    if (value.length > 0) {
      // Filter cities based on input
      const filtered = commonCities.filter(
        (city) =>
          city.name.toLowerCase().includes(value.toLowerCase()) ||
          city.country.toLowerCase().includes(value.toLowerCase()),
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  // Add this function to handle suggestion selection
  const handleSelectSuggestion = (city: CityData) => {
    setLocationInput(city.name)
    setShowSuggestions(false)

    // Set location and fetch prayer times
    setLocation({
      city: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    })

    fetchPrayerTimes(city.latitude, city.longitude)
    setIsLoadingTimes(true)
  }

  // Search for a location
  const searchLocation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!locationInput.trim()) return

    setIsLoadingTimes(true)
    try {
      // Get coordinates from location name
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationInput)}`,
      )
      const data = await response.json()

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0]
        const addressParts = display_name.split(", ")
        const city = addressParts[0]
        const country = addressParts[addressParts.length - 1]

        setLocation({
          city,
          country,
          latitude: Number.parseFloat(lat),
          longitude: Number.parseFloat(lon),
        })

        // Fetch prayer times for this location
        fetchPrayerTimes(Number.parseFloat(lat), Number.parseFloat(lon))
      } else {
        setIsLoadingTimes(false)
        toast({
          title: "Location Not Found",
          description: "Could not find the location you entered. Please try a different search term.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error searching location:", error)
      setIsLoadingTimes(false)
      toast({
        title: "Search Error",
        description: "An error occurred while searching for the location. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Fetch prayer times from API
  const fetchPrayerTimes = async (latitude: number, longitude: number) => {
    try {
      // Get current date
      const today = new Date()
      const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`

      // Fetch prayer times from API
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${formattedDate}?latitude=${latitude}&longitude=${longitude}&method=2`,
      )
      const data = await response.json()

      if (data && data.data && data.data.timings) {
        const timings = data.data.timings
        const date = data.data.date.readable
        setDate(date)

        // Format prayer times
        const formattedTimes: PrayerTimeData[] = [
          { name: "Fajr", arabicName: "الفجر", time: formatTime(timings.Fajr) },
          { name: "Sunrise", arabicName: "الشروق", time: formatTime(timings.Sunrise) },
          { name: "Dhuhr", arabicName: "الظهر", time: formatTime(timings.Dhuhr) },
          { name: "Asr", arabicName: "العصر", time: formatTime(timings.Asr) },
          { name: "Maghrib", arabicName: "المغرب", time: formatTime(timings.Maghrib) },
          { name: "Isha", arabicName: "العشاء", time: formatTime(timings.Isha) },
        ]

        setPrayerTimes(formattedTimes)
      } else {
        throw new Error("Invalid response from prayer times API")
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error)
      toast({
        title: "Error",
        description: "Failed to fetch prayer times. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingTimes(false)
    }
  }

  // Add this useEffect to update the current time and calculate next prayer
  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      calculateNextPrayer()
    }, 1000)

    // Calculate next prayer time
    const calculateNextPrayer = () => {
      if (prayerTimes.length === 0) return

      const now = new Date()
      const currentHours = now.getHours()
      const currentMinutes = now.getMinutes()
      const currentTimeInMinutes = currentHours * 60 + currentMinutes

      // Convert prayer times to minutes for comparison
      const prayerTimesInMinutes = prayerTimes.map((prayer) => {
        const [hoursStr, minutesStr] = prayer.time.split(":")
        const [hours, minutes] = [Number.parseInt(hoursStr), Number.parseInt(minutesStr)]
        const isPM = prayer.time.toLowerCase().includes("pm")
        const adjustedHours = isPM && hours !== 12 ? hours + 12 : !isPM && hours === 12 ? 0 : hours
        return {
          name: prayer.name,
          arabicName: prayer.arabicName,
          time: prayer.time,
          timeInMinutes: adjustedHours * 60 + minutes,
        }
      })

      // Find the next prayer
      let nextPrayerInfo = null

      // First check if any prayer is later today
      for (const prayer of prayerTimesInMinutes) {
        if (prayer.timeInMinutes > currentTimeInMinutes) {
          nextPrayerInfo = prayer
          break
        }
      }

      // If no prayer is found, the next prayer is the first prayer of tomorrow
      if (!nextPrayerInfo && prayerTimesInMinutes.length > 0) {
        nextPrayerInfo = prayerTimesInMinutes[0]
        // Add 24 hours (1440 minutes) for tomorrow's prayer
        nextPrayerInfo.timeInMinutes += 1440
      }

      if (nextPrayerInfo) {
        // Calculate time remaining
        let minutesRemaining = nextPrayerInfo.timeInMinutes - currentTimeInMinutes
        if (minutesRemaining < 0) {
          minutesRemaining += 1440 // Add 24 hours if it's tomorrow
        }

        const hoursRemaining = Math.floor(minutesRemaining / 60)
        const remainingMinutes = minutesRemaining % 60
        const secondsRemaining = 60 - now.getSeconds()

        const timeRemaining = `${hoursRemaining}h ${remainingMinutes}m ${secondsRemaining}s`

        setNextPrayer({
          name: nextPrayerInfo.name,
          arabicName: nextPrayerInfo.arabicName,
          time: nextPrayerInfo.time,
          timeRemaining,
        })
      }
    }

    // Initial calculation
    calculateNextPrayer()

    return () => clearInterval(timer)
  }, [prayerTimes, currentTime])

  // Add this function to format the current time
  const formatCurrentTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    return `${formattedHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`
  }

  // Try to get user's location when the page loads
  useEffect(() => {
    if (!location && !isLoadingTimes) {
      // Set Cairo, Egypt as default location instead of using geolocation
      setLocation({
        city: "Cairo",
        country: "Egypt",
        latitude: 30.0444,
        longitude: 31.2357,
      })

      // Fetch prayer times for Cairo
      fetchPrayerTimes(30.0444, 31.2357)
    }
  }, [])

  return (
    <div
      className={cn(
        "min-h-[calc(100vh-4rem)] py-8 px-4",
        isDark ? "bg-gradient-to-b from-gray-900 to-gray-800" : `bg-gradient-to-b ${currentTheme.gradient}`,
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={cn("text-3xl font-bold mb-2", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
            {language === "arabic" ? "أوقات الصلاة" : "Prayer Times"}
          </h1>
          {language === "mixed" && (
            <h2 className={cn("text-xl font-semibold", isDark ? "text-emerald-300" : currentTheme.textSecondary)}>
              أوقات الصلاة
            </h2>
          )}
          <p className={cn("mt-4 max-w-3xl mx-auto", isDark ? "text-gray-300" : "text-gray-600")}>
            {language === "arabic"
              ? "يجب على المسلمين الصلاة خمس مرات في اليوم في أوقات محددة."
              : "Muslims are required to pray five times a day at specific times."}
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            {/* Location search */}
            <div className="mb-6">
              <form onSubmit={searchLocation} className="flex flex-col md:flex-row gap-2 max-w-md mx-auto">
                {/* Replace the Input element and its surrounding code with this updated version */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={language === "arabic" ? "ابحث عن مدينة..." : "Search for a city..."}
                    value={locationInput}
                    onChange={handleInputChange}
                    className={cn("pl-9", isDark && "bg-gray-700 border-gray-600 text-white placeholder:text-gray-400")}
                    onFocus={() =>
                      locationInput.length > 0 &&
                      setSuggestions(
                        commonCities.filter(
                          (city) =>
                            city.name.toLowerCase().includes(locationInput.toLowerCase()) ||
                            city.country.toLowerCase().includes(locationInput.toLowerCase()),
                        ),
                      )
                    }
                    onBlur={() => {
                      // Delay hiding suggestions to allow for clicks
                      setTimeout(() => setShowSuggestions(false), 200)
                    }}
                  />

                  {/* Suggestions dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div
                      className={cn(
                        "absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-md py-1 shadow-lg",
                        isDark ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200",
                      )}
                    >
                      {suggestions.map((city, index) => (
                        <div
                          key={index}
                          className={cn(
                            "px-4 py-2 cursor-pointer flex justify-between",
                            isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
                          )}
                          onMouseDown={() => handleSelectSuggestion(city)}
                        >
                          <span className={isDark ? "text-white" : "text-gray-900"}>{city.name}</span>
                          <span className={isDark ? "text-gray-400" : "text-gray-500"}>{city.country}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className={cn(isDark ? "bg-emerald-700 hover:bg-emerald-800" : currentTheme.primary)}
                  disabled={isLoadingTimes}
                >
                  {isLoadingTimes ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : language === "arabic" ? (
                    "بحث"
                  ) : (
                    "Search"
                  )}
                </Button>
              </form>
            </div>

            {/* Prayer times display */}
            {isLoadingTimes ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2
                  className={cn("h-12 w-12 animate-spin mb-4", isDark ? "text-emerald-400" : currentTheme.textPrimary)}
                />
                <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                  {language === "arabic" ? "جاري تحميل أوقات الصلاة..." : "Loading prayer times..."}
                </p>
              </div>
            ) : location && prayerTimes.length > 0 ? (
              <div>
                <div className="text-center mb-4">
                  <h3 className={cn("text-xl font-semibold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                    {language === "arabic"
                      ? `أوقات الصلاة في ${location.city}، ${location.country}`
                      : `Prayer Times in ${location.city}, ${location.country}`}
                  </h3>
                  <p className={cn("text-sm mt-1", isDark ? "text-gray-400" : "text-gray-500")}>{date}</p>

                  {/* Current time and next prayer display */}
                  <div className="mt-4 mb-6 flex flex-col md:flex-row justify-center items-center gap-4">
                    <div
                      className={cn(
                        "px-4 py-3 rounded-lg flex items-center gap-2",
                        isDark ? "bg-gray-700" : "bg-emerald-50",
                      )}
                    >
                      <Clock className={cn("h-5 w-5", isDark ? "text-emerald-400" : currentTheme.textPrimary)} />
                      <div>
                        <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                          {language === "arabic" ? "الوقت الحالي" : "Current Time"}
                        </p>
                        <p className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-800")}>
                          {formatCurrentTime(currentTime)}
                        </p>
                      </div>
                    </div>

                    {nextPrayer && (
                      <div
                        className={cn(
                          "px-4 py-3 rounded-lg flex items-center gap-2",
                          isDark ? "bg-gray-700" : "bg-emerald-50",
                        )}
                      >
                        <Timer className={cn("h-5 w-5", isDark ? "text-emerald-400" : currentTheme.textPrimary)} />
                        <div>
                          <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
                            {language === "arabic" ? "الصلاة القادمة" : "Next Prayer"}
                          </p>
                          <p className={cn("text-xl font-bold", isDark ? "text-white" : "text-gray-800")}>
                            {language === "arabic" ? nextPrayer.arabicName : nextPrayer.name} ({nextPrayer.time})
                          </p>
                          <p className={cn("text-sm", isDark ? "text-emerald-300" : currentTheme.textSecondary)}>
                            {language === "arabic" ? "متبقي: " : "Time remaining: "}
                            <span className="font-medium">{nextPrayer.timeRemaining}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {prayerTimes.map((prayer) => (
                    <div
                      key={prayer.name}
                      className={cn(
                        "p-4 rounded-lg flex justify-between items-center",
                        isDark ? "bg-gray-700" : "bg-emerald-50",
                      )}
                    >
                      <div>
                        <h4 className={cn("font-semibold", isDark ? "text-white" : "text-gray-800")}>
                          {language === "arabic" ? prayer.arabicName : prayer.name}
                        </h4>
                        {language === "mixed" && (
                          <p className={cn("text-sm", isDark ? "text-emerald-300" : currentTheme.textSecondary)}>
                            {prayer.arabicName}
                          </p>
                        )}
                      </div>
                      <div className={cn("text-xl font-bold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                        {prayer.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Prayer times information */}
                <div className="space-y-4">
                  {prayerTimesInfo.map((prayer, index) => (
                    <div
                      key={prayer.name}
                      className={cn(
                        "p-4 rounded-lg flex flex-col md:flex-row md:items-center",
                        isDark ? "bg-gray-700" : "bg-emerald-50",
                      )}
                    >
                      <div className="md:w-1/4 mb-2 md:mb-0">
                        <h3
                          className={cn(
                            "text-xl font-semibold",
                            isDark ? "text-emerald-400" : currentTheme.textPrimary,
                          )}
                        >
                          {language === "arabic" ? prayer.arabicName : prayer.name}
                        </h3>
                        {language === "mixed" && (
                          <h4 className={cn("text-lg", isDark ? "text-emerald-300" : currentTheme.textSecondary)}>
                            {prayer.arabicName}
                          </h4>
                        )}
                      </div>
                      <div className="md:w-3/4">
                        <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                          {language === "arabic"
                            ? prayer.name === "Fajr"
                              ? "صلاة الفجر، تؤدى قبل شروق الشمس"
                              : prayer.name === "Dhuhr"
                                ? "صلاة الظهر، تؤدى بعد زوال الشمس عن وسط السماء"
                                : prayer.name === "Asr"
                                  ? "صلاة العصر، تؤدى عندما يصبح ظل الشيء مساوياً لطوله بالإضافة إلى ظله وقت الزوال"
                                  : prayer.name === "Maghrib"
                                    ? "صلاة المغرب، تؤدى بعد غروب الشمس"
                                    : "صلاة العشاء، تؤدى بعد اختفاء الشفق"
                            : prayer.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 p-4 rounded-lg bg-opacity-50 border border-dashed">
              <h3
                className={cn(
                  "text-lg font-semibold mb-2 text-center",
                  isDark ? "text-emerald-400" : currentTheme.textPrimary,
                )}
              >
                {language === "arabic" ? "ملاحظات مهمة حول أوقات الصلاة" : "Important Notes About Prayer Times"}
              </h3>
              <ul className={cn("list-disc list-inside space-y-2", isDark ? "text-gray-300" : "text-gray-600")}>
                {language === "arabic" ? (
                  <>
                    <li>تختلف أوقات الصلاة حسب الموقع الجغرافي ووقت السنة.</li>
                    <li>يستحب أداء الصلاة في أول وقتها.</li>
                    <li>هناك ثلاثة أوقات يُنهى عن الصلاة فيها: عند شروق الشمس، وعند استواء الشمس، وعند غروب الشمس.</li>
                    <li>توفر العديد من تطبيقات الهاتف المحمول والمواقع الإلكترونية أوقات صلاة دقيقة بناءً على موقعك.</li>
                    <li>يُرفع الأذان للإعلام بدخول وقت الصلاة.</li>
                  </>
                ) : (
                  <>
                    <li>Prayer times vary based on geographical location and time of year.</li>
                    <li>It is recommended to pray as soon as the time for prayer enters.</li>
                    <li>
                      There are three times when prayer is forbidden: during sunrise, when the sun is at its zenith, and
                      during sunset.
                    </li>
                    <li>Many mobile apps and websites provide accurate prayer times based on your location.</li>
                    <li>
                      The Adhan (call to prayer) is announced to inform Muslims that the time for prayer has entered.
                    </li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
            {language === "arabic"
              ? "ملاحظة: أوقات الصلاة المعروضة تقريبية. يرجى التحقق من المصادر المحلية للحصول على أوقات دقيقة."
              : "Note: Prayer times shown are approximate. Please check with local sources for precise timings."}
          </p>
        </div>
      </div>
    </div>
  )
}
