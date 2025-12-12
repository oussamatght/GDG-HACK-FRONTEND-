import type React from "react"
import { GameProvider } from "@/lib/game-context"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>
}
