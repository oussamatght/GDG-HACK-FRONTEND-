"use client"

import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import Link from "next/link"
import { User } from "lucide-react"
import Image from "next/image"

export function HUD() {
  const { player } = useGame()

  const hpPercent = (player.hp / player.maxHp) * 100
  const iqPercent = ((player.iq - 85) / (160 - 85)) * 100

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 bg-souls-darker/90 border-b-4 border-souls-dark p-3"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Player Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 border-2 border-souls-red overflow-hidden">
            <img
              src={player.avatar || "/placeholder.svg"}
              alt="Avatar"
              className="w-full h-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-mono text-sm text-souls-light">{player.username}</span>
            {/* HP Bar */}
            <div className="flex items-center gap-2">
              <span className="text-red-400 text-xs font-mono w-6">HP</span>
              <div className="w-24 h-3 bg-souls-dark border border-souls-darker">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${hpPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="font-mono text-xs text-souls-light/70">
                {player.hp}/{player.maxHp}
              </span>
            </div>
            {/* IQ Bar - cyan/blue color */}
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 text-xs font-mono w-6">IQ</span>
              <div className="w-24 h-3 bg-souls-dark border border-souls-darker">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${iqPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="font-mono text-xs text-souls-light/70">{player.iq}</span>
            </div>
          </div>
        </div>

        {/* Logo in center */}
        <div className="hidden md:flex items-center">
          <div className="w-12 h-12 relative">
            <Image
              src="/images/code-souls-logo-v1-1.png"
              alt="Code Souls"
              fill
              className="object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>

        {/* Currency */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-yellow-900">
              G
            </div>
            <span className="font-mono text-souls-gold">
  {Number(player.gold ?? 0).toLocaleString()}
</span>


          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-cyan-400 rotate-45 flex items-center justify-center">
              <span className="-rotate-45 text-xs font-bold text-cyan-900">D</span>
            </div>
            <span className="font-mono text-cyan-400">{player.diamonds}</span>
          </div>
          <Link
            href="/profile"
            className="px-3 py-1 font-mono text-xs uppercase bg-souls-dark border-2 border-souls-darker text-souls-light hover:bg-souls-darker transition-colors flex items-center gap-2"
          >
            <User size={14} />
            <span className="hidden sm:inline">Profile</span>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
