"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface MoodStatusProps {
  currentMood?: string
  onMoodChange: (mood: string) => void
}

export function MoodStatus({ currentMood, onMoodChange }: MoodStatusProps) {
  const moods = [
    { id: "adventurous", emoji: "🌟", label: "Adventurous", color: "bg-orange-500" },
    { id: "romantic", emoji: "💕", label: "Romantic", color: "bg-pink-500" },
    { id: "chill", emoji: "😌", label: "Chill", color: "bg-blue-500" },
    { id: "playful", emoji: "😄", label: "Playful", color: "bg-yellow-500" },
    { id: "deep", emoji: "🤔", label: "Deep Talks", color: "bg-purple-500" },
    { id: "creative", emoji: "🎨", label: "Creative", color: "bg-green-500" },
    { id: "spontaneous", emoji: "⚡", label: "Spontaneous", color: "bg-red-500" },
    { id: "cozy", emoji: "🏠", label: "Cozy", color: "bg-amber-600" },
  ]

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🎭</span>
          <h3 className="text-white font-semibold">Current Vibe</h3>
        </div>

        {currentMood && (
          <div className="mb-3">
            <Badge className={`${moods.find((m) => m.id === currentMood)?.color} text-white`}>
              {moods.find((m) => m.id === currentMood)?.emoji} {moods.find((m) => m.id === currentMood)?.label}
            </Badge>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {moods.map((mood) => (
            <Button
              key={mood.id}
              variant={currentMood === mood.id ? "default" : "outline"}
              size="sm"
              onClick={() => onMoodChange(mood.id)}
              className={`text-xs ${
                currentMood === mood.id
                  ? `${mood.color} text-white`
                  : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {mood.emoji} {mood.label}
            </Button>
          ))}
        </div>

        <p className="text-gray-400 text-xs mt-2">
          Your vibe helps others know what kind of connection you're looking for today
        </p>
      </CardContent>
    </Card>
  )
}
