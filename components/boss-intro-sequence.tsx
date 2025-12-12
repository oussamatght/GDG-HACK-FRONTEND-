"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Boss } from "@/lib/boss-data"
import { TypewriterText } from "./typewriter-text"

type BossIntroSequenceProps = {
  boss: Boss
  worldTheme: string
  onComplete: () => void
}

export function BossIntroSequence({ boss, worldTheme, onComplete }: BossIntroSequenceProps) {
  const [phase, setPhase] = useState<"entrance" | "dialogue" | "ready">("entrance")

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("dialogue"), 2000)
    return () => clearTimeout(timer1)
  }, [])

  const handleDialogueComplete = () => {
    setTimeout(() => setPhase("ready"), 500)
  }

  const handleStart = () => {
    onComplete()
  }

  const dialogues: Record<string, string> = {
    "corrupted-tag": "Your HTML is weak... Let me show you true corruption!",
    "syntax-demon": "Missing semicolons? I feast on your careless mistakes!",
    "inferno-lord": "So you've made it this far... But can you build something REAL? Show me your portfolio, mortal!",
  }

  return (
    <AnimatePresence mode="wait">
      {phase === "entrance" && (
        <motion.div
          key="entrance"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-center"
          >
            <motion.div
              className="text-8xl mb-4"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              {boss.isFinal ? "FINAL" : "MINI"}
            </motion.div>
            <motion.h1
              className="font-mono text-4xl text-souls-red uppercase tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              {boss.isFinal ? "BOSS" : "BOSS"}
            </motion.h1>
          </motion.div>
        </motion.div>
      )}

      {phase === "dialogue" && (
        <motion.div
          key="dialogue"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-souls-darker p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Boss Visual */}
          <motion.div
            className="w-48 h-48 border-4 border-souls-red bg-souls-dark flex items-center justify-center mb-8"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <span className="font-mono text-6xl text-souls-red">{boss.isFinal ? "BOSS" : "MB"}</span>
          </motion.div>

          {/* Boss Name */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="font-mono text-3xl text-souls-red uppercase tracking-wider">{boss.name}</h1>
            <p className="font-mono text-sm text-souls-light/60 mt-1">{boss.title}</p>
          </motion.div>

          {/* Dialogue Box */}
          <motion.div
            className="max-w-2xl w-full bg-souls-darker border-4 border-souls-light p-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <TypewriterText
              text={dialogues[boss.id] || "Prepare yourself, warrior!"}
              speed={30}
              onComplete={handleDialogueComplete}
              className="font-mono text-lg text-souls-light leading-relaxed"
            />
          </motion.div>
        </motion.div>
      )}

      {phase === "ready" && (
        <motion.div
          key="ready"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-souls-darker p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Challenge Info */}
          <motion.div
            className="max-w-2xl w-full bg-souls-dark border-4 border-souls-red p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            <h2 className="font-mono text-2xl text-souls-red uppercase mb-4">{boss.challenge.title}</h2>
            <p className="font-mono text-sm text-souls-light mb-4">{boss.challenge.description}</p>

            <div className="mb-4">
              <h3 className="font-mono text-xs text-souls-light/60 uppercase mb-2">Requirements</h3>
              <ul className="space-y-1">
                {boss.challenge.requirements.map((req, i) => (
                  <li key={i} className="font-mono text-sm text-souls-light flex items-start gap-2">
                    <span className="text-souls-red">{">"}</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="font-mono text-xs text-souls-light/60">Time Limit</span>
                <p className="font-mono text-lg text-souls-light">{Math.floor(boss.timeLimit / 60)} minutes</p>
              </div>
              <div>
                <span className="font-mono text-xs text-souls-light/60">Rewards</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-souls-gold">
                    {boss.rewards.gold.min}-{boss.rewards.gold.max}G
                  </span>
                  <span className="font-mono text-cyan-400">
                    {boss.rewards.diamonds.min}-{boss.rewards.diamonds.max}D
                  </span>
                  <span className="font-mono text-blue-400">+{boss.rewards.iq} IQ</span>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleStart}
              className="w-full py-4 bg-souls-red border-4 border-souls-red-dark font-mono text-lg uppercase text-souls-light hover:bg-souls-red-light transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Begin Battle
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
