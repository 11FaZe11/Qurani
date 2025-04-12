import type { HijriDate } from "@/lib/hijri-date"

export interface IslamicEvent {
  month: number
  day: number
  name: string
  arabicName: string
  description: string
  type: "holiday" | "significant" | "historical" | "night"
}

// Important Islamic dates and events
export const islamicEvents: IslamicEvent[] = [
  {
    month: 1,
    day: 1,
    name: "Islamic New Year",
    arabicName: "رأس السنة الهجرية",
    description:
      "The beginning of the Islamic lunar calendar year, marking the migration (Hijra) of Prophet Muhammad from Mecca to Medina.",
    type: "holiday",
  },
  {
    month: 1,
    day: 10,
    name: "Day of Ashura",
    arabicName: "يوم عاشوراء",
    description:
      "A day of fasting that commemorates the exodus of Moses and the Israelites from Egypt, and the martyrdom of Imam Hussein.",
    type: "significant",
  },
  {
    month: 3,
    day: 12,
    name: "Mawlid al-Nabi",
    arabicName: "المولد النبوي",
    description: "Celebration of the birth of Prophet Muhammad.",
    type: "holiday",
  },
  {
    month: 7,
    day: 27,
    name: "Laylat al-Miraj",
    arabicName: "ليلة المعراج",
    description: "The Night Journey and Ascension of Prophet Muhammad to heaven.",
    type: "night",
  },
  {
    month: 8,
    day: 15,
    name: "Laylat al-Bara'ah",
    arabicName: "ليلة البراءة",
    description: "The Night of Forgiveness, when Allah forgives sinners.",
    type: "night",
  },
  {
    month: 9,
    day: 1,
    name: "First day of Ramadan",
    arabicName: "أول رمضان",
    description: "The beginning of the month of fasting.",
    type: "holiday",
  },
  {
    month: 9,
    day: 27,
    name: "Laylat al-Qadr",
    arabicName: "ليلة القدر",
    description: "The Night of Power, when the first verses of the Quran were revealed to Prophet Muhammad.",
    type: "night",
  },
  {
    month: 10,
    day: 1,
    name: "Eid al-Fitr",
    arabicName: "عيد الفطر",
    description: "Festival of Breaking the Fast, celebrating the end of Ramadan.",
    type: "holiday",
  },
  {
    month: 12,
    day: 8,
    name: "Day of Arafah",
    arabicName: "يوم عرفة",
    description: "The second day of the Hajj pilgrimage, when pilgrims gather at Mount Arafat.",
    type: "significant",
  },
  {
    month: 12,
    day: 10,
    name: "Eid al-Adha",
    arabicName: "عيد الأضحى",
    description: "Festival of the Sacrifice, commemorating Prophet Ibrahim's willingness to sacrifice his son.",
    type: "holiday",
  },
  {
    month: 12,
    day: 11,
    name: "Days of Tashreeq",
    arabicName: "أيام التشريق",
    description: "The three days following Eid al-Adha, part of the Hajj pilgrimage.",
    type: "significant",
  },
]

// Function to get events for a specific month
export function getEventsForMonth(month: number): IslamicEvent[] {
  return islamicEvents.filter((event) => event.month === month)
}

// Function to get events for a specific date
export function getEventsForDate(month: number, day: number): IslamicEvent[] {
  return islamicEvents.filter((event) => event.month === month && event.day === day)
}

// Function to check if a date has an event
export function hasEvent(month: number, day: number): boolean {
  return islamicEvents.some((event) => event.month === month && event.day === day)
}

// Function to get the next upcoming Islamic event
export function getNextIslamicEvent(currentDate: HijriDate): IslamicEvent | null {
  // Sort events by their occurrence in the year
  const sortedEvents = [...islamicEvents].sort((a, b) => {
    if (a.month !== b.month) {
      return a.month - b.month
    }
    return a.day - b.day
  })

  // Find the next event
  for (const event of sortedEvents) {
    if (event.month > currentDate.month || (event.month === currentDate.month && event.day >= currentDate.date)) {
      return event
    }
  }

  // If no upcoming events in this year, return the first event of next year
  return sortedEvents[0]
}
