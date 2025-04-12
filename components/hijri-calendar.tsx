"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTheme as useAppTheme } from "@/contexts/theme-context"
import { HijriDate } from "@/lib/hijri-date"
import { useTheme } from "next-themes"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { hasEvent, getEventsForDate, getNextIslamicEvent } from "@/lib/islamic-events"

export function HijriCalendar() {
  const [currentDate, setCurrentDate] = useState(new HijriDate())
  const [calendarDays, setCalendarDays] = useState<
    Array<{ date: number; month: number; year: number; isCurrentMonth: boolean }>
  >([])
  const [selectedDay, setSelectedDay] = useState<{
    date: number
    month: number
    year: number
  } | null>(null)
  const { currentTheme } = useAppTheme()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Generate calendar days for the current month
  useEffect(() => {
    const days = []
    const daysInMonth = HijriDate.getDaysInMonth(currentDate.year, currentDate.month)

    // Get the first day of the month
    const firstDay = new HijriDate(currentDate.year, currentDate.month, 1)
    const startingDayOfWeek = firstDay.day

    // Add days from previous month to fill the first row
    const prevMonth = currentDate.month === 1 ? 12 : currentDate.month - 1
    const prevYear = currentDate.month === 1 ? currentDate.year - 1 : currentDate.year
    const daysInPrevMonth = HijriDate.getDaysInMonth(prevYear, prevMonth)

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.unshift({
        date: daysInPrevMonth - i,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
      })
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        month: currentDate.month,
        year: currentDate.year,
        isCurrentMonth: true,
      })
    }

    // Add days from next month to complete the grid
    const nextMonth = currentDate.month === 12 ? 1 : currentDate.month + 1
    const nextYear = currentDate.month === 12 ? currentDate.year + 1 : currentDate.year
    const remainingDays = 42 - days.length // 6 rows of 7 days

    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
      })
    }

    setCalendarDays(days)
  }, [currentDate])

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 1) {
        return new HijriDate(prev.year - 1, 12, 1)
      } else {
        return new HijriDate(prev.year, prev.month - 1, 1)
      }
    })
  }

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      if (prev.month === 12) {
        return new HijriDate(prev.year + 1, 1, 1)
      } else {
        return new HijriDate(prev.year, prev.month + 1, 1)
      }
    })
  }

  const today = new HijriDate()
  const nextEvent = getNextIslamicEvent(today)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new HijriDate())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const handleDayClick = (day: { date: number; month: number; year: number }) => {
    setSelectedDay(day)
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto", isDark && "bg-gray-800 border-gray-700")}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <CardTitle className={cn("text-center", isDark && "text-white")}>
            <div className="flex flex-col items-center">
              <span className="text-lg">
                {currentDate.getMonthName("en")} {currentDate.year}
              </span>
              <span className={cn("text-sm", isDark ? "text-gray-400" : "text-muted-foreground")}>
                {currentDate.getMonthName("ar")}
              </span>
            </div>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day names */}
        <div className="grid grid-cols-7 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div
              key={day}
              className={cn(
                "text-center text-sm font-medium py-1",
                index === 5 && "text-emerald-500", // Friday
                isDark && index !== 5 && "text-gray-300",
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          <TooltipProvider>
            {calendarDays.map((day, index) => {
              const isToday = day.date === today.date && day.month === today.month && day.year === today.year
              const isSelected =
                selectedDay &&
                day.date === selectedDay.date &&
                day.month === selectedDay.month &&
                day.year === selectedDay.year
              const hasIslamicEvent = hasEvent(day.month, day.date)
              const events = getEventsForDate(day.month, day.date)

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => handleDayClick(day)}
                      className={cn(
                        "h-9 flex items-center justify-center rounded-md text-sm transition-all duration-200 relative",
                        !day.isCurrentMonth && isDark ? "text-gray-600 opacity-50" : "text-muted-foreground opacity-50",
                        isToday &&
                          (isDark
                            ? "bg-emerald-700 text-white font-bold ring-2 ring-emerald-400 ring-offset-1 ring-offset-gray-900 scale-110"
                            : `${currentTheme.primary} text-white font-bold ring-2 ring-emerald-300 ring-offset-1 ring-offset-white scale-110`),
                        isSelected &&
                          !isToday &&
                          (isDark
                            ? "bg-gray-700 text-white ring-1 ring-emerald-500"
                            : "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-400"),
                        day.isCurrentMonth && !isToday && !isSelected && "hover:bg-accent cursor-pointer",
                        isDark && day.isCurrentMonth && !isToday && !isSelected && "text-gray-300 hover:bg-gray-700",
                      )}
                    >
                      {day.date}
                      {hasIslamicEvent && day.isCurrentMonth && (
                        <span
                          className={cn(
                            "absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full",
                            isToday ? "bg-white" : isDark ? "bg-emerald-400" : "bg-emerald-500",
                          )}
                        />
                      )}
                    </div>
                  </TooltipTrigger>
                  {hasIslamicEvent && (
                    <TooltipContent>
                      <div className="max-w-xs">
                        {events.map((event, i) => (
                          <div key={i} className="mb-1 last:mb-0">
                            <p className="font-semibold">{event.name}</p>
                            <p className="text-xs">{event.arabicName}</p>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </div>

        {/* Today's date display */}
        <div className="mt-4">
          <div
            className={cn(
              "px-6 py-4 rounded-lg text-center",
              isDark
                ? "bg-gray-700 border border-emerald-700"
                : `${currentTheme.primaryLight} border border-emerald-200`,
            )}
          >
            <div className={cn("text-sm font-medium mb-1", isDark ? "text-emerald-400" : currentTheme.textSecondary)}>
              Today
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className={cn("text-2xl font-bold", isDark ? "text-emerald-400" : currentTheme.textPrimary)}>
                {today.date} {today.getMonthName("en")} {today.year}
              </span>
              <span className={cn("text-sm text-right", isDark ? "text-gray-400" : "")} dir="rtl">
                {today.date} {today.getMonthName("ar")} {today.year}
              </span>
            </div>
          </div>
        </div>

        {/* Next Islamic Event */}
        {nextEvent && (
          <div className="mt-4">
            <div
              className={cn(
                "px-4 py-3 rounded-lg",
                isDark ? "bg-gray-700 border border-emerald-800" : "bg-emerald-50 border border-emerald-100",
              )}
            >
              <div className="flex items-start gap-2">
                <Info className={cn("h-5 w-5 mt-0.5", isDark ? "text-emerald-400" : "text-emerald-600")} />
                <div>
                  <h4 className={cn("font-medium", isDark ? "text-white" : "text-gray-800")}>Next Islamic Event</h4>
                  <p className={cn("text-sm font-semibold", isDark ? "text-emerald-400" : "text-emerald-700")}>
                    {nextEvent.name} ({nextEvent.arabicName})
                  </p>
                  <p className={cn("text-xs", isDark ? "text-gray-300" : "text-gray-600")}>
                    {nextEvent.day} {today.getMonthName("en")} {today.year}
                  </p>
                  <p className={cn("text-xs mt-1", isDark ? "text-gray-400" : "text-gray-500")}>
                    {nextEvent.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Selected Day Events */}
        {selectedDay &&
          selectedDay.isCurrentMonth &&
          getEventsForDate(selectedDay.month, selectedDay.date).length > 0 && (
            <div className="mt-4">
              <div className={cn("px-4 py-3 rounded-lg", isDark ? "bg-gray-700" : "bg-gray-50")}>
                <h4 className={cn("font-medium mb-2", isDark ? "text-white" : "text-gray-800")}>
                  Events on {selectedDay.date} {currentDate.getMonthName("en")}
                </h4>
                {getEventsForDate(selectedDay.month, selectedDay.date).map((event, i) => (
                  <div key={i} className="mb-2 last:mb-0">
                    <p className={cn("font-semibold", isDark ? "text-emerald-400" : "text-emerald-700")}>
                      {event.name}
                    </p>
                    <p className={cn("text-xs", isDark ? "text-gray-300" : "text-gray-600")}>{event.arabicName}</p>
                    <p className={cn("text-xs mt-1", isDark ? "text-gray-400" : "text-gray-500")}>
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  )
}
