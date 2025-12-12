"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { WORLDS, type Stage } from "@/lib/game-state"
import { HUD } from "@/components/hud"
import { WorldMap } from "@/components/world-map"
import { WorldSelector } from "@/components/world-selector"
import Sidebar from "@/components/Sidebar"
import { Trophy, TrendingUp, Star, Target } from "lucide-react"

const worldBackgrounds: Record<string, string> = {
  hell: "/images/6wzk87f02cu01-gif-20-28948-c3-97453-29.gif",
  ocean: "/images/png-20ballena.gif",
  desert: "/images/download.gif",
  forest: "/images/dribbble-daylight-forest-background-anim-gif-20-28400-c3-97300-29.gif",
}

function generateStages(worldId: number, count = 20): Stage[] {
  const stages: Stage[] = []
  const bossStages = [8, 15]
  const finalBossStage = count

  for (let i = 1; i <= count; i++) {
    const isBoss = bossStages.includes(i)
    const isFinalBoss = i === finalBossStage

    stages.push({
      id: i,
      worldId,
      name: isFinalBoss ? "Inferno Lord" : isBoss ? `Mini Boss ${bossStages.indexOf(i) + 1}` : `Stage ${i}`,
      stars: i <= 3 ? Math.floor(Math.random() * 3) + 1 : 0,
      completed: i <= 3,
      locked: i > 4,
      isBoss,
      isFinalBoss,
    })
  }

  return stages
}

function WorldRankingSidebar({ worldId }: { worldId: number }) {
  const mockRankings = [
    { rank: 1, name: "ShadowCoder", score: 15420, country: "🇺🇸", gold: 5000 },
    { rank: 2, name: "NightBlade", score: 14850, country: "🇰🇷", gold: 4500 },
    { rank: 3, name: "CodeMaster", score: 14200, country: "🇯🇵", gold: 4000 },
    { rank: 4, name: "DarkSoul", score: 13890, country: "🇬🇧", gold: 3500 },
    { rank: 5, name: "ByteWarrior", score: 13450, country: "🇩🇪", gold: 3000 },
  ]

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="w-64 bg-souls-dark/90 backdrop-blur-sm border-2 border-souls-darker p-4 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-souls-darker pb-3">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h3 className="font-mono text-sm uppercase tracking-wider text-souls-light">World Ranking</h3>
      </div>

      {/* Your Rank */}
      <div className="bg-souls-darker/80 p-3 border border-souls-red/30">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-souls-light/60">Your Rank</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="font-mono text-xs text-green-400">+12</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-2xl text-souls-red">#42</span>
          <div className="flex-1">
            <p className="font-mono text-sm text-souls-light">CodeWarrior</p>
            <p className="font-mono text-xs text-souls-gold">8,450 pts</p>
          </div>
        </div>
      </div>

      {/* Top Players */}
      <div className="flex-1 space-y-2">
        <h4 className="font-mono text-xs text-souls-light/60 uppercase">Top Players</h4>
        {mockRankings.map((player, index) => (
          <motion.div
            key={player.rank}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className={`flex items-center gap-2 p-2 ${player.rank <= 3 ? "bg-souls-darker/60" : "bg-transparent"}`}
          >
            <span
              className={`font-mono text-sm w-6 ${
                player.rank === 1
                  ? "text-yellow-400"
                  : player.rank === 2
                    ? "text-gray-300"
                    : player.rank === 3
                      ? "text-amber-600"
                      : "text-souls-light/40"
              }`}
            >
              #{player.rank}
            </span>
            <span className="text-sm">{player.country}</span>
            <span className="font-mono text-xs text-souls-light flex-1 truncate">{player.name}</span>
                <span className="font-mono text-souls-gold">
  {Number(player.gold ?? 0).toLocaleString()}
</span>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="border-t border-souls-darker pt-3 grid grid-cols-2 gap-2">
        <div className="text-center">
          <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
          <p className="font-mono text-lg text-souls-light">45</p>
          <p className="font-mono text-[10px] text-souls-light/40">Stars</p>
        </div>
        <div className="text-center">
          <Target className="w-4 h-4 text-red-400 mx-auto mb-1" />
          <p className="font-mono text-lg text-souls-light">92%</p>
          <p className="font-mono text-[10px] text-souls-light/40">Accuracy</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function WorldPage() {
  const params = useParams()
  const router = useRouter()
  const { worlds, setCurrentWorld, currentWorld } = useGame()
  const [stages, setStages] = useState<Stage[]>([])
  const [activeTab, setActiveTab] = useState("map")

  const worldId = Number(params.worldId) || 1
  const world = WORLDS.find((w) => w.id === worldId) || WORLDS[0]

  const worldTheme = world?.theme || "hell"
  const backgroundGif = worldBackgrounds[worldTheme] || worldBackgrounds.hell

  useEffect(() => {
    setCurrentWorld(world)
    setStages(generateStages(worldId, 20))
  }, [worldId, world, setCurrentWorld])

  const handleStageSelect = (stage: Stage) => {
    router.push(`/stage/${stage.id}?world=${worldId}`)
  }

  const handleWorldSelect = (selectedWorld: typeof world) => {
    router.push(`/world/${selectedWorld.id}`)
  }

  if (!currentWorld) return null

  return (
    <div className="min-h-screen bg-souls-darker relative flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      {/* Main Content */}
      <div className="flex-1 pt-24 pb-8 px-4 lg:pl-72 relative">
        {/* HUD */}
        <HUD />

        <div className="max-w-7xl mx-auto relative z-10 flex gap-4 justify-center">
          {/* Main Content Area - Centered */}
          <div className="flex-1 max-w-4xl">
            {/* World Header */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div>
                <h1
                  className="font-mono text-3xl uppercase tracking-wider"
                  style={{ color: world.colorPalette.primary }}
                >
                  {world.name}
                </h1>
                <p className="font-mono text-sm text-souls-light/60 mt-1">
                  {stages.filter((s) => s.completed).length} / {stages.length} Stages Completed
                </p>
              </div>

              <WorldSelector worlds={worlds} currentWorld={world} onWorldSelect={handleWorldSelect} />
            </motion.div>

            <motion.div
              className="relative overflow-hidden border-4 border-souls-darker mx-auto"
              style={{ minHeight: "500px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* GIF Background - only for the map area */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${backgroundGif})`,
                }}
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/40" />

              {/* World Map on top */}
              <div className="relative z-10">
                <WorldMap world={world} stages={stages} onStageSelect={handleStageSelect} />
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { label: "Total Stars", value: stages.reduce((acc, s) => acc + s.stars, 0), max: stages.length * 3 },
                { label: "Stages Done", value: stages.filter((s) => s.completed).length, max: stages.length },
                {
                  label: "Bosses Defeated",
                  value: stages.filter((s) => s.isBoss && s.completed).length,
                  max: stages.filter((s) => s.isBoss).length,
                },
                { label: "Perfect Stages", value: stages.filter((s) => s.stars === 3).length, max: stages.length },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-souls-dark/80 backdrop-blur-sm border-2 border-souls-darker p-4 text-center"
                >
                  <span className="font-mono text-xs text-souls-light/60 uppercase">{stat.label}</span>
                  <p className="font-mono text-2xl text-souls-light mt-1">
                    {stat.value}
                    <span className="text-souls-light/40 text-sm">/{stat.max}</span>
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Ranking Sidebar on Right */}
          <div className="hidden lg:block">
            <WorldRankingSidebar worldId={worldId} />
          </div>
        </div>
      </div>
    </div>
  )
}
