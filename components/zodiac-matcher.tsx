"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Heart, MapPin } from "lucide-react"

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

interface ZodiacMatcherProps {
  currentUser: User
  allUsers: User[]
  onStartChat: (userId: string) => void
  onBack: () => void
}

export function ZodiacMatcher({ currentUser, allUsers, onStartChat, onBack }: ZodiacMatcherProps) {
  const [sameZodiacUsers, setSameZodiacUsers] = useState<User[]>([])
  const [currentUserZodiac, setCurrentUserZodiac] = useState<string>("")

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

  useEffect(() => {
    const userZodiac = calculateZodiacSign(currentUser.birthDate)
    setCurrentUserZodiac(userZodiac)

    // Filter users with the same zodiac sign
    const matches = allUsers.filter((user) => {
      const userSign = calculateZodiacSign(user.birthDate)
      return userSign === userZodiac && user.id !== currentUser.id
    })

    setSameZodiacUsers(matches)
  }, [currentUser, allUsers])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-md p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Zodiac Twins</h1>
            <p className="text-gray-400">Fellow {currentUserZodiac}s near you</p>
          </div>
        </div>

        {/* Current User Zodiac Info */}
        <Card className="mb-6 bg-gray-800 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-4xl mb-2">{getZodiacEmoji(currentUserZodiac)}</div>
            <h3 className="font-semibold text-lg text-white">You're a {currentUserZodiac}!</h3>
            <p className="text-sm text-gray-400">Born: {new Date(currentUser.birthDate).toLocaleDateString()}</p>
            <Badge className="mt-2 bg-orange-500 hover:bg-orange-600">
              {sameZodiacUsers.length} {currentUserZodiac}s found
            </Badge>
          </CardContent>
        </Card>

        {/* Same Zodiac Matches */}
        <div className="space-y-4">
          {sameZodiacUsers.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-semibold mb-2 text-white">No {currentUserZodiac}s found yet</h3>
                <p className="text-gray-400 text-sm">Check back later for more zodiac twins in your area!</p>
              </CardContent>
            </Card>
          ) : (
            sameZodiacUsers.map((user) => (
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
                        <Badge className="bg-gradient-to-r from-orange-400 to-rose-400 text-white font-semibold">
                          {getZodiacEmoji(currentUserZodiac)} {currentUserZodiac}
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}
