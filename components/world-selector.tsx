"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import type { World } from "@/lib/game-state"
import { cn } from "@/lib/utils"

type WorldSelectorProps = {
  worlds: World[]
  currentWorld: World
  onWorldSelect?: (world: World) => void
}

export function WorldSelector({ worlds, currentWorld, onWorldSelect }: WorldSelectorProps) {
  const router = useRouter()

  const handleSelect = (world: World) => {
    if (onWorldSelect) return onWorldSelect(world)
    router.push(`/world/${world.id}`)
  }

  return (
    <div className="flex items-center gap-2 bg-souls-darker/80 p-2 border-2 border-souls-dark">
      {worlds.map((world, index) => (
        <motion.button
          key={world.id}
          onClick={() => world.unlocked && handleSelect(world)}
          disabled={!world.unlocked}
          className={cn(
            "relative px-4 py-2 font-mono text-xs uppercase transition-all",
            world.id === currentWorld.id ? "text-souls-light" : "text-souls-light/50",
            !world.unlocked && "opacity-30 cursor-not-allowed",
          )}
          style={{
            backgroundColor: world.id === currentWorld.id ? world.colorPalette.dark : "transparent",
            borderBottom:
              world.id === currentWorld.id ? `3px solid ${world.colorPalette.primary}` : "3px solid transparent",
          }}
          whileHover={world.unlocked ? { backgroundColor: `${world.colorPalette.dark}80` } : {}}
        >
          {!world.unlocked && (
            <svg className="w-3 h-3 absolute top-1 right-1" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span className="block">World {index + 1}</span>
          <span className="block text-[10px] opacity-70">{world.name}</span>
        </motion.button>
      ))}
    </div>
  )
}
