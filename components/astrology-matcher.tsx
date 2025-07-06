"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface User {
  id: string
  name: string
  age: number
  birthDate: string
  birthTime: string
  birthPlace: string
  avatar: string
}

interface AstrologyMatcherProps {
  user: User
  permissions: string[]
  onStartChat: (userId: string) => void
}

interface ZodiacMatch {
  id: string
  name: string
  age: number
  zodiacSign: string
  compatibility: number
  avatar: string
  birthChart: {
    sun: string
    moon: string
    rising: string
  }
}

export function AstrologyMatcher({ user, permissions, onStartChat }: AstrologyMatcherProps) {
  const [userZodiac, setUserZodiac] = useState<string>("")
  const [matches, setMatches] = useState<ZodiacMatch[]>([])
  const [loading, setLoading] = useState(true)

  // Calculate zodiac sign from birth date
  const calculateZodiacSign = (birthDate: string): string => {
    const date = new Date(birthDate)
    const month = date.getMonth() + 1
    const day = date.getDate()

    const zodiacSigns = [
      { sign: "Capricorn", start: [12, 22], end: [1, 19] },
      { sign: "Aquarius", start: [1, 20], end: [2, 18] },
      { sign: "Pisces", start: [2, 19], end: [3, 20] },
      { sign: "Aries", start: [3, 21], end: [4, 19] },
      { sign: "Taurus", start: [4, 20], end: [5, 20] },
      { sign: "Gemini", start: [5, 21], end: [6, 20] },
      { sign: "Cancer", start: [6, 21], end: [7, 22] },
      { sign: "Leo", start: [7, 23], end: [8, 22] },
      { sign: "Virgo", start: [8, 23], end: [9, 22] },
      { sign: "Libra", start: [9, 23], end: [10, 22] },
      { sign: "Scorpio", start: [10, 23], end: [11, 21] },
      { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
    ]

    for (const zodiac of zodiacSigns) {
      const [startMonth, startDay] = zodiac.start
      const [endMonth, endDay] = zodiac.end

      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return zodiac.sign
      }
    }

    return "Capricorn" // Default fallback
  }

  // Calculate compatibility score
  const calculateCompatibility = (sign1: string, sign2: string): number => {
    const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
      Aries: { Leo: 95, Sagittarius: 90, Gemini: 85, Aquarius: 80, Aries: 75 },
      Taurus: { Virgo: 95, Capricorn: 90, Cancer: 85, Pisces: 80, Taurus: 75 },
      Gemini: { Libra: 95, Aquarius: 90, Aries: 85, Leo: 80, Gemini: 75 },
      Cancer: { Scorpio: 95, Pisces: 90, Taurus: 85, Virgo: 80, Cancer: 75 },
      Leo: { Aries: 95, Sagittarius: 90, Gemini: 85, Libra: 80, Leo: 75 },
      Virgo: { Taurus: 95, Capricorn: 90, Cancer: 85, Scorpio: 80, Virgo: 75 },
      Libra: { Gemini: 95, Aquarius: 90, Leo: 85, Sagittarius: 80, Libra: 75 },
      Scorpio: { Cancer: 95, Pisces: 90, Virgo: 85, Capricorn: 80, Scorpio: 75 },
      Sagittarius: { Leo: 95, Aries: 90, Libra: 85, Aquarius: 80, Sagittarius: 75 },
      Capricorn: { Virgo: 95, Taurus: 90, Scorpio: 85, Pisces: 80, Capricorn: 75 },
      Aquarius: { Libra: 95, Gemini: 90, Sagittarius: 85, Aries: 80, Aquarius: 75 },
      Pisces: { Scorpio: 95, Cancer: 90, Capricorn: 85, Taurus: 80, Pisces: 75 },
    }

    return compatibilityMatrix[sign1]?.[sign2] || Math.floor(Math.random() * 40) + 40
  }

  useEffect(() => {
    // Simulate birth chart analysis
    const zodiac = calculateZodiacSign(user.birthDate)
    setUserZodiac(zodiac)

    // Generate mock matches based on zodiac compatibility
    const mockMatches: ZodiacMatch[] = [
      {
        id: "2",
        name: "Emma Wilson",
        age: 26,
        zodiacSign: "Leo",
        compatibility: calculateCompatibility(zodiac, "Leo"),
        avatar: "/placeholder.svg?height=100&width=100",
        birthChart: { sun: "Leo", moon: "Gemini", rising: "Libra" },
      },
      {
        id: "3",
        name: "Sofia Martinez",
        age: 29,
        zodiacSign: "Sagittarius",
        compatibility: calculateCompatibility(zodiac, "Sagittarius"),
        avatar: "/placeholder.svg?height=100&width=100",
        birthChart: { sun: "Sagittarius", moon: "Aries", rising: "Leo" },
      },
      {
        id: "4",
        name: "Maya Patel",
        age: 27,
        zodiacSign: "Gemini",
        compatibility: calculateCompatibility(zodiac, "Gemini"),
        avatar: "/placeholder.svg?height=100&width=100",
        birthChart: { sun: "Gemini", moon: "Aquarius", rising: "Sagittarius" },
      },
    ]

    // Sort by compatibility
    mockMatches.sort((a, b) => b.compatibility - a.compatibility)

    setTimeout(() => {
      setMatches(mockMatches)
      setLoading(false)
    }, 2000)
  }, [user])

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-4xl mb-4">🔮</div>
        <h3 className="text-lg font-semibold mb-2">Analyzing Your Birth Chart...</h3>
        <p className="text-gray-600">Finding your cosmic connections</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* User's Zodiac Info */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            Your Cosmic Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="font-semibold text-lg">{user.name}</h3>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {userZodiac} ♌
              </Badge>
              <p className="text-sm text-gray-600 mt-1">Born: {new Date(user.birthDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Matches */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Your Cosmic Matches</h3>
        <div className="grid gap-4">
          {matches.map((match) => (
            <Card key={match.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={match.avatar || "/placeholder.svg"} alt={match.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-semibold">
                        {match.name}, {match.age}
                      </h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{match.zodiacSign}</Badge>
                        <span className="text-sm text-gray-600">{match.compatibility}% compatible</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Sun: {match.birthChart.sun} • Moon: {match.birthChart.moon} • Rising: {match.birthChart.rising}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          style={{ width: `${match.compatibility}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{match.compatibility}%</span>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => onStartChat(match.id)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      Start Chat 💫
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
