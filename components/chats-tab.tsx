"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

interface ChatsTabProps {
  currentUser: User
  allUsers: User[]
  onStartChat: (userId: string) => void
}

export function ChatsTab({ currentUser, allUsers, onStartChat }: ChatsTabProps) {
  const calculateZodiacSign = (birthDate: string): string => {
    const date = new Date(birthDate)
    const month = date.getMonth() + 1
    const day = date.getDate()

    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo"
    // Add other signs as needed
    return "Leo"
  }

  const getZodiacEmoji = (sign: string): string => {
    const emojis: { [key: string]: string } = {
      Leo: "♌",
      Virgo: "♍",
    }
    return emojis[sign] || "⭐"
  }

  // Mock recent chats
  const recentChats = [
    {
      user: allUsers[0],
      lastMessage: "Hey! Fellow Leo here! ♌",
      timestamp: "2 min ago",
      unread: 2,
    },
    {
      user: allUsers[1],
      lastMessage: "That's so cool! We really think alike",
      timestamp: "1 hour ago",
      unread: 0,
    },
    {
      user: allUsers[2],
      lastMessage: "Would love to meet up sometime!",
      timestamp: "Yesterday",
      unread: 1,
    },
  ]

  return (
    <div className="h-[calc(100vh-120px)] overflow-y-auto">
      {recentChats.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-white font-semibold mb-2">No chats yet</h3>
          <p className="text-gray-400 text-sm">Start connecting with your zodiac twins!</p>
        </div>
      ) : (
        <div className="space-y-1">
          {recentChats.map((chat) => {
            const zodiac = calculateZodiacSign(chat.user.birthDate)
            return (
              <Card
                key={chat.user.id}
                className="bg-gray-800 border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors"
                onClick={() => onStartChat(chat.user.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={chat.user.avatar || "/placeholder.svg"}
                      alt={chat.user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white truncate">{chat.user.name}</h4>
                        <Badge className="bg-orange-500 text-xs">{getZodiacEmoji(zodiac)}</Badge>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">{chat.timestamp}</p>
                      {chat.unread > 0 && (
                        <Badge className="bg-green-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {chat.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
