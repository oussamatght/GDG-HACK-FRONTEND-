"use client"

import React from "react"
import { Home, MapPin, ShoppingCart, Users, Book } from "lucide-react"

type SidebarProps = {
  activeTab?: string
  onTabChange?: (tab: string) => void
}

export default function Sidebar({ activeTab = "map", onTabChange = () => {} }: SidebarProps) {
  const tabs = [
    { id: "map", label: "Map", Icon: MapPin },
    { id: "store", label: "Store", Icon: ShoppingCart },
    { id: "arena", label: "Arena", Icon: Users },
    { id: "docs", label: "Docs", Icon: Book },
    { id: "leaderboard", label: "Leaderboard", Icon: Home },
  ]

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-sidebar p-4 hidden lg:block">
      <div className="space-y-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => onTabChange?.(t.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-mono text-left transition-colors ${
              activeTab === t.id ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/10"
            }`}
          >
            <t.Icon className="w-5 h-5" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
