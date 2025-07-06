"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, MapPin, Sparkles } from "lucide-react"

interface User {
  id: string
  name: string
  age: number
  birthDate: string
  location: string
  avatar: string
  bio: string
  interests: string[]
}

interface MainFeedProps {
  currentUser: User
  allUsers: User[]
  onStartChat: (userId: string) => void
  onOpenZodiacMatcher: () => void
}

export function MainFeed({ currentUser, allUsers, onStartChat, onOpenZodiacMatcher }: MainFeedProps) {
  // Calculate zodiac sign from birth date
  const calculateZodiacSign = (birthDate: string): string => {
    const date = new Date(birthDate)
    const month = date.getMonth() + 1
    const day = date.getDate()

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries"
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus"
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini"
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer"
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra"
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio"
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius"
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn"
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius"
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces"

    return "Leo" // fallback
  }

  const getZodiacEmoji = (sign: string): string => {
    const emojis: { [key: string]: string } = {
      Aries: "♈",
      Taurus: "♉",
      Gemini: "♊",
      Cancer: "♋",
      Leo: "♌",
      Virgo: "♍",
      Libra: "♎",
      Scorpio: "♏",
      Sagittarius: "♐",
      Capricorn: "♑",
      Aquarius: "♒",
      Pisces: "♓",
    }
    return emojis[sign] || "⭐"
  }

  const getZodiacColor = (sign: string): string => {
    const colors: { [key: string]: string } = {
      Aries: "bg-red-600 hover:bg-red-700", // Mars red
      Taurus: "bg-green-600 hover:bg-green-700", // Earth green
      Gemini: "bg-yellow-500 hover:bg-yellow-600", // Mercury yellow
      Cancer: "bg-blue-400 hover:bg-blue-500", // Moon silver-blue
      Leo: "bg-orange-500 hover:bg-orange-600", // Sun gold-orange
      Virgo: "bg-emerald-600 hover:bg-emerald-700", // Earth emerald
      Libra: "bg-pink-500 hover:bg-pink-600", // Venus pink
      Scorpio: "bg-red-800 hover:bg-red-900", // Deep crimson
      Sagittarius: "bg-purple-600 hover:bg-purple-700", // Jupiter purple
      Capricorn: "bg-gray-700 hover:bg-gray-800", // Saturn dark gray
      Aquarius: "bg-cyan-500 hover:bg-cyan-600", // Uranus electric blue
      Pisces: "bg-teal-500 hover:bg-teal-600", // Neptune sea green
    }
    return colors[sign] || "bg-orange-500 hover:bg-orange-600"
  }

  return (
    <div className="space-y-4">
      {/* Zodiac Matcher CTA */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <Button
            onClick={onOpenZodiacMatcher}
            className="w-full h-16 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="h-5 w-5" />
                <span className="text-lg font-semibold">Find Your Zodiac Twins</span>
              </div>
              <div className="text-xs opacity-90">
                Connect with fellow {calculateZodiacSign(currentUser.birthDate)}s
              </div>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* User Feed */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Discover People</h3>
        {allUsers
          .filter((user) => user.id !== currentUser.id)
          .map((user) => {
            const userZodiac = calculateZodiacSign(user.birthDate)
            const zodiacColor = getZodiacColor(userZodiac)
            return (
              <Card key={user.id} className="hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg text-white">
                          {user.name}, {user.age}
                        </h3>
                        <Badge className={`${zodiacColor} text-white font-semibold`}>
                          {getZodiacEmoji(userZodiac)} {userZodiac}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-400">{user.location}</span>
                      </div>

                      <p className="text-sm text-gray-300 mb-3">{user.bio}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {user.interests.slice(0, 3).map((interest) => (
                          <Badge key={interest} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          Like
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onStartChat(user.id)}
                          className="flex-1 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
      </div>
    </div>
  )
}
