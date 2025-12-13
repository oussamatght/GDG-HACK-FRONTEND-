"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { DEFAULT_PLAYER, WORLDS, type PlayerStats, type World, type Stage } from "./game-state"

type GameContextType = {
  player: PlayerStats
  setPlayer: (player: PlayerStats) => void
  worlds: World[]
  currentWorld: World | null
  setCurrentWorld: (world: World | null) => void
  stages: Stage[]
  setStages: (stages: Stage[]) => void
  currentStage: Stage | null
  setCurrentStage: (stage: Stage | null) => void
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  hasCompletedIntro: boolean
  setHasCompletedIntro: (completed: boolean) => void
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<PlayerStats>(DEFAULT_PLAYER)
  const [worlds] = useState<World[]>(WORLDS)
  const [currentWorld, setCurrentWorld] = useState<World | null>(null)
  const [stages, setStages] = useState<Stage[]>([])
  const [currentStage, setCurrentStage] = useState<Stage | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasCompletedIntro, setHasCompletedIntro] = useState(false)

  return (
    <GameContext.Provider
      value={{
        player,
        setPlayer,
        worlds,
        currentWorld,
        setCurrentWorld,
        stages,
        setStages,
        currentStage,
        setCurrentStage,
        isAuthenticated,
        setIsAuthenticated,
        hasCompletedIntro,
        setHasCompletedIntro,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within a GameProvider")
  }
  return context
}
