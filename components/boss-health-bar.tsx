"use client"

import { motion } from "framer-motion"
import type { Boss } from "@/lib/boss-data"

type BossHealthBarProps = {
  boss: Boss
  currentHp: number
}

export function BossHealthBar({ boss, currentHp }: BossHealthBarProps) {
  const hpPercent = (currentHp / boss.hp) * 100

  return (
    <div className="w-full">
      {/* Boss Name */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="font-mono text-xl text-souls-red uppercase tracking-wider">{boss.name}</h2>
          <p className="font-mono text-xs text-souls-light/60">{boss.title}</p>
        </div>
        <div className="text-right">
          <span className="font-mono text-sm text-souls-light">
            {currentHp} / {boss.hp}
          </span>
        </div>
      </div>

      {/* HP Bar */}
      <div className="relative h-6 bg-souls-darker border-2 border-souls-dark overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-700 via-red-500 to-red-600"
          initial={{ width: "100%" }}
          animate={{ width: `${hpPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Damage Flash Effect */}
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.2 }}
          key={currentHp}
        />

        {/* HP Segments */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-souls-darker/50 last:border-r-0" />
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div className="flex items-center gap-2 mt-2">
        <span className="font-mono text-xs text-souls-light/60">Difficulty:</span>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`text-xs ${i < boss.difficulty ? "text-red-400" : "text-souls-dark"}`}>
              SKULL
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
