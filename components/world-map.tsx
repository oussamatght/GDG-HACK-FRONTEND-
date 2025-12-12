"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { Stage, World } from "@/lib/game-state"
import { StageNode } from "./stage-node"
import { StagePreviewModal } from "./stage-preview-modal"

type WorldMapProps = {
  world: World
  stages: Stage[]
  onStageSelect: (stage: Stage) => void
}

export function WorldMap({ world, stages, onStageSelect }: WorldMapProps) {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null)

  const handleStageClick = (stage: Stage) => {
    if (!stage.locked) {
      setSelectedStage(stage)
    }
  }

  const handleStartStage = () => {
    if (selectedStage) {
      onStageSelect(selectedStage)
      setSelectedStage(null)
    }
  }

  // Generate path positions for stages (snake-like pattern)
  const getStagePosition = (index: number) => {
    const row = Math.floor(index / 5)
    const col = index % 5
    const isEvenRow = row % 2 === 0

    const x = isEvenRow ? col * 120 + 60 : (4 - col) * 120 + 60
    const y = row * 100 + 80

    return { x, y }
  }

  return (
    <div className="relative w-full h-full overflow-auto">
      {/* World Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, ${world.colorPalette.primary}40, transparent 70%)`,
        }}
      />

      {/* Stage Path Container */}
      <div className="relative min-h-[800px] min-w-[700px] p-8">
        {/* Path Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {stages.slice(0, -1).map((stage, index) => {
            const current = getStagePosition(index)
            const next = getStagePosition(index + 1)
            const nextStage = stages[index + 1]

            return (
              <motion.line
                key={`path-${stage.id}`}
                x1={current.x}
                y1={current.y}
                x2={next.x}
                y2={next.y}
                stroke={nextStage?.locked ? "#333" : world.colorPalette.primary}
                strokeWidth="4"
                strokeDasharray={nextStage?.locked ? "8 8" : "0"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            )
          })}
        </svg>

        {/* Stage Nodes */}
        {stages.map((stage, index) => {
          const position = getStagePosition(index)
          const isCurrent = !stage.completed && !stage.locked && (index === 0 || stages[index - 1]?.completed)

          return (
            <StageNode
              key={stage.id}
              stage={stage}
              position={position}
              world={world}
              isCurrent={isCurrent}
              onClick={() => handleStageClick(stage)}
              delay={index * 0.03}
            />
          )
        })}
      </div>

      {/* Stage Preview Modal */}
      <StagePreviewModal
        stage={selectedStage}
        world={world}
        onClose={() => setSelectedStage(null)}
        onStart={handleStartStage}
      />
    </div>
  )
}
