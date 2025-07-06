"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Mic, MicOff, Play, Pause } from "lucide-react"

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

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: "text" | "voice"
  duration?: number
  audioUrl?: string
}

interface ChatSystemProps {
  currentUser: User
  chatWithUserId: string
  allUsers: User[]
  onBack: () => void
}

export function ChatSystem({ currentUser, chatWithUserId, allUsers, onBack }: ChatSystemProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatPartner = allUsers.find((user) => user.id === chatWithUserId)

  useEffect(() => {
    // Load initial messages
    const initialMessages: Message[] = [
      {
        id: "1",
        senderId: chatWithUserId,
        content: `Hey ${currentUser.name}! Fellow Leo here! ♌ Love your profile!`,
        timestamp: new Date(Date.now() - 300000),
        type: "text",
      },
    ]
    setMessages(initialMessages)
  }, [chatWithUserId, currentUser.name])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      content: newMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate response after 2 seconds
    setTimeout(() => {
      const responses = [
        "That's so cool! We Leos really think alike! 🦁",
        "I love meeting fellow Leos! We have such great energy together ✨",
        "Right?! Leo energy is unmatched! 🔥",
        "We should definitely meet up! Leos stick together 💫",
        "Your Leo confidence is showing and I love it! 😍",
      ]

      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: chatWithUserId,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: "text",
      }

      setMessages((prev) => [...prev, response])
    }, 2000)
  }

  const startRecording = () => {
    setIsRecording(true)
    // Simulate recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false)
      const voiceMessage: Message = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        content: "Voice message",
        timestamp: new Date(),
        type: "voice",
        duration: 3,
        audioUrl: "/placeholder-audio.mp3",
      }
      setMessages((prev) => [...prev, voiceMessage])
    }, 3000)
  }

  const toggleAudioPlayback = (messageId: string) => {
    if (playingAudio === messageId) {
      setPlayingAudio(null)
    } else {
      setPlayingAudio(messageId)
      // Simulate audio playback
      setTimeout(() => setPlayingAudio(null), 3000)
    }
  }

  if (!chatPartner) {
    return <div>User not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-md h-screen flex flex-col">
        {/* Header */}
        <Card className="rounded-b-none bg-gray-800 border-gray-700">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <img
                src={chatPartner.avatar || "/placeholder.svg"}
                alt={chatPartner.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <CardTitle className="text-lg text-white">{chatPartner.name}</CardTitle>
                <p className="text-sm text-gray-400">♌ Leo • Online</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.senderId === currentUser.id
                    ? "bg-gradient-to-r from-rose-500 to-orange-500 text-white"
                    : "bg-gray-700 text-gray-100"
                }`}
              >
                {message.type === "voice" ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleAudioPlayback(message.id)}
                      className="p-1 h-8 w-8"
                    >
                      {playingAudio === message.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 bg-current rounded-full ${
                              playingAudio === message.id && i < 10 ? "h-4" : "h-2"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs mt-1">{message.duration}s</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
                <p
                  className={`text-xs mt-1 ${message.senderId === currentUser.id ? "text-rose-100" : "text-gray-400"}`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <Card className="rounded-t-none bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message your match..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
              <Button
                onClick={isRecording ? () => {} : startRecording}
                size="sm"
                variant="outline"
                className={`border-gray-600 ${
                  isRecording
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-transparent text-gray-300 hover:bg-gray-700"
                }`}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                onClick={sendMessage}
                size="sm"
                className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {isRecording && (
              <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                Recording voice message...
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
