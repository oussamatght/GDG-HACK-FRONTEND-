"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Boss } from "@/lib/boss-data"
import { PixelButton } from "./pixel-button"

type BossVictorySequenceProps = {
  boss: Boss
  goldEarned: number
  diamondsEarned: number
  onContinue: () => void
}

export function BossVictorySequence({ boss, goldEarned, diamondsEarned, onContinue }: BossVictorySequenceProps) {
  const [phase, setPhase] = useState<"defeat" | "rewards" | "complete">("defeat")

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("rewards"), 2500)
    const timer2 = setTimeout(() => setPhase("complete"), 5000)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <AnimatePresence mode="wait">
        {phase === "defeat" && (
          <motion.div
            key="defeat"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {/* Boss Defeat Animation */}
            <motion.div
              className="w-48 h-48 mx-auto border-4 border-souls-red bg-souls-dark flex items-center justify-center mb-8"
              animate={{
                opacity: [1, 0.5, 1, 0.3, 1, 0],
                scale: [1, 1.1, 0.9, 1.2, 0.8, 0],
                rotate: [0, 5, -5, 10, -10, 0],
              }}
              transition={{ duration: 2 }}
            >
              <span className="font-mono text-6xl text-souls-red">{boss.isFinal ? "BOSS" : "MB"}</span>
            </motion.div>

            <motion.h2
              className="font-mono text-4xl text-green-400 uppercase tracking-wider"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 2 }}
            >
              DEFEATED!
            </motion.h2>
          </motion.div>
        )}

        {phase === "rewards" && (
          <motion.div
            key="rewards"
            className="text-center max-w-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <motion.h2
              className="font-mono text-3xl text-souls-gold uppercase mb-8"
              animate={{ textShadow: ["0 0 10px #FFDC00", "0 0 30px #FFDC00", "0 0 10px #FFDC00"] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              Victory Rewards
            </motion.h2>

            <div className="grid grid-cols-3 gap-6">
              {/* Gold */}
              <motion.div
                className="bg-souls-dark border-2 border-souls-gold p-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500 flex items-center justify-center text-xl font-bold text-yellow-900">
                  G
                </div>
                <motion.span
                  className="font-mono text-2xl text-souls-gold block mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  +{goldEarned}
                </motion.span>
              </motion.div>

              {/* Diamonds */}
              <motion.div
                className="bg-souls-dark border-2 border-cyan-400 p-4"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <div className="w-12 h-12 mx-auto bg-cyan-400 rotate-45 flex items-center justify-center">
                  <span className="-rotate-45 text-xl font-bold text-cyan-900">D</span>
                </div>
                <motion.span
                  className="font-mono text-2xl text-cyan-400 block mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  +{diamondsEarned}
                </motion.span>
              </motion.div>

              {/* IQ */}
              <motion.div
                className="bg-souls-dark border-2 border-blue-400 p-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <div className="w-12 h-12 mx-auto bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white">
                  IQ
                </div>
                <motion.span
                  className="font-mono text-2xl text-blue-400 block mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  +{boss.rewards.iq}
                </motion.span>
              </motion.div>
            </div>

            {/* Special Item */}
            {boss.rewards.item && (
              <motion.div
                className="mt-6 bg-gradient-to-r from-purple-900/50 to-yellow-900/50 border-2 border-yellow-400 p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <span className="font-mono text-xs text-yellow-400 uppercase">Legendary Item Obtained!</span>
                <p className="font-mono text-lg text-souls-light mt-1">{boss.rewards.item}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {phase === "complete" && (
          <motion.div key="complete" className="text-center max-w-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.h2
              className="font-mono text-4xl text-green-400 uppercase mb-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              {boss.isFinal ? "World Complete!" : "Boss Defeated!"}
            </motion.h2>

            {boss.isFinal && (
              <motion.p
                className="font-mono text-lg text-souls-light mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                The path to the next world has been revealed...
              </motion.p>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <PixelButton variant="primary" size="lg" onClick={onContinue}>
                {boss.isFinal ? "Continue to Next World" : "Return to Map"}
              </PixelButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
