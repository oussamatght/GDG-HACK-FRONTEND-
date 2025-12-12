"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import { PixelButton } from "@/components/pixel-button"
import { cn } from "@/lib/utils"

export default function MultiplayerPage() {
  const { player } = useGame()
  const [selectedMode, setSelectedMode] = useState<"1v1" | "5v5" | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleFindMatch = () => {
    setIsSearching(true)
    // Simulate matchmaking
    setTimeout(() => {
      setIsSearching(false)
      alert("Matchmaking is not yet implemented in this demo!")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-souls-darker relative">
      <ParticleBackground theme="hell" />

      {/* HUD */}
      <HUD />

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-8" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h1 className="font-mono text-4xl text-souls-red uppercase tracking-wider">Multiplayer</h1>
            <p className="font-mono text-sm text-souls-light/60 mt-2">Compete against other warriors</p>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* 1v1 Mode */}
            <motion.button
              onClick={() => setSelectedMode("1v1")}
              className={cn(
                "p-6 border-4 text-left transition-all",
                selectedMode === "1v1"
                  ? "bg-souls-red/20 border-souls-red"
                  : "bg-souls-dark border-souls-darker hover:border-souls-red/50",
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-souls-darker flex items-center justify-center">
                  <span className="font-mono text-2xl text-souls-red">1v1</span>
                </div>
                <div>
                  <h2 className="font-mono text-xl text-souls-light uppercase">Duel Mode</h2>
                  <p className="font-mono text-xs text-souls-light/60">Quick 1-on-1 battles</p>
                </div>
              </div>
              <div className="space-y-2 font-mono text-sm text-souls-light/80">
                <p>{">"} Solve 5 problems against an opponent</p>
                <p>{">"} Winner takes 1 item from loser</p>
                <p>{">"} Matched by IQ level (+-10)</p>
                <p>{">"} 30 minute time limit</p>
              </div>
            </motion.button>

            {/* 5v5 Mode */}
            <motion.button
              onClick={() => setSelectedMode("5v5")}
              className={cn(
                "p-6 border-4 text-left transition-all",
                selectedMode === "5v5"
                  ? "bg-souls-red/20 border-souls-red"
                  : "bg-souls-dark border-souls-darker hover:border-souls-red/50",
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-souls-darker flex items-center justify-center">
                  <span className="font-mono text-2xl text-souls-red">5v5</span>
                </div>
                <div>
                  <h2 className="font-mono text-xl text-souls-light uppercase">Team Battle</h2>
                  <p className="font-mono text-xs text-souls-light/60">Collaborative project mode</p>
                </div>
              </div>
              <div className="space-y-2 font-mono text-sm text-souls-light/80">
                <p>{">"} Build a complex project as a team</p>
                <p>{">"} 1 day to 1 week time limit</p>
                <p>{">"} Judged on functionality and code quality</p>
                <p>{">"} Major rewards for winning team</p>
              </div>
            </motion.button>
          </motion.div>

          {/* Player Stats for Matchmaking */}
          <motion.div
            className="bg-souls-dark border-4 border-souls-darker p-6 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-4">Your Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <span className="font-mono text-2xl text-souls-light">{player.iq}</span>
                <p className="font-mono text-xs text-souls-light/60">IQ</p>
              </div>
              <div className="text-center">
                <span className="font-mono text-2xl text-green-400">15</span>
                <p className="font-mono text-xs text-souls-light/60">Wins</p>
              </div>
              <div className="text-center">
                <span className="font-mono text-2xl text-red-400">8</span>
                <p className="font-mono text-xs text-souls-light/60">Losses</p>
              </div>
              <div className="text-center">
                <span className="font-mono text-2xl text-souls-gold">65%</span>
                <p className="font-mono text-xs text-souls-light/60">Win Rate</p>
              </div>
            </div>
          </motion.div>

          {/* Find Match Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <PixelButton
              variant="primary"
              size="lg"
              onClick={handleFindMatch}
              disabled={!selectedMode || isSearching}
              className="min-w-[200px]"
            >
              {isSearching ? (
                <span className="flex items-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                    *
                  </motion.span>
                  Searching...
                </span>
              ) : (
                "Find Match"
              )}
            </PixelButton>
            {!selectedMode && <p className="font-mono text-xs text-souls-light/40 mt-2">Select a mode to continue</p>}
          </motion.div>

          {/* Recent Matches */}
          <motion.div
            className="mt-8 bg-souls-dark border-4 border-souls-darker p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-4">Recent Matches</h3>
            <div className="space-y-3">
              {[
                { opponent: "CodeMaster99", mode: "1v1", result: "win", score: "5-3" },
                { opponent: "PixelNinja", mode: "1v1", result: "loss", score: "2-5" },
                { opponent: "Team Alpha", mode: "5v5", result: "win", score: "1st" },
              ].map((match, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 border-2 ${
                    match.result === "win" ? "border-green-600 bg-green-900/20" : "border-red-600 bg-red-900/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-1 font-mono text-xs uppercase ${match.result === "win" ? "bg-green-600" : "bg-red-600"} text-white`}
                    >
                      {match.result}
                    </span>
                    <span className="font-mono text-sm text-souls-light">{match.opponent}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-souls-light/60 uppercase">{match.mode}</span>
                    <span className="font-mono text-sm text-souls-light">{match.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
