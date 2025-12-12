"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { WORLDS, type Stage } from "@/lib/game-state"
import { HUD } from "@/components/hud"
import { WorldMap } from "@/components/world-map"
import { WorldSelector } from "@/components/world-selector"
import { ParticleBackground } from "@/components/particle-background"
import Sidebar from '@/components/sidebar'

type Props = {
  worldId: number
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

export default function WorldPageClient({ worldId }: Props) {
  const router = useRouter()
  const { worlds, setCurrentWorld, currentWorld } = useGame()
  const [stages, setStages] = useState<Stage[]>([])

  const world = WORLDS.find((w) => w.id === Number(worldId)) || WORLDS[0]

  useEffect(() => {
    setCurrentWorld(world)
    setStages(generateStages(Number(worldId), 20))
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
      <Sidebar activeTab="map" onTabChange={(tab) => {
        if (tab === 'map') return router.push(`/world/${worldId}`)
        if (tab === 'store') return router.push('/store')
        if (tab === 'arena') return router.push('/arena')
        if (tab === 'docs') return router.push('/codex')
        if (tab === 'leaderboard') return router.push('/leaderboard')
      }} />

      <div className="flex-1 pt-24 pb-8 px-4 lg:pl-64">
        <ParticleBackground theme={world.theme} />
        <HUD />

        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div>
              <h1 className="font-mono text-3xl uppercase tracking-wider" style={{ color: world.colorPalette.primary }}>
                {world.name}
              </h1>
              <p className="font-mono text-sm text-souls-light/60 mt-1">
                {stages.filter((s) => s.completed).length} / {stages.length} Stages Completed
              </p>
            </div>

            <WorldSelector worlds={worlds} currentWorld={world} onWorldSelect={handleWorldSelect} />
          </motion.div>

          <motion.div
            className="bg-souls-dark/50 border-4 border-souls-darker overflow-hidden"
            style={{ minHeight: "600px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <WorldMap world={world} stages={stages} onStageSelect={handleStageSelect} />
          </motion.div>

          <motion.div
            className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[
              { label: "Total Stars", value: stages.reduce((acc, s) => acc + s.stars, 0), max: stages.length * 3 },
              { label: "Stages Done", value: stages.filter((s) => s.completed).length, max: stages.length },
              { label: "Bosses Defeated", value: stages.filter((s) => s.isBoss && s.completed).length, max: stages.filter((s) => s.isBoss).length },
              { label: "Perfect Stages", value: stages.filter((s) => s.stars === 3).length, max: stages.length },
            ].map((stat) => (
              <div key={stat.label} className="bg-souls-dark/50 border-2 border-souls-darker p-4 text-center">
                <span className="font-mono text-xs text-souls-light/60 uppercase">{stat.label}</span>
                <p className="font-mono text-2xl text-souls-light mt-1">
                  {stat.value}
                  <span className="text-souls-light/40 text-sm">/{stat.max}</span>
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
