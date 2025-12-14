"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import Sidebar from "@/components/Sidebar"
import { PixelButton } from "@/components/pixel-button"
import { Volume2, VolumeX, Monitor, Moon, Sun, Bell, BellOff, Gamepad2, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("settings")

  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [musicVolume, setMusicVolume] = useState(70)
  const [sfxVolume, setSfxVolume] = useState(80)
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")
  const [notifications, setNotifications] = useState(true)
  const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">("normal")

  return (
    <div className="min-h-screen bg-souls-darker relative flex">
      <ParticleBackground theme="hell" />

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <HUD />

      <div className="flex-1 pt-24 pb-8 px-4 lg:pl-72">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <button
              onClick={() => router.back()}
              className="p-2 bg-souls-dark border-2 border-souls-darker hover:border-souls-red/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-souls-light" />
            </button>
            <h1 className="font-mono text-3xl text-souls-light uppercase tracking-wider">Settings</h1>
          </motion.div>

          {/* Audio Settings */}
          <motion.div
            className="bg-souls-dark border-4 border-souls-darker p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              {soundEnabled ? (
                <Volume2 className="w-6 h-6 text-souls-red" />
              ) : (
                <VolumeX className="w-6 h-6 text-souls-light/40" />
              )}
              <h2 className="font-mono text-xl text-souls-light uppercase">Audio</h2>
            </div>

            {/* Master Sound Toggle */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-souls-darker">
              <span className="font-mono text-sm text-souls-light">Master Sound</span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={cn(
                  "w-14 h-8 rounded-full transition-colors relative",
                  soundEnabled ? "bg-souls-red" : "bg-souls-darker",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 bg-souls-light rounded-full absolute top-1 transition-all",
                    soundEnabled ? "right-1" : "left-1",
                  )}
                />
              </button>
            </div>

            {/* Music Volume */}
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-mono text-sm text-souls-light/70">Music Volume</span>
                <span className="font-mono text-sm text-souls-gold">{musicVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={musicVolume}
                onChange={(e) => setMusicVolume(Number(e.target.value))}
                disabled={!soundEnabled}
                className="w-full h-2 bg-souls-darker rounded-none appearance-none cursor-pointer accent-souls-red disabled:opacity-50"
              />
            </div>

            {/* SFX Volume */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-mono text-sm text-souls-light/70">Sound Effects</span>
                <span className="font-mono text-sm text-souls-gold">{sfxVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sfxVolume}
                onChange={(e) => setSfxVolume(Number(e.target.value))}
                disabled={!soundEnabled}
                className="w-full h-2 bg-souls-darker rounded-none appearance-none cursor-pointer accent-souls-red disabled:opacity-50"
              />
            </div>
          </motion.div>

          <motion.div
            className="bg-souls-dark border-4 border-souls-darker p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Monitor className="w-6 h-6 text-souls-red" />
              <h2 className="font-mono text-xl text-souls-light uppercase">Display</h2>
            </div>

            {/* Theme Selection */}
            <div className="mb-4">
              <span className="font-mono text-sm text-souls-light/70 block mb-3">Theme</span>
              <div className="flex gap-2">
                {[
                  { id: "dark", icon: Moon, label: "Dark" },
                  { id: "light", icon: Sun, label: "Light" },
                  { id: "system", icon: Monitor, label: "System" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setTheme(option.id as typeof theme)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-3 border-2 font-mono text-sm transition-colors",
                      theme === option.id
                        ? "bg-souls-red border-souls-red-dark text-souls-light"
                        : "bg-souls-darker border-souls-darker text-souls-light/60 hover:text-souls-light",
                    )}
                  >
                    <option.icon className="w-4 h-4" />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Game Settings */}
          <motion.div
            className="bg-souls-dark border-4 border-souls-darker p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Gamepad2 className="w-6 h-6 text-souls-red" />
              <h2 className="font-mono text-xl text-souls-light uppercase">Gameplay</h2>
            </div>

            {/* Difficulty */}
            <div className="mb-6">
              <span className="font-mono text-sm text-souls-light/70 block mb-3">Difficulty</span>
              <div className="flex gap-2">
                {[
                  { id: "easy", label: "Easy", desc: "More hints, forgiving" },
                  { id: "normal", label: "Normal", desc: "Balanced challenge" },
                  { id: "hard", label: "Hard", desc: "No mercy" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setDifficulty(option.id as typeof difficulty)}
                    className={cn(
                      "flex-1 py-3 px-2 border-2 font-mono text-sm transition-colors",
                      difficulty === option.id
                        ? "bg-souls-red border-souls-red-dark text-souls-light"
                        : "bg-souls-darker border-souls-darker text-souls-light/60 hover:text-souls-light",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {notifications ? (
                  <Bell className="w-5 h-5 text-souls-light/70" />
                ) : (
                  <BellOff className="w-5 h-5 text-souls-light/40" />
                )}
                <span className="font-mono text-sm text-souls-light">Push Notifications</span>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={cn(
                  "w-14 h-8 rounded-full transition-colors relative",
                  notifications ? "bg-souls-red" : "bg-souls-darker",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 bg-souls-light rounded-full absolute top-1 transition-all",
                    notifications ? "right-1" : "left-1",
                  )}
                />
              </button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <PixelButton variant="secondary" onClick={() => router.back()}>
              Cancel
            </PixelButton>
            <PixelButton variant="primary" onClick={() => router.back()}>
              Save Changes
            </PixelButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
