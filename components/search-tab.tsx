"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, MapPin, Search, Trophy, TrendingUp, MessageSquare, Users } from "lucide-react"
import { FarcasterLeaderboard } from "./farcaster-leaderboard"

interface User {
  id: string
  name: string
  age: number
  birthDate: string
  location: string
  avatar: string
  bio: string
  interests: string[]
  engagementScore?: number
  repliesReceived?: number
  interactionCount?: number
  lastActive?: string
}

interface SearchTabProps {
  currentUser: User
  allUsers: User[]
  onStartChat: (userId: string) => void
}

export function SearchTab({ currentUser, allUsers, onStartChat }: SearchTabProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterByZodiac, setFilterByZodiac] = useState<string | null>(null)
  const [activeSearchTab, setActiveSearchTab] = useState("zodiac")
  const [engagementUsers, setEngagementUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)

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
    return "Leo"
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

  const getZodiacTextColor = (sign: string): string => {
    const colors: { [key: string]: string } = {
      Aries: "text-red-400",
      Taurus: "text-green-400",
      Gemini: "text-yellow-400",
      Cancer: "text-blue-400",
      Leo: "text-orange-400",
      Virgo: "text-emerald-400",
      Libra: "text-pink-400",
      Scorpio: "text-red-600",
      Sagittarius: "text-purple-400",
      Capricorn: "text-gray-400",
      Aquarius: "text-cyan-400",
      Pisces: "text-teal-400",
    }
    return colors[sign] || "text-orange-400"
  }

  const getZodiacColor = (sign: string): string => {
    const colors: { [key: string]: string } = {
      Aries: "bg-red-600 hover:bg-red-700",
      Taurus: "bg-green-600 hover:bg-green-700",
      Gemini: "bg-yellow-500 hover:bg-yellow-600",
      Cancer: "bg-blue-400 hover:bg-blue-500",
      Leo: "bg-orange-500 hover:bg-orange-600",
      Virgo: "bg-emerald-600 hover:bg-emerald-700",
      Libra: "bg-pink-500 hover:bg-pink-600",
      Scorpio: "bg-red-800 hover:bg-red-900",
      Sagittarius: "bg-purple-600 hover:bg-purple-700",
      Capricorn: "bg-gray-700 hover:bg-gray-800",
      Aquarius: "bg-cyan-500 hover:bg-cyan-600",
      Pisces: "bg-teal-500 hover:bg-teal-600",
    }
    return colors[sign] || "bg-orange-500 hover:bg-orange-600"
  }

  // Fetch users with high engagement metrics from Farcaster
  const fetchEngagementBasedUsers = async (): Promise<User[]> => {
    setLoading(true)

    // Mock API call to fetch users based on engagement metrics
    const mockEngagementUsers: User[] = [
      {
        id: "eng_user_1",
        name: "Maya Conversations",
        age: 26,
        birthDate: "1997-06-15", // Gemini
        location: "San Francisco, CA",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Love deep conversations and meaningful connections ✨",
        interests: ["Philosophy", "Art", "Travel"],
        engagementScore: 95,
        repliesReceived: 847,
        interactionCount: 1250,
        lastActive: "2 min ago",
      },
      {
        id: "eng_user_2",
        name: "Leo Community",
        age: 29,
        birthDate: "1994-08-08", // Leo
        location: "Austin, TX",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Building communities and spreading positive vibes 🦁",
        interests: ["Community", "Leadership", "Music"],
        engagementScore: 92,
        repliesReceived: 723,
        interactionCount: 1180,
        lastActive: "5 min ago",
      },
      {
        id: "eng_user_3",
        name: "Scorpio Insights",
        age: 31,
        birthDate: "1992-11-12", // Scorpio
        location: "New York, NY",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Passionate about authentic connections and deep talks 🔮",
        interests: ["Psychology", "Writing", "Meditation"],
        engagementScore: 89,
        repliesReceived: 692,
        interactionCount: 1050,
        lastActive: "1 min ago",
      },
      {
        id: "eng_user_4",
        name: "Aries Energy",
        age: 27,
        birthDate: "1996-04-03", // Aries
        location: "Miami, FL",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Always ready for new adventures and meeting amazing people 🔥",
        interests: ["Adventure", "Fitness", "Entrepreneurship"],
        engagementScore: 87,
        repliesReceived: 634,
        interactionCount: 980,
        lastActive: "3 min ago",
      },
      {
        id: "eng_user_5",
        name: "Libra Harmony",
        age: 28,
        birthDate: "1995-10-07", // Libra
        location: "Portland, OR",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Creating balance and beautiful connections in life ⚖️",
        interests: ["Design", "Relationships", "Wellness"],
        engagementScore: 85,
        repliesReceived: 578,
        interactionCount: 920,
        lastActive: "4 min ago",
      },
      {
        id: "eng_user_6",
        name: "Cancer Empath",
        age: 25,
        birthDate: "1998-07-14", // Cancer
        location: "Seattle, WA",
        avatar: "/placeholder.svg?height=100&width=100",
        bio: "Intuitive soul who loves helping others and deep connections 🌙",
        interests: ["Healing", "Cooking", "Nature"],
        engagementScore: 83,
        repliesReceived: 512,
        interactionCount: 850,
        lastActive: "6 min ago",
      },
    ]

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    return mockEngagementUsers
  }

  // Load engagement-based users on component mount and set up auto-refresh
  useEffect(() => {
    const loadEngagementUsers = async () => {
      const users = await fetchEngagementBasedUsers()
      setEngagementUsers(users)
    }

    loadEngagementUsers()

    // Auto-refresh every 45 seconds to get latest engagement data
    const interval = setInterval(loadEngagementUsers, 45000)
    return () => clearInterval(interval)
  }, [])

  // Sort users by engagement metrics
  const sortedEngagementUsers = engagementUsers
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase())

      if (filterByZodiac) {
        const userZodiac = calculateZodiacSign(user.birthDate)
        return matchesSearch && userZodiac === filterByZodiac
      }
      return matchesSearch
    })
    .sort((a, b) => {
      // Primary sort: engagement score
      if (b.engagementScore !== a.engagementScore) {
        return (b.engagementScore || 0) - (a.engagementScore || 0)
      }
      // Secondary sort: replies received
      if (b.repliesReceived !== a.repliesReceived) {
        return (b.repliesReceived || 0) - (a.repliesReceived || 0)
      }
      // Tertiary sort: interaction count
      return (b.interactionCount || 0) - (a.interactionCount || 0)
    })

  const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ]

  return (
    <div className="p-4 space-y-4 h-[calc(100vh-120px)] overflow-y-auto">
      {/* Search Tabs */}
      <Tabs value={activeSearchTab} onValueChange={setActiveSearchTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger
            value="zodiac"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            <Search className="h-4 w-4 mr-2" />
            Zodiac Search
          </TabsTrigger>
          <TabsTrigger
            value="leaderboard"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Top Performers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="zodiac" className="mt-4 space-y-4">
          {/* Engagement Priority Indicator */}
          <Card className="bg-blue-900/20 border-blue-700">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-blue-300 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>Prioritized by engagement • Most replies & interactions first</span>
                {loading && <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse ml-2"></div>}
              </div>
            </CardContent>
          </Card>

          {/* Search Controls */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search highly engaged users..."
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>

            {/* Zodiac Filter Buttons */}
            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Filter by zodiac sign:</p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={filterByZodiac === null ? "default" : "outline"}
                  onClick={() => setFilterByZodiac(null)}
                  className={`text-xs ${
                    filterByZodiac === null
                      ? "bg-white text-black"
                      : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  All
                </Button>
                {zodiacSigns.map((sign) => (
                  <Button
                    key={sign}
                    variant="outline"
                    onClick={() => setFilterByZodiac(filterByZodiac === sign ? null : sign)}
                    className={`text-xs bg-transparent border-gray-600 hover:bg-gray-700 ${
                      filterByZodiac === sign ? "border-white" : ""
                    }`}
                  >
                    <span className={getZodiacTextColor(sign)}>
                      {getZodiacEmoji(sign)} {sign}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="space-y-3">
            {loading && sortedEngagementUsers.length === 0 ? (
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <div className="animate-spin text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold mb-2 text-white">Loading Engaged Users...</h3>
                  <p className="text-gray-400">Finding users with high interaction rates</p>
                </CardContent>
              </Card>
            ) : sortedEngagementUsers.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-white font-semibold mb-2">No users found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
              </div>
            ) : (
              sortedEngagementUsers.map((user, index) => {
                const userZodiac = calculateZodiacSign(user.birthDate)
                const zodiacColor = getZodiacColor(userZodiac)
                return (
                  <Card key={user.id} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          {index < 3 && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <TrendingUp className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-white">
                              {user.name}, {user.age}
                            </h3>
                            <Badge className={`${zodiacColor} text-white font-semibold text-xs`}>
                              {getZodiacEmoji(userZodiac)} {userZodiac}
                            </Badge>
                            {user.engagementScore && user.engagementScore > 90 && (
                              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                🔥 Hot
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-1 mb-2">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span className="text-sm text-gray-400">{user.location}</span>
                            <span className="text-xs text-green-400 ml-2">• {user.lastActive}</span>
                          </div>

                          <p className="text-sm text-gray-300 mb-3">{user.bio}</p>

                          {/* Engagement Metrics */}
                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3 text-blue-400" />
                              <span className="text-xs text-blue-400">{user.repliesReceived} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-green-400" />
                              <span className="text-xs text-green-400">{user.interactionCount} interactions</span>
                            </div>
                            <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
                              {user.engagementScore}% engaged
                            </Badge>
                          </div>

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
                              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
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
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-4">
          <FarcasterLeaderboard onStartChat={onStartChat} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
