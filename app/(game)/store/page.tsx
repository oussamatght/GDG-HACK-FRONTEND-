"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { STORE_ITEMS, type StoreItem } from "@/lib/store-data"
import { StoreItemCard } from "@/components/store-item-card"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import { cn } from "@/lib/utils"

type Category = "all" | "clothing" | "weapons" | "consumables" | "special"

export default function StorePage() {
  const { player, setPlayer } = useGame()
  const [selectedCategory, setSelectedCategory] = useState<Category>("all")
  const [ownedItems, setOwnedItems] = useState<string[]>([])

  const categories: { id: Category; label: string }[] = [
    { id: "all", label: "All" },
    { id: "clothing", label: "Clothing" },
    { id: "weapons", label: "Weapons" },
    { id: "consumables", label: "Consumables" },
    { id: "special", label: "Special" },
  ]

  const filteredItems =
    selectedCategory === "all" ? STORE_ITEMS : STORE_ITEMS.filter((item) => item.category === selectedCategory)

  const handleBuy = (item: StoreItem) => {
    const canAfford = item.currency === "gold" ? player.gold >= item.price : player.diamonds >= item.price

    if (!canAfford || ownedItems.includes(item.id)) return

    // Deduct currency
    if (item.currency === "gold") {
      setPlayer({ ...player, gold: player.gold - item.price })
    } else {
      setPlayer({ ...player, diamonds: player.diamonds - item.price })
    }

    // Add to owned (for non-consumables)
    if (item.category !== "consumables") {
      setOwnedItems([...ownedItems, item.id])
    }

    // Apply effect for consumables
    if (item.category === "consumables") {
      if (item.id === "health-potion") {
        setPlayer((prev) => ({
          ...prev,
          hp: Math.min(prev.maxHp, prev.hp + 50),
        }))
      }
    }
  }

  const canAfford = (item: StoreItem) => {
    return item.currency === "gold" ? player.gold >= item.price : player.diamonds >= item.price
  }

  return (
    <div className="min-h-screen bg-souls-darker relative">
      <ParticleBackground theme="hell" />

      {/* HUD */}
      <HUD />

      {/* Main Content */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Store Header */}
          <motion.div className="text-center mb-8" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <h1 className="font-mono text-4xl text-souls-red uppercase tracking-wider">Store</h1>
            <p className="font-mono text-sm text-souls-light/60 mt-2">Gear up for your journey</p>
          </motion.div>

          {/* Currency Display */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 bg-souls-dark px-6 py-3 border-2 border-souls-darker">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-sm font-bold text-yellow-900">
                G
              </div>
              
            </div>
            <div className="flex items-center gap-3 bg-souls-dark px-6 py-3 border-2 border-souls-darker">
              <div className="w-8 h-8 bg-cyan-400 rotate-45 flex items-center justify-center">
                <span className="-rotate-45 text-sm font-bold text-cyan-900">D</span>
              </div>
              <span className="font-mono text-2xl text-cyan-400">{player.diamonds}</span>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 font-mono text-sm uppercase transition-colors border-2",
                  selectedCategory === cat.id
                    ? "bg-souls-red border-souls-red-dark text-souls-light"
                    : "bg-souls-dark border-souls-darker text-souls-light/60 hover:text-souls-light",
                )}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Items Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <StoreItemCard
                  item={{ ...item, owned: ownedItems.includes(item.id) }}
                  canAfford={canAfford(item)}
                  onBuy={handleBuy}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
