"use client"

import { motion } from "framer-motion"
import type { StoreItem } from "@/lib/store-data"
import { cn } from "@/lib/utils"
import Image from "next/image"

type StoreItemCardProps = {
  item: StoreItem
  canAfford: boolean
  onBuy: (item: StoreItem) => void
}

const rarityColors = {
  common: "border-gray-500",
  rare: "border-blue-500",
  epic: "border-purple-500",
  legendary: "border-yellow-500",
}

const rarityBgColors = {
  common: "bg-gray-500/10",
  rare: "bg-blue-500/10",
  epic: "bg-purple-500/10",
  legendary: "bg-yellow-500/10",
}

const categoryIcons: Record<string, string> = {
  clothing: "👤",
  weapons: "⚔️",
  consumables: "🧪",
  special: "⭐",
}

export function StoreItemCard({ item, canAfford, onBuy }: StoreItemCardProps) {
  return (
    <motion.div
      className={cn(
        "relative bg-souls-dark border-2 p-4 flex flex-col",
        rarityColors[item.rarity],
        rarityBgColors[item.rarity],
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Rarity Badge */}
      <span
        className={cn(
          "absolute -top-2 -right-2 px-2 py-0.5 text-[10px] font-mono uppercase",
          item.rarity === "common" && "bg-gray-500 text-white",
          item.rarity === "rare" && "bg-blue-500 text-white",
          item.rarity === "epic" && "bg-purple-500 text-white",
          item.rarity === "legendary" && "bg-yellow-500 text-black",
        )}
      >
        {item.rarity}
      </span>

      <div className="w-16 h-16 mx-auto flex items-center justify-center mb-3 relative">
        {item.image ? (
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        ) : (
          <div className="w-full h-full bg-souls-darker flex items-center justify-center border border-souls-darker">
            <span className="text-2xl">{categoryIcons[item.category]}</span>
          </div>
        )}
      </div>

      {/* Item Name */}
      <h3 className="font-mono text-sm text-souls-light text-center uppercase">{item.name}</h3>

      {/* Description */}
      <p className="font-mono text-xs text-souls-light/60 text-center mt-1 flex-1">{item.description}</p>

      {/* Effect */}
      {item.effect && (
        <div className="mt-2 py-1 px-2 bg-souls-darker text-center">
          <span className="font-mono text-xs text-green-400">{item.effect}</span>
        </div>
      )}

      {/* Price */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {item.currency === "gold" ? (
          <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center text-xs font-bold text-yellow-900">
            G
          </div>
        ) : (
          <div className="w-5 h-5 bg-cyan-400 rotate-45 flex items-center justify-center">
            <span className="-rotate-45 text-xs font-bold text-cyan-900">D</span>
          </div>
        )}
        <span className={cn("font-mono text-lg", item.currency === "gold" ? "text-souls-gold" : "text-cyan-400")}>
          {item.price}
        </span>
      </div>

      {/* Buy Button */}
      <motion.button
        onClick={() => onBuy(item)}
        disabled={!canAfford || item.owned}
        className={cn(
          "mt-3 py-2 font-mono text-xs uppercase transition-colors",
          item.owned
            ? "bg-green-600 text-white cursor-default"
            : canAfford
              ? "bg-souls-red text-souls-light hover:bg-souls-red-light"
              : "bg-souls-darker text-souls-light/30 cursor-not-allowed",
        )}
        whileHover={canAfford && !item.owned ? { scale: 1.02 } : {}}
        whileTap={canAfford && !item.owned ? { scale: 0.98 } : {}}
      >
        {item.owned ? "Owned" : "Buy"}
      </motion.button>
    </motion.div>
  )
}
