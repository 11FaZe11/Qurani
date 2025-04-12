"use client"

import { HijriCalendar } from "@/components/hijri-calendar"
import { CalendarAIAssistant } from "@/components/calendar-ai-assistant"
import { useTheme as useAppTheme } from "@/contexts/theme-context"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Bot } from "lucide-react"

export default function CalendarPage() {
  const { currentTheme } = useAppTheme()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={cn(
        "min-h-[calc(100vh-4rem)] py-8 px-4",
        isDark ? "bg-gradient-to-b from-gray-900 to-gray-800" : `bg-gradient-to-b ${currentTheme.gradient}`,
      )}
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className={cn("text-3xl font-bold mb-2 text-center", isDark ? "text-emerald-400" : currentTheme.textPrimary)}
        >
          Hijri Calendar - Islamic Dates
        </h1>
        <p className={cn("text-center mb-8", isDark ? "text-gray-300" : "text-gray-600")}>
          Track important Islamic dates and events with our intelligent Hijri calendar
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-center">
              <HijriCalendar />
            </div>
          </div>

          <div className="space-y-6">
            <CalendarAIAssistant />

            <Card className={cn(isDark && "bg-gray-800 border-gray-700")}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Calendar className={cn("h-6 w-6 mt-1", isDark ? "text-emerald-400" : currentTheme.textPrimary)} />
                  <div>
                    <h2
                      className={cn(
                        "text-xl font-semibold mb-2",
                        isDark ? "text-emerald-400" : currentTheme.textPrimary,
                      )}
                    >
                      About the Hijri Calendar
                    </h2>
                    <p className={cn("mb-4", isDark ? "text-gray-300" : "text-gray-600")}>
                      The Hijri calendar is a lunar calendar consisting of 12 lunar months in a year of 354 or 355 days.
                      It is used to determine Islamic holidays and rituals, such as the annual period of fasting and the
                      proper time for the Hajj pilgrimage.
                    </p>
                    <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                      The calendar begins with the emigration of Muhammad from Mecca to Medina in 622 CE, known as the
                      Hijra. The current year in the Islamic calendar is 1445 AH (Anno Hegirae).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={cn(isDark && "bg-gray-800 border-gray-700")}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Bot className={cn("h-6 w-6 mt-1", isDark ? "text-emerald-400" : currentTheme.textPrimary)} />
                  <div>
                    <h2
                      className={cn(
                        "text-xl font-semibold mb-2",
                        isDark ? "text-emerald-400" : currentTheme.textPrimary,
                      )}
                    >
                      AI Calendar Assistant
                    </h2>
                    <p className={cn("mb-4", isDark ? "text-gray-300" : "text-gray-600")}>
                      Our intelligent Hijri Calendar Assistant can answer your questions about Islamic dates, events,
                      and holidays. Ask about the significance of special days, when upcoming events will occur, or
                      historical information about the Islamic calendar.
                    </p>
                    <p className={cn(isDark ? "text-gray-300" : "text-gray-600")}>
                      The assistant uses AI to provide accurate information about Islamic dates in both the Hijri and
                      Gregorian calendars, helping you stay connected with important religious events throughout the
                      year.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>
            Note: Islamic dates may vary slightly based on moon sighting. The calendar provides approximate dates for
            planning purposes.
          </p>
        </div>
      </div>
    </div>
  )
}
