"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { AstrologyMatcher } from "./astrology-matcher"

interface User {
  id: string
  name: string
  age: number
  birthDate: string
  birthTime: string
  birthPlace: string
  avatar: string
}

interface MiniAppContainerProps {
  appId: string
  user: User
  onClose: () => void
  onStartChat: (userId: string) => void
}

export function MiniAppContainer({ appId, user, onClose, onStartChat }: MiniAppContainerProps) {
  const [permissions, setPermissions] = useState<string[]>([])

  useEffect(() => {
    // Request permissions when mini-app loads
    const requestedPermissions = ["profile", "messaging", "connections"]
    setPermissions(requestedPermissions)
  }, [appId])

  const renderMiniApp = () => {
    switch (appId) {
      case "astrology-matcher":
        return <AstrologyMatcher user={user} permissions={permissions} onStartChat={onStartChat} />
      default:
        return <div>Mini-app not found</div>
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{appId === "astrology-matcher" && "✨ Astrology Matcher"}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[calc(90vh-100px)]">{renderMiniApp()}</CardContent>
      </Card>
    </div>
  )
}
