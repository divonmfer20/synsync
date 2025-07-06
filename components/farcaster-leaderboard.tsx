"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Star, TrendingUp, RefreshCw, ExternalLink } from "lucide-react"

interface LeaderboardUser {
  id: string
  username: string
  displayName: string
  avatar: string
  points: number
  rank: number
  fid: number
  farcasterUrl: string
  birthDate?: string
}

interface FarcasterLeaderboardProps {
  onStartChat: (userId: string) => void
}

export function FarcasterLeaderboard({ onStartChat }: FarcasterLeaderboardProps) {
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

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

  const getZodiacColor = (sign: string): string => {
    const colors: { [key: string]: string } = {
      Aries: "bg-red-600",
      Taurus: "bg-green-600",
      Gemini: "bg-yellow-500",
      Cancer: "bg-blue-400",
      Leo: "bg-orange-500",
      Virgo: "bg-emerald-600",
      Libra: "bg-pink-500",
      Scorpio: "bg-red-800",
      Sagittarius: "bg-purple-600",
      Capricorn: "bg-gray-700",
      Aquarius: "bg-cyan-500",
      Pisces: "bg-teal-500",
    }
    return colors[sign] || "bg-orange-500"
  }

  // Mock function to fetch Farcaster leaderboard data
  const fetchLeaderboardData = async (): Promise<LeaderboardUser[]> => {
    const mockLeaderboardData: LeaderboardUser[] = [
      {
        id: "fc_user_1",
        username: "cryptoleo",
        displayName: "Leo the Builder",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 15420 + Math.floor(Math.random() * 1000),
        rank: 1,
        fid: 12345,
        farcasterUrl: "https://warpcast.com/cryptoleo",
        birthDate: "1995-08-15",
      },
      {
        id: "fc_user_2",
        username: "scorpioqueen",
        displayName: "Sarah M",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 14890 + Math.floor(Math.random() * 800),
        rank: 2,
        fid: 12346,
        farcasterUrl: "https://warpcast.com/scorpioqueen",
        birthDate: "1993-11-08",
      },
      {
        id: "fc_user_3",
        username: "geminitwins",
        displayName: "Alex & Jordan",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 13750 + Math.floor(Math.random() * 600),
        rank: 3,
        fid: 12347,
        farcasterUrl: "https://warpcast.com/geminitwins",
        birthDate: "1996-06-10",
      },
      {
        id: "fc_user_4",
        username: "ariesmars",
        displayName: "Marcus Fire",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 12980 + Math.floor(Math.random() * 500),
        rank: 4,
        fid: 12348,
        farcasterUrl: "https://warpcast.com/ariesmars",
        birthDate: "1994-04-05",
      },
      {
        id: "fc_user_5",
        username: "taurusearth",
        displayName: "Emma Green",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 12340 + Math.floor(Math.random() * 400),
        rank: 5,
        fid: 12349,
        farcasterUrl: "https://warpcast.com/taurusearth",
        birthDate: "1997-05-12",
      },
      {
        id: "fc_user_6",
        username: "libralove",
        displayName: "Harmony Rose",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 11890 + Math.floor(Math.random() * 300),
        rank: 6,
        fid: 12350,
        farcasterUrl: "https://warpcast.com/libralove",
        birthDate: "1995-10-15",
      },
      {
        id: "fc_user_7",
        username: "cancermoon",
        displayName: "Luna Waters",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 11450 + Math.floor(Math.random() * 250),
        rank: 7,
        fid: 12351,
        farcasterUrl: "https://warpcast.com/cancermoon",
        birthDate: "1996-07-08",
      },
      {
        id: "fc_user_8",
        username: "virgotech",
        displayName: "David Analytics",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 10980 + Math.floor(Math.random() * 200),
        rank: 8,
        fid: 12352,
        farcasterUrl: "https://warpcast.com/virgotech",
        birthDate: "1994-09-22",
      },
      {
        id: "fc_user_9",
        username: "sagiadventure",
        displayName: "Journey Star",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 10650 + Math.floor(Math.random() * 150),
        rank: 9,
        fid: 12353,
        farcasterUrl: "https://warpcast.com/sagiadventure",
        birthDate: "1995-12-03",
      },
      {
        id: "fc_user_10",
        username: "aquariusfuture",
        displayName: "Nova Vision",
        avatar: "/placeholder.svg?height=100&width=100",
        points: 10320 + Math.floor(Math.random() * 100),
        rank: 10,
        fid: 12354,
        farcasterUrl: "https://warpcast.com/aquariusfuture",
        birthDate: "1996-02-14",
      },
    ]

    await new Promise((resolve) => setTimeout(resolve, 1500))
    return mockLeaderboardData
  }

  const loadLeaderboardData = async () => {
    setLoading(true)
    try {
      const data = await fetchLeaderboardData()
      setLeaderboardUsers(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Failed to fetch leaderboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const openFarcasterProfile = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  useEffect(() => {
    loadLeaderboardData()
    const interval = setInterval(loadLeaderboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-400" />
    if (rank === 2) return <Trophy className="h-5 w-5 text-gray-300" />
    if (rank === 3) return <Trophy className="h-5 w-5 text-amber-600" />
    return <Star className="h-5 w-5 text-gray-500" />
  }

  if (loading && !leaderboardUsers.length) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6 text-center">
          <div className="animate-spin text-4xl mb-4">🏆</div>
          <h3 className="text-lg font-semibold mb-2 text-white">Loading Farcaster Leaderboard...</h3>
          <p className="text-gray-400">Fetching top active users</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Leaderboard Header */}
      <Card className="bg-gradient-to-r from-purple-800 to-blue-800 border-purple-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            Farcaster Top Performers
            {loading && <RefreshCw className="h-4 w-4 animate-spin text-purple-300" />}
          </CardTitle>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-purple-200">
              <TrendingUp className="h-4 w-4" />
              <span>Live Updates • Most Active Users</span>
            </div>
            {lastUpdated && (
              <div className="flex items-center gap-1 text-purple-300">
                <RefreshCw className="h-3 w-3" />
                <span className="text-xs">Updated {lastUpdated.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Live Update Indicator */}
      <Card className="bg-green-900/20 border-green-700">
        <CardContent className="p-3">
          <div className="flex items-center gap-2 text-green-300 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live sync with Farcaster leaderboard • Updates automatically</span>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Users */}
      <div className="space-y-3">
        {leaderboardUsers.map((user) => {
          const zodiacSign = user.birthDate ? calculateZodiacSign(user.birthDate) : "Leo"
          const zodiacColor = getZodiacColor(zodiacSign)

          return (
            <Card key={user.id} className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {getRankIcon(user.rank)}
                    <span className="text-white font-bold text-lg">#{user.rank}</span>
                  </div>

                  <img
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{user.displayName}</h3>
                      <Badge className={`${zodiacColor} text-white text-xs`}>
                        {getZodiacEmoji(zodiacSign)} {zodiacSign}
                      </Badge>
                    </div>
                    <p className="text-gray-400 text-sm">@{user.username}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">{user.points.toLocaleString()}</span>
                      </div>
                      <Badge variant="secondary" className="bg-purple-600 text-white text-xs">
                        Top Performer
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => openFarcasterProfile(user.farcasterUrl)}
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Profile
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => onStartChat(user.id)}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Manual Refresh Button */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4 text-center">
          <Button
            onClick={loadLeaderboardData}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            disabled={loading}
          >
            {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <TrendingUp className="h-4 w-4 mr-2" />}
            {loading ? "Updating..." : "Refresh Now"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
