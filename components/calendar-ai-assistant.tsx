"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useTheme as useAppTheme } from "@/contexts/theme-context"
import { useTheme } from "next-themes"
import { HijriDate } from "@/lib/hijri-date"
import { getNextIslamicEvent } from "@/lib/islamic-events"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function CalendarAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Ask me anything about the Hijri calendar, Islamic dates, or upcoming events. For example: 'When is Ramadan this year?' or 'What is the significance of Laylat al-Qadr?'",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { currentTheme } = useAppTheme()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Generate a unique ID for messages
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Get current Hijri date for context
      const today = new HijriDate()
      const nextEvent = getNextIslamicEvent(today)

      // Format the prompt with context
      const prompt = `
        As an AI assistant specializing in the Islamic Hijri calendar, please answer the following question:
        
        "${input}"
        
        Today's Hijri date is: ${today.date} ${today.getMonthName("en")} ${today.year} AH
        
        ${nextEvent ? `The next upcoming Islamic event is ${nextEvent.name} (${nextEvent.arabicName}) on ${nextEvent.day} ${today.getMonthName("en")}` : ""}
        
        Please provide a concise, accurate answer based on Islamic knowledge. If the question is about dates, include both Hijri and Gregorian dates if relevant.
      `

      // Call the Gemini API
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAfKQN2Jb1YVEWfPt9IxweKrHF928rL59c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }],
              },
            ],
          }),
        },
      )

      if (!response.ok) {
        throw new Error(`Failed to get response: ${response.status}`)
      }

      const data = await response.json()
      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I apologize, but I couldn't generate a response at this time. Please try again with a different question about the Islamic calendar."

      // Add AI response
      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: aiResponse,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error fetching from AI API:", error)

      // Add error message
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: "I apologize, but I encountered an error while processing your request. Please try again later.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn("w-full max-w-md mx-auto mt-8", isDark && "bg-gray-800 border-gray-700")}>
      <CardHeader className={cn("pb-2 border-b", isDark ? "border-gray-700" : "border-gray-200")}>
        <CardTitle className={cn("flex items-center gap-2", isDark && "text-white")}>
          <Calendar className={cn("h-5 w-5", isDark ? "text-emerald-400" : currentTheme.textPrimary)} />
          <span>Hijri Calendar Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "mb-4 p-3 rounded-lg max-w-[85%]",
                message.role === "user"
                  ? "ml-auto bg-emerald-600 text-white"
                  : isDark
                    ? "bg-gray-700 text-gray-100"
                    : "bg-gray-100 text-gray-800",
              )}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div
              className={cn(
                "mb-4 p-3 rounded-lg max-w-[85%]",
                isDark ? "bg-gray-700 text-gray-100" : "bg-gray-100 text-gray-800",
              )}
            >
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Islamic dates..."
            className={cn(isDark && "bg-gray-700 border-gray-600 text-white")}
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading}
            className={cn(isDark ? "bg-emerald-700 hover:bg-emerald-800" : currentTheme.primary)}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
