"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HoroscopeTab } from "@/components/horoscope-tab"
import { ChatsTab } from "@/components/chats-tab"
import { SearchTab } from "@/components/search-tab"
import { ChatSystem } from "@/components/chat-system"
import { PermissionScreen } from "@/components/permission-screen"
import { MoodStatus } from "@/components/mood-status"
import { BioManager } from "@/components/bio-manager"
import { sdk } from "@farcaster/miniapp-sdk"

// Mock current user
const currentUser = {
  id: "1",
  name: "Alex Johnson",
  age: 28,
  birthDate: "1995-07-23",
  birthTime: "14:30",
  birthPlace: "New York, NY",
  location: "New York, NY",
  avatar: "/placeholder.svg?height=100&width=100",
  bio: "Love adventures and good vibes ✨",
  interests: ["Travel", "Music", "Yoga", "Photography"],
}

// Mock other users
const allUsers = [
  {
    id: "2",
    name: "Emma Wilson",
    age: 26,
    birthDate: "1997-07-15",
    location: "Brooklyn, NY",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Creative soul seeking genuine connections 🎨",
    interests: ["Art", "Dancing", "Coffee", "Books"],
  },
  {
    id: "3",
    name: "Marcus Thompson",
    age: 30,
    birthDate: "1993-08-10",
    location: "Manhattan, NY",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Entrepreneur with a passion for life 🚀",
    interests: ["Business", "Fitness", "Travel", "Food"],
  },
  {
    id: "4",
    name: "Sofia Martinez",
    age: 29,
    birthDate: "1994-08-05",
    location: "Queens, NY",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Yoga instructor spreading positive energy 🧘‍♀️",
    interests: ["Yoga", "Meditation", "Nature", "Wellness"],
  },
  {
    id: "5",
    name: "David Kim",
    age: 27,
    birthDate: "1996-09-15",
    location: "Manhattan, NY",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Tech enthusiast and coffee lover ☕",
    interests: ["Technology", "Gaming", "Coffee", "Movies"],
  },
]

export default function SignSyncApp() {
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("horoscope")
  const [grantedPermissions, setGrantedPermissions] = useState<string[]>([])
  const [currentMood, setCurrentMood] = useState<string>("")
  const [userBio, setUserBio] = useState(currentUser.bio)
  const [userPhoto, setUserPhoto] = useState(currentUser.avatar)

  const startChat = (userId: string) => {
    setActiveChat(userId)
  }

  const closeChat = () => {
    setActiveChat(null)
  }

  const handleGrantPermissions = (permissions: string[]) => {
    setGrantedPermissions(permissions)

    // Send message to parent app about granted permissions
    if (window.parent) {
      window.parent.postMessage(
        {
          type: "PERMISSIONS_GRANTED",
          payload: {
            permissions,
            appId: "signsync-zodiac-matcher",
            userId: currentUser.id,
          },
        },
        "*",
      )
    }
  }

  const handleDenyPermissions = () => {
    // Send message to parent app about denied permissions
    if (window.parent) {
      window.parent.postMessage(
        {
          type: "PERMISSIONS_DENIED",
          payload: {
            appId: "signsync-zodiac-matcher",
            userId: currentUser.id,
          },
        },
        "*",
      )
    }
  }

  const calculateZodiacSign = (birthDate: string): string => {
    const date = new Date(birthDate)
    const month = date.getMonth() + 1
    const day = date.getDate()

    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo"
    // Add other signs as needed
    return "Leo"
  }

  // Listen for messages from parent app
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "SUGGEST_ZODIAC_USERS") {
        // Switch to search tab when parent app requests zodiac suggestions
        setActiveTab("search")
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // Notify Farcaster Miniapp SDK that the app is ready
  useEffect(() => {
    if (grantedPermissions.length > 0) {
      sdk.actions.ready()
    }
  }, [grantedPermissions])

  // Show permission screen first - MANDATORY
  if (grantedPermissions.length === 0) {
    return <PermissionScreen onGrantPermissions={handleGrantPermissions} onDeny={handleDenyPermissions} />
  }

  if (activeChat) {
    return <ChatSystem currentUser={currentUser} chatWithUserId={activeChat} allUsers={allUsers} onBack={closeChat} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <header className="p-4 text-center border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">SignSync</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-400">Connected to main app</span>
          </div>
        </header>

        {/* WhatsApp-style Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-b border-gray-700">
            <TabsTrigger
              value="horoscope"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              Horoscope
            </TabsTrigger>
            <TabsTrigger
              value="chats"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              Chats
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-700"
            >
              Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="horoscope" className="mt-0">
            <HoroscopeTab currentUser={currentUser} />
          </TabsContent>

          <TabsContent value="chats" className="mt-0 p-4 space-y-4">
            <MoodStatus currentMood={currentMood} onMoodChange={setCurrentMood} />
            <BioManager
              currentBio={userBio}
              zodiacSign={calculateZodiacSign(currentUser.birthDate)}
              currentPhoto={userPhoto}
              onBioUpdate={setUserBio}
              onPhotoUpdate={setUserPhoto}
            />
            <ChatsTab currentUser={currentUser} allUsers={allUsers} onStartChat={startChat} />
          </TabsContent>

          <TabsContent value="search" className="mt-0">
            <SearchTab currentUser={currentUser} allUsers={allUsers} onStartChat={startChat} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
