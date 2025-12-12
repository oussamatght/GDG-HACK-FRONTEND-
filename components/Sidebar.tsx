"use client"

import { cn } from "@/lib/utils"
import { Map, Trophy, BookOpen, Settings, LogOut, User, Swords, ShoppingBag } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "map", label: "World Map", icon: Map, href: "/world-selector" },
  { id: "arena", label: "Arena", icon: Swords, href: "/arena" },
  { id: "store", label: "Store", icon: ShoppingBag, href: "/store" },
  { id: "leaderboard", label: "Rankings", icon: Trophy, href: "/profile" },
  { id: "docs", label: "Codex", icon: BookOpen, href: "/learn" },
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const router = useRouter()

  const handleNavigation = (item: (typeof navItems)[0]) => {
    onTabChange(item.id)
    router.push(item.href)
  }

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-16 lg:w-64 bg-souls-darker border-r-2 border-souls-dark flex flex-col z-40">
      {/* Navigation */}
      <nav className="flex-1 p-2 lg:p-4 space-y-1 pt-4">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => handleNavigation(item)}
            className={cn(
              "w-full justify-center lg:justify-start gap-3 h-12 lg:h-12 font-mono",
              activeTab === item.id
                ? "bg-souls-red/20 text-souls-red border-l-2 border-souls-red"
                : "text-souls-light/60 hover:bg-souls-dark hover:text-souls-light",
            )}
          >
            <item.icon size={20} />
            <span className="hidden lg:inline font-medium">{item.label}</span>
          </Button>
        ))}
      </nav>

      {/* Footer - Profile and Settings */}
      <div className="p-2 lg:p-4 border-t-2 border-souls-dark space-y-1">
        <Button
          variant="ghost"
          onClick={() => router.push("/profile")}
          className="w-full justify-center lg:justify-start gap-3 h-12 lg:h-12 text-souls-light/60 hover:bg-souls-dark hover:text-souls-light font-mono"
        >
          <User size={20} />
          <span className="hidden lg:inline font-medium">Profile</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-center lg:justify-start gap-3 h-12 lg:h-12 text-souls-light/60 hover:bg-souls-dark hover:text-souls-light font-mono"
        >
          <Settings size={20} />
          <span className="hidden lg:inline font-medium">Settings</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="w-full justify-center lg:justify-start gap-3 h-12 lg:h-12 text-souls-red hover:bg-souls-red/10 font-mono"
        >
          <LogOut size={20} />
          <span className="hidden lg:inline font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  )
}
