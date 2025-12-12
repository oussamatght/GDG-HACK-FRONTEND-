"use client"

import { useState } from "react"
import { worlds, type World } from "@/lib/game-data"
import { Lock, Flame, Waves, Sun, TreePine } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { HUD } from "@/components/hud"
import Sidebar from "@/components/Sidebar"

const worldIcons = {
  hell: Flame,
  ocean: Waves,
  desert: Sun,
  forest: TreePine,
}

const worldDisplayNames: Record<string, { name: string; level: string; stages: number }> = {
  hell: {
    name: "INFERNO",
    level: "Beginner",
    stages: 50,
  },
  ocean: {
    name: "ABYSS",
    level: "Intermediate",
    stages: 60,
  },
  desert: {
    name: "MIRAGE",
    level: "Senior",
    stages: 70,
  },
  forest: {
    name: "SANCTUARY",
    level: "Hero",
    stages: 80,
  },
}

const worldColors: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
  hell: {
    bg: "bg-red-900/80",
    border: "border-red-500",
    text: "text-red-400",
    iconBg: "text-red-400",
  },
  ocean: {
    bg: "bg-slate-700/80",
    border: "border-slate-500",
    text: "text-slate-300",
    iconBg: "text-cyan-400",
  },
  desert: {
    bg: "bg-amber-900/60",
    border: "border-amber-600",
    text: "text-amber-400",
    iconBg: "text-yellow-400",
  },
  forest: {
    bg: "bg-emerald-900/60",
    border: "border-emerald-500",
    text: "text-emerald-400",
    iconBg: "text-green-400",
  },
}

const worldBackgrounds: Record<string, string> = {
  hell: "/images/6wzk87f02cu01-gif-20-28948-c3-97453-29.gif",
  ocean: "/images/png-20ballena.gif",
  desert: "/images/download.gif",
  forest: "/images/dribbble-daylight-forest-background-anim-gif-20-28400-c3-97300-29.gif",
}

export default function WorldSelectorPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("map")
  const [selectedWorld, setSelectedWorld] = useState<World>(worlds[0])

  const handleSelectWorld = (world: World) => {
    if (world.unlocked) {
      setSelectedWorld(world)
    }
  }

  const handleEnterWorld = () => {
    if (selectedWorld.unlocked) {
      router.push(`/world/${selectedWorld.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-souls-darker relative flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 pt-24 pb-8 px-4 lg:pl-72 relative">
        <HUD />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-2xl text-souls-light tracking-wider mb-6"
          >
            SELECT WORLD
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
          >
            {worlds.map((world, index) => {
              const Icon = worldIcons[world.id as keyof typeof worldIcons]
              const display = worldDisplayNames[world.id]
              const colors = worldColors[world.id]
              const isSelected = selectedWorld.id === world.id

              return (
                <motion.button
                  key={world.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  onClick={() => handleSelectWorld(world)}
                  disabled={!world.unlocked}
                  className={cn(
                    "relative overflow-hidden rounded-lg transition-all duration-300 text-center p-4 h-32",
                    colors.bg,
                    isSelected && world.unlocked ? `ring-2 ${colors.border}` : "border border-transparent",
                    world.unlocked ? "cursor-pointer hover:scale-[1.02]" : "cursor-not-allowed opacity-50",
                  )}
                >
                  {/* Lock overlay for locked worlds */}
                  {!world.unlocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                      <Lock className="w-8 h-8 text-gray-500/80" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <Icon className={cn("w-8 h-8 mb-2", world.unlocked ? colors.iconBg : "text-gray-500")} />
                    <h3
                      className={cn("font-mono text-lg tracking-wider", world.unlocked ? colors.text : "text-gray-500")}
                    >
                      {display.name}
                    </h3>
                    <p className={cn("font-mono text-xs mt-1", world.unlocked ? "text-gray-400" : "text-gray-600")}>
                      {display.level}
                    </p>
                    <p className={cn("font-mono text-xs", world.unlocked ? "text-gray-500" : "text-gray-600")}>
                      {display.stages} Stages
                    </p>
                  </div>

                  {/* Progress bar for selected unlocked world */}
                  {isSelected && world.unlocked && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                      <div className={cn("h-full w-1/3", colors.text.replace("text", "bg"))} />
                    </div>
                  )}
                </motion.button>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-lg overflow-hidden h-80"
          >
            {/* GIF Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${worldBackgrounds[selectedWorld.id]})`,
              }}
            />

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* World Info Header */}
            <div className="absolute top-0 left-0 right-0 text-center pt-6 z-10">
              <h2 className={cn("font-mono text-2xl tracking-wider", worldColors[selectedWorld.id].text)}>
                WORLD {worlds.findIndex((w) => w.id === selectedWorld.id) + 1}:{" "}
                {worldDisplayNames[selectedWorld.id].name}
              </h2>
              <p className="font-mono text-sm text-gray-300 mt-1">
                {worldDisplayNames[selectedWorld.id].level} • {worldDisplayNames[selectedWorld.id].stages} Stages
              </p>
            </div>

            {/* Stage Nodes */}
            <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-16 z-10">
              {[1, 2, 3, 4].map((stage) => {
                const isCompleted = stage <= 2
                const isCurrent = stage === 3
                const isLocked = stage > 3
                const stars = stage === 1 ? 3 : stage === 2 ? 2 : stage === 3 ? 1 : 0

                return (
                  <div key={stage} className="flex flex-col items-center">
                    {/* Lock icon above locked stages */}
                    {isLocked && <Lock className="w-4 h-4 text-gray-500 mb-1" />}

                    {/* Stage Node */}
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center text-xl font-mono border-4 transition-all",
                        isCompleted && "bg-green-500 border-green-400 text-white",
                        isCurrent && "bg-red-600/80 border-red-500 text-white animate-pulse",
                        isLocked && "bg-red-900/50 border-red-800 text-red-400",
                      )}
                    >
                      {stage}
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 mt-2">
                      {[1, 2, 3].map((star) => (
                        <span key={star} className={cn("text-sm", star <= stars ? "text-yellow-400" : "text-gray-600")}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Dotted path connecting nodes */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-3/4 border-t-2 border-dashed border-gray-500/50 z-0" />

            {/* Enter World Button */}
            <motion.button
              onClick={handleEnterWorld}
              className={cn(
                "absolute bottom-4 left-1/2 -translate-x-1/2 px-8 py-2 rounded font-mono text-sm",
                "bg-red-600 hover:bg-red-500 text-white transition-colors",
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ENTER WORLD
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
