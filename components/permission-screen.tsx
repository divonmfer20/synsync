"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, User, MessageCircle, Search, Activity, X } from "lucide-react"

interface PermissionScreenProps {
  onGrantPermissions: (permissions: string[]) => void
  onDeny: () => void
}

export function PermissionScreen({ onGrantPermissions, onDeny }: PermissionScreenProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const permissions = [
    {
      id: "profile",
      name: "Profile Access",
      description: "Access your basic profile information, birth date, and zodiac sign",
      icon: User,
      required: true,
    },
    {
      id: "farcaster_search",
      name: "Farcaster Search Access",
      description: "Access your Farcaster search history to find relevant matches",
      icon: Search,
      required: true,
    },
    {
      id: "activity_data",
      name: "Activity Data",
      description: "Access user activity patterns to prioritize most active users in search results",
      icon: Activity,
      required: true,
    },
    {
      id: "messaging",
      name: "Messaging",
      description: "Send and receive messages with other users through the main app",
      icon: MessageCircle,
      required: true,
    },
  ]

  const handlePermissionToggle = (permissionId: string) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId))
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId])
    }
  }

  const handleGrantAll = () => {
    const allPermissions = permissions.map((p) => p.id)
    onGrantPermissions(allPermissions)
  }

  const handleGrantSelected = () => {
    onGrantPermissions(selectedPermissions)
  }

  const handleNotNow = () => {
    // Send logout message to parent app
    if (window.parent) {
      window.parent.postMessage(
        {
          type: "MINI_APP_LOGOUT",
          payload: {
            appId: "signsync-zodiac-matcher",
            reason: "permissions_denied",
          },
        },
        "*",
      )
    }

    // Call the onDeny callback
    onDeny()
  }

  const requiredPermissions = permissions.filter((p) => p.required)
  const hasAllRequired = requiredPermissions.every((p) => selectedPermissions.includes(p.id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-white">Welcome to SignSync</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={handleNotNow} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-gray-300 text-sm">
            To use SignSync and connect with active users worldwide, we need your permission to access the following
            data
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* App Info */}
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-4xl mb-2">✨</div>
            <h3 className="text-white font-semibold mb-1">Global Dating Mini-App</h3>
            <p className="text-gray-400 text-xs">Connect with active users from all zodiac signs worldwide</p>
            <Badge className="mt-2 bg-purple-500">Authentication Required</Badge>
          </div>

          {/* Mandatory Notice */}
          <div className="bg-orange-900/20 border border-orange-700 rounded-lg p-3">
            <h4 className="text-orange-300 text-sm font-medium mb-2">⚠️ Required for Access</h4>
            <p className="text-orange-400 text-xs">
              All permissions below are required to use SignSync. We need this data to provide personalized matching and
              prioritize active users globally.
            </p>
          </div>

          {/* How it works */}
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-3">
            <h4 className="text-blue-300 text-sm font-medium mb-2">How SignSync works:</h4>
            <ul className="text-blue-400 text-xs space-y-1">
              <li>• Analyzes activity patterns (posts, engagement, interactions)</li>
              <li>• Prioritizes most active users at the top of search results</li>
              <li>• Shows users from all zodiac signs, sorted by activity</li>
              <li>• Chat freely with anyone - Taurus, Gemini, Leo, and beyond!</li>
            </ul>
          </div>

          {/* Permissions List */}
          <div className="space-y-3">
            <h4 className="text-white font-medium text-sm">Required permissions to continue:</h4>
            {permissions.map((permission) => {
              const Icon = permission.icon
              const isSelected = selectedPermissions.includes(permission.id)
              return (
                <div
                  key={permission.id}
                  className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-600 hover:border-gray-500 bg-gray-700/50"
                  }`}
                  onClick={() => handlePermissionToggle(permission.id)}
                >
                  <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${isSelected ? "text-purple-400" : "text-gray-400"}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="text-white font-medium text-sm">{permission.name}</h5>
                        <Badge variant="secondary" className="text-xs bg-red-500 text-white">
                          Required
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">{permission.description}</p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                        isSelected ? "border-purple-500 bg-purple-500" : "border-gray-500"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Privacy Note */}
          <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Shield className="h-4 w-4 text-green-400 mt-0.5" />
              <div>
                <p className="text-green-300 text-xs font-medium">Privacy Protected</p>
                <p className="text-green-400 text-xs mt-1">
                  We only analyze activity patterns for ranking. Your content and personal data remain private and
                  encrypted.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={handleGrantAll}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Grant All Permissions & Continue
            </Button>
            <Button
              onClick={handleGrantSelected}
              variant="outline"
              disabled={!hasAllRequired}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50 bg-transparent"
            >
              {hasAllRequired
                ? `Grant Selected Permissions (${selectedPermissions.length})`
                : "Select All Required Permissions"}
            </Button>
            <Button
              onClick={handleNotNow}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Not Now
            </Button>
            <div className="text-center">
              <p className="text-gray-500 text-xs">Clicking "Not Now" will exit the mini-app</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
