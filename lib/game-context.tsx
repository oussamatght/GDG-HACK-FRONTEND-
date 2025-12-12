// lib/game-context.tsx
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from './api-client'

interface Player {
  id?: string
  username: string
  email?: string
  level?: number
  health?: number
  score?: number
  // Add other player properties as needed
}

interface GameContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  player: Player
  setPlayer: (player: Player) => void
  logout: () => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [player, setPlayer] = useState<Player>({ username: '' })

  // Check for existing auth on mount
  useEffect(() => {
    const token = apiClient.getToken()
    if (token) {
      // Verify token by fetching current user
      apiClient.getCurrentUser()
        .then(({ user }) => {
          setIsAuthenticated(true)
          setPlayer({
            id: user.id,
            username: user.name,
            email: user.email
          })
        })
        .catch(() => {
          // Token is invalid, clear it
          apiClient.clearToken()
        })
    }
  }, [])

  const logout = () => {
    apiClient.clearToken()
    setIsAuthenticated(false)
    setPlayer({ username: '' })
  }

  return (
    <GameContext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      player,
      setPlayer,
      logout
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}