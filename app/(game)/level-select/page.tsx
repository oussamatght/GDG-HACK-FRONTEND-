"use client"
import { Lock, Flame, Waves, Sun, TreePine, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

// GIF backgrounds for each world
const worldBackgrounds: Record<string, string> = {
  hell: "/images/6wzk87f02cu01-gif-20-28948-c3-97453-29.gif",
  ocean: "/images/png-20ballena.gif",
  desert: "/images/download.gif",
  forest: "/images/dribbble-daylight-forest-background-anim-gif-20-28400-c3-97300-29.gif",
}

const worldIcons = {
  hell: Flame,
  ocean: Waves,
  desert: Sun,
  forest: TreePine,
}

interface WorldData {
  id: string
  name: string
  level: string
  stages: number
  description: string
  unlocked: boolean
}

const worldsData: WorldData[] = [
  {
    id: "hell",
    name: "Inferno Core",
    level: "BEGINNER",
    stages: 50,
    description: "The heart of the corrupted network. Master the basics of how the Internet works.",
    unlocked: true,
  },
  {
    id: "ocean",
    name: "Digital Depths",
    level: "INTERMEDIATE",
    stages: 60,
    description: "Dive into the data streams. Learn HTML, CSS, and responsive design.",
    unlocked: false,
  },
  {
    id: "desert",
    name: "Ancient Archives",
    level: "SENIOR",
    stages: 70,
    description: "Uncover the secrets of JavaScript and modern frameworks.",
    unlocked: false,
  },
  {
    id: "forest",
    name: "Evercode Grove",
    level: "HERO",
    stages: 80,
    description: "The final frontier. Master advanced patterns and full-stack development.",
    unlocked: false,
  },
]

const worldColors: Record<string, { text: string; overlay: string }> = {
  hell: {
    text: "text-red-400",
    overlay: "from-red-900/80 via-red-900/40 to-transparent",
  },
  ocean: {
    text: "text-cyan-400",
    overlay: "from-cyan-900/80 via-cyan-900/40 to-transparent",
  },
  desert: {
    text: "text-yellow-500",
    overlay: "from-yellow-900/80 via-yellow-900/40 to-transparent",
  },
  forest: {
    text: "text-green-400",
    overlay: "from-green-900/80 via-green-900/40 to-transparent",
  },
}

export default function LevelSelectPage() {
  const router = useRouter()

  const handleSelectWorld = (world: WorldData) => {
    if (world.unlocked) {
      router.push(`/world-selector`)
    }
  }

  return (
    <div className="min-h-screen bg-souls-darker flex items-center justify-center p-4 md:p-8">
      {/* 2x2 Grid layout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-5xl"
      >
        {worldsData.map((world, index) => {
          const Icon = worldIcons[world.id as keyof typeof worldIcons]
          const colors = worldColors[world.id]
          const backgroundGif = worldBackgrounds[world.id]

          return (
            <motion.button
              key={world.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => handleSelectWorld(world)}
              disabled={!world.unlocked}
              className={cn(
                "relative overflow-hidden rounded-lg transition-all duration-300 text-left h-48 md:h-56 group",
                world.unlocked ? "cursor-pointer hover:scale-[1.02]" : "cursor-not-allowed",
              )}
            >
              {/* GIF Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${backgroundGif})`,
                  filter: world.unlocked ? "none" : "grayscale(80%) brightness(0.4)",
                }}
              />

              {/* Gradient Overlay */}
              <div className={cn("absolute inset-0 bg-gradient-to-r", colors.overlay)} />

              {/* Lock overlay for locked worlds */}
              {!world.unlocked && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                  <Lock className="w-16 h-16 text-gray-500/80" />
                </div>
              )}

              {/* Content */}
              <div className="relative z-10 p-5 md:p-6 h-full flex flex-col justify-between">
                <div>
                  {/* Level Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        world.unlocked ? "bg-white/10 backdrop-blur-sm" : "bg-gray-800/50",
                      )}
                    >
                      <Icon className={cn("w-5 h-5", world.unlocked ? "text-white" : "text-gray-500")} />
                    </div>
                    <span
                      className={cn(
                        "font-mono text-xs tracking-wider px-2 py-1 rounded",
                        world.unlocked ? "bg-white/10 backdrop-blur-sm text-white" : "bg-gray-800/50 text-gray-500",
                      )}
                    >
                      {world.level}
                    </span>
                  </div>

                  {/* World Name */}
                  <h3
                    className={cn(
                      "font-mono text-xl md:text-3xl tracking-wide mb-2",
                      world.unlocked ? "text-white" : "text-gray-500",
                    )}
                  >
                    {world.name}
                  </h3>

                  {/* Description */}
                  <p
                    className={cn(
                      "font-mono text-xs md:text-sm leading-relaxed max-w-md",
                      world.unlocked ? "text-white/70" : "text-gray-600",
                    )}
                  >
                    {world.description}
                  </p>
                </div>

                {/* Bottom section */}
                <div className="flex items-center justify-between">
                  <span className={cn("font-mono text-sm", world.unlocked ? colors.text : "text-gray-500")}>
                    {world.stages} Stages
                  </span>

                  {world.unlocked && (
                    <ChevronRight className="w-6 h-6 text-white/60 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>
    </div>
  )
}
