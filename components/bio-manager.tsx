"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Upload } from "lucide-react"

interface BioManagerProps {
  currentBio: string
  zodiacSign: string
  currentPhoto?: string
  onBioUpdate: (bio: string) => void
  onPhotoUpdate: (photo: string) => void
}

export function BioManager({ currentBio, zodiacSign, currentPhoto, onBioUpdate, onPhotoUpdate }: BioManagerProps) {
  const [customBio, setCustomBio] = useState(currentBio)
  const [activeBio, setActiveBio] = useState<"custom" | "recommended">("custom")
  const [profilePhoto, setProfilePhoto] = useState(currentPhoto || "/placeholder.svg?height=100&width=100")

  const getRecommendedBio = (sign: string): string => {
    const bios: { [key: string]: string } = {
      Aries: "Bold adventurer seeking someone who matches my energy! Let's create epic memories together 🔥",
      Taurus: "Grounded soul who loves life's finer pleasures. Looking for something beautiful and lasting 🌱",
      Gemini: "Curious mind with endless stories. Love deep conversations and spontaneous adventures ✨",
      Cancer: "Intuitive heart seeking genuine connection. Home is wherever we're together 🌙",
      Leo: "Confident spirit with a generous heart. Looking for someone who appreciates my shine ☀️",
      Virgo: "Thoughtful perfectionist who shows love through actions. I notice the little things 🌿",
      Libra: "Harmony-seeking romantic with an eye for beauty. Let's create elegant moments together ⚖️",
      Scorpio: "Intense soul seeking transformative connection. Ready for love that changes us both 🔮",
      Sagittarius: "Free-spirited explorer ready for the next adventure. Join my journey! 🏹",
      Capricorn: "Ambitious dreamer building a life worth sharing. Let's climb mountains together 🏔️",
      Aquarius: "Unique visionary seeking conscious connection. Let's change the world together 🌟",
      Pisces: "Dreamy romantic with an artistic soul. I see magic in everyday moments 🌊",
    }
    return bios[sign] || bios["Leo"]
  }

  const recommendedBio = getRecommendedBio(zodiacSign)

  const handlePhotoUpload = () => {
    // Simulate photo upload
    const newPhoto = "/placeholder.svg?height=120&width=120&text=New+Photo"
    setProfilePhoto(newPhoto)
    onPhotoUpdate(newPhoto)
  }

  const handleSave = () => {
    const bioToSave = activeBio === "custom" ? customBio : recommendedBio
    onBioUpdate(bioToSave)
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <span className="text-2xl">👤</span>
          Profile Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Photo Upload Section */}
        <div className="text-center">
          <div className="relative inline-block">
            <img
              src={profilePhoto || "/placeholder.svg"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
            />
            <Button
              onClick={handlePhotoUpload}
              size="sm"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-purple-500 hover:bg-purple-600 p-0"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-400 text-xs mt-2">Upload a photo for SignSync (separate from Farcaster)</p>
        </div>

        {/* Bio Section */}
        <Tabs value={activeBio} onValueChange={(value) => setActiveBio(value as "custom" | "recommended")}>
          <TabsList className="grid w-full grid-cols-2 bg-gray-700">
            <TabsTrigger
              value="custom"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600"
            >
              Your Bio
            </TabsTrigger>
            <TabsTrigger
              value="recommended"
              className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-gray-600"
            >
              AI Suggested
            </TabsTrigger>
          </TabsList>

          <TabsContent value="custom" className="space-y-3">
            <div>
              <Textarea
                value={customBio}
                onChange={(e) => setCustomBio(e.target.value)}
                placeholder="Write a short bio about yourself..."
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 min-h-[80px] resize-none"
                maxLength={80}
              />
              <p className="text-gray-400 text-xs mt-1">{customBio.length}/80 characters</p>
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-3">
            <div className="bg-gray-700 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-500 text-white text-xs">✨ AI</Badge>
                <Badge className="bg-orange-500 text-white text-xs">{zodiacSign}</Badge>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{recommendedBio}</p>
              <p className="text-gray-500 text-xs mt-2">{recommendedBio.length} characters</p>
            </div>
          </TabsContent>
        </Tabs>

        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          <Upload className="h-4 w-4 mr-2" />
          Save {activeBio === "custom" ? "Custom" : "AI"} Bio
        </Button>

        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-2">
          <p className="text-blue-300 text-xs">
            💡 Keep it short and sweet! Your bio should capture your essence in just a few words.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
