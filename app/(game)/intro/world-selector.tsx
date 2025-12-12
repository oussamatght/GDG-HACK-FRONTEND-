"use client"

import { useState } from "react"
import { worlds, type World } from "@/lib/game-data"
import { Lock, ChevronRight, Flame, Waves, Sun, TreePine } from "lucide-react"
import { cn } from "@/lib/utils"

interface WorldSelectorProps {
  onSelectWorld: (world: World) => void
}

const worldIcons = {
  hell: Flame,
  ocean: Waves,
  desert: Sun,
  forest: TreePine,
}

export function WorldSelector({ onSelectWorld }: WorldSelectorProps) {
  const [hoveredWorld, setHoveredWorld] = useState(null)

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-2 text-white font-mono tracking-wider">
          CODE SOULS
        </h1>
        <p className="text-center text-gray-400 mb-8 font-mono">Choose your world. Begin your journey.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {worlds.map((world) => {
            const Icon = worldIcons[world.id as keyof typeof worldIcons]
            const isHovered = hoveredWorld === world.id

            return (
              <button
                key={world.id}
                onClick={() => world.unlocked && onSelectWorld(world)}
                onMouseEnter={() => setHoveredWorld(world.id)}
                onMouseLeave={() => setHoveredWorld(null)}
                disabled={!world.unlocked}
                className={cn(
                  "relative overflow-hidden rounded-xl border-2 transition-all duration-300 group",
                  world.unlocked
                    ? "border-white/20 hover:border-white/50 cursor-pointer"
                    : "border-gray-800 cursor-not-allowed opacity-60",
                )}
              >
                {/* Background Image */}
                <div
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-transform duration-500",
                    isHovered && world.unlocked && "scale-110",
                  )}
                  style={{ backgroundImage: `url(${world.backgroundImage})` }}
                />

                {/* Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t transition-opacity duration-300",
                    world.themeColor,
                    world.unlocked ? "opacity-40" : "opacity-70",
                  )}
                />

                {/* Lock overlay for locked worlds */}
                {!world.unlocked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Lock className="w-16 h-16 text-gray-500" />
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 p-6 md:p-8 h-64 flex flex-col justify-end text-left">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("p-2 rounded-lg", world.unlocked ? "bg-white/20" : "bg-gray-800/50")}>
                      <Icon className={cn("w-6 h-6", world.unlocked ? "text-white" : "text-gray-500")} />
                    </div>
                    <span
                      className={cn(
                        "text-sm font-mono uppercase tracking-wider px-2 py-1 rounded",
                        world.unlocked ? "bg-white/20 text-white" : "bg-gray-800/50 text-gray-500",
                      )}
                    >
                      {world.level}
                    </span>
                  </div>

                  <h2
                    className={cn(
                      "text-2xl md:text-3xl font-bold mb-2 font-mono",
                      world.unlocked ? "text-white" : "text-gray-500",
                    )}
                  >
                    {world.name}
                  </h2>

                  <p className={cn("text-sm mb-4", world.unlocked ? "text-white/80" : "text-gray-600")}>
                    {world.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={cn("text-sm font-mono", world.unlocked ? "text-white/60" : "text-gray-600")}>
                      {world.stages.length} Stages
                    </span>
                    {world.unlocked && (
                      <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
