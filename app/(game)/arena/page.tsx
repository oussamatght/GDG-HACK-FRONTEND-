"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Swords,
  Users,
  Trophy,
  Clock,
  Target,
  Crown,
  Medal,
  Star,
  ChevronRight,
  Play,
  History,
  Zap,
  Shield,
} from "lucide-react"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import Sidebar from "@/components/Sidebar"
import { cn } from "@/lib/utils"

interface MatchHistory {
  id: string
  mode: "1v1" | "5v5"
  result: "victory" | "defeat"
  opponent: string
  opponentRating: number
  ratingChange: number
  date: string
  duration: string
  score?: string
}

const matchHistory: MatchHistory[] = [
  {
    id: "1",
    mode: "1v1",
    result: "victory",
    opponent: "DarkCoder",
    opponentRating: 1845,
    ratingChange: 24,
    date: "2 hours ago",
    duration: "12:34",
  },
  {
    id: "2",
    mode: "5v5",
    result: "defeat",
    opponent: "Team Phoenix",
    opponentRating: 2100,
    ratingChange: -18,
    date: "5 hours ago",
    duration: "25:12",
    score: "2-3",
  },
  {
    id: "3",
    mode: "1v1",
    result: "victory",
    opponent: "ByteSlayer",
    opponentRating: 1756,
    ratingChange: 18,
    date: "Yesterday",
    duration: "08:45",
  },
  {
    id: "4",
    mode: "1v1",
    result: "victory",
    opponent: "CodeNinja",
    opponentRating: 1923,
    ratingChange: 32,
    date: "Yesterday",
    duration: "15:22",
  },
  {
    id: "5",
    mode: "5v5",
    result: "victory",
    opponent: "Team Shadow",
    opponentRating: 1980,
    ratingChange: 28,
    date: "2 days ago",
    duration: "32:10",
    score: "3-1",
  },
  {
    id: "6",
    mode: "1v1",
    result: "defeat",
    opponent: "SoulMaster",
    opponentRating: 2156,
    ratingChange: -12,
    date: "2 days ago",
    duration: "06:23",
  },
  {
    id: "7",
    mode: "5v5",
    result: "defeat",
    opponent: "Team Inferno",
    opponentRating: 2250,
    ratingChange: -22,
    date: "3 days ago",
    duration: "28:45",
    score: "1-3",
  },
  {
    id: "8",
    mode: "1v1",
    result: "victory",
    opponent: "PixelKnight",
    opponentRating: 1678,
    ratingChange: 15,
    date: "3 days ago",
    duration: "10:11",
  },
]

const playerStats = {
  rating: 1856,
  rank: 42,
  wins: 87,
  losses: 40,
  winRate: 68,
  streak: 3,
  highestRating: 1923,
  totalMatches: 127,
}

export default function ArenaPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("arena")
  const [selectedMode, setSelectedMode] = useState<"1v1" | "5v5" | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const handleStartMatch = (mode: "1v1" | "5v5") => {
    setSelectedMode(mode)
    setIsSearching(true)
    // Simulate match search
    setTimeout(() => {
      setIsSearching(false)
      // Would navigate to match
    }, 3000)
  }

  const cancelSearch = () => {
    setIsSearching(false)
    setSelectedMode(null)
  }

  return (
    <div className="min-h-screen bg-souls-darker relative flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 pt-24 pb-8 px-4 lg:pl-72 relative">
        <ParticleBackground theme="hell" />
        <HUD />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Swords className="w-8 h-8 text-souls-red" />
              <h1 className="font-mono text-3xl uppercase tracking-wider text-souls-light">Arena</h1>
            </div>
            <p className="font-mono text-souls-light/60">
              Challenge other coders in real-time battles. Test your skills and climb the ranks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Game Modes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Player Stats Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-souls-red/20 via-souls-dark/80 to-souls-dark/80 border-2 border-souls-darker p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 border-2 border-souls-gold bg-souls-darker flex items-center justify-center">
                      <Crown className="w-8 h-8 text-souls-gold" />
                    </div>
                    <div>
                      <p className="font-mono text-souls-light/60 text-sm">Your Rating</p>
                      <p className="font-mono text-4xl text-souls-gold">{playerStats.rating}</p>
                      <p className="font-mono text-sm text-souls-light/40">Rank #{playerStats.rank}</p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="text-center">
                      <p className="font-mono text-2xl text-green-400">{playerStats.wins}</p>
                      <p className="font-mono text-xs text-souls-light/60">Wins</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-2xl text-red-400">{playerStats.losses}</p>
                      <p className="font-mono text-xs text-souls-light/60">Losses</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-2xl text-souls-light">{playerStats.winRate}%</p>
                      <p className="font-mono text-xs text-souls-light/60">Win Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-2xl text-souls-gold flex items-center gap-1">
                        <Zap className="w-5 h-5" />
                        {playerStats.streak}
                      </p>
                      <p className="font-mono text-xs text-souls-light/60">Streak</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Game Mode Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1v1 Mode */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className={cn(
                    "bg-souls-dark/80 border-2 p-6 cursor-pointer group transition-all",
                    selectedMode === "1v1" && isSearching
                      ? "border-souls-gold"
                      : "border-souls-darker hover:border-souls-red",
                  )}
                  onClick={() => !isSearching && handleStartMatch("1v1")}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 border-2 border-souls-red bg-souls-red/10 flex items-center justify-center">
                      <Target className="w-8 h-8 text-souls-red" />
                    </div>
                    <div>
                      <h3 className="font-mono text-2xl text-souls-light group-hover:text-souls-red transition-colors">
                        1 vs 1
                      </h3>
                      <p className="font-mono text-sm text-souls-light/60">Solo Duel</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-souls-light/60 mb-4">
                    Face off against a single opponent in a test of coding skill. Solve challenges faster to win.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-souls-light/40">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono text-xs">~10 min</span>
                    </div>
                    {selectedMode === "1v1" && isSearching ? (
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-souls-gold animate-pulse" />
                        <span className="font-mono text-sm text-souls-gold">Searching...</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-souls-red group-hover:translate-x-1 transition-transform">
                        <Play className="w-5 h-5" />
                        <span className="font-mono text-sm">Play Now</span>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* 5v5 Mode */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={cn(
                    "bg-souls-dark/80 border-2 p-6 cursor-pointer group transition-all",
                    selectedMode === "5v5" && isSearching
                      ? "border-souls-gold"
                      : "border-souls-darker hover:border-cyan-400",
                  )}
                  onClick={() => !isSearching && handleStartMatch("5v5")}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 border-2 border-cyan-400 bg-cyan-400/10 flex items-center justify-center">
                      <Users className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-mono text-2xl text-souls-light group-hover:text-cyan-400 transition-colors">
                        5 vs 5
                      </h3>
                      <p className="font-mono text-sm text-souls-light/60">Team Battle</p>
                    </div>
                  </div>
                  <p className="font-mono text-sm text-souls-light/60 mb-4">
                    Join forces with 4 teammates against another team. Coordinate and conquer together.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-souls-light/40">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono text-xs">~25 min</span>
                    </div>
                    {selectedMode === "5v5" && isSearching ? (
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-2 h-2 rounded-full bg-souls-gold animate-pulse" />
                        <span className="font-mono text-sm text-souls-gold">Searching...</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-2 text-cyan-400 group-hover:translate-x-1 transition-transform">
                        <Play className="w-5 h-5" />
                        <span className="font-mono text-sm">Play Now</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Cancel Search Button */}
              {isSearching && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={cancelSearch}
                  className="w-full py-3 bg-souls-darker border-2 border-souls-red text-souls-red font-mono uppercase hover:bg-souls-red/10 transition-colors"
                >
                  Cancel Search
                </motion.button>
              )}

              {/* Match History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-souls-dark/80 border-2 border-souls-darker"
              >
                <div className="p-4 border-b-2 border-souls-darker flex items-center gap-3">
                  <History className="w-5 h-5 text-souls-light/60" />
                  <h2 className="font-mono text-lg uppercase tracking-wider text-souls-light">Recent Matches</h2>
                </div>

                <div className="divide-y-2 divide-souls-darker">
                  {matchHistory.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 hover:bg-souls-darker/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Result indicator */}
                          <div
                            className={cn(
                              "w-12 h-12 flex items-center justify-center border-2",
                              match.result === "victory"
                                ? "border-green-500 bg-green-500/10"
                                : "border-red-500 bg-red-500/10",
                            )}
                          >
                            {match.result === "victory" ? (
                              <Trophy className="w-6 h-6 text-green-500" />
                            ) : (
                              <Shield className="w-6 h-6 text-red-500" />
                            )}
                          </div>

                          {/* Match info */}
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "font-mono text-sm px-2 py-0.5 border",
                                  match.mode === "1v1"
                                    ? "border-souls-red text-souls-red"
                                    : "border-cyan-400 text-cyan-400",
                                )}
                              >
                                {match.mode}
                              </span>
                              <span
                                className={cn(
                                  "font-mono text-sm uppercase",
                                  match.result === "victory" ? "text-green-400" : "text-red-400",
                                )}
                              >
                                {match.result}
                              </span>
                              {match.score && (
                                <span className="font-mono text-sm text-souls-light/60">({match.score})</span>
                              )}
                            </div>
                            <p className="font-mono text-souls-light">vs {match.opponent}</p>
                            <p className="font-mono text-xs text-souls-light/40">
                              Rating: {match.opponentRating} • {match.duration} • {match.date}
                            </p>
                          </div>
                        </div>

                        {/* Rating change */}
                        <div className="text-right">
                          <p
                            className={cn(
                              "font-mono text-xl",
                              match.ratingChange > 0 ? "text-green-400" : "text-red-400",
                            )}
                          >
                            {match.ratingChange > 0 ? "+" : ""}
                            {match.ratingChange}
                          </p>
                          <p className="font-mono text-xs text-souls-light/40">Rating</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Rankings */}
            <div className="space-y-6">
              {/* Top Players */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-souls-dark/80 border-2 border-souls-darker"
              >
                <div className="p-4 border-b-2 border-souls-darker bg-gradient-to-r from-souls-gold/10 to-transparent">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-souls-gold" />
                    <h2 className="font-mono text-lg uppercase tracking-wider text-souls-light">Top Players</h2>
                  </div>
                </div>

                <div className="divide-y divide-souls-darker">
                  {[
                    { rank: 1, name: "ShadowLord", rating: 2847, badge: Crown, color: "text-souls-gold" },
                    { rank: 2, name: "CodeKnight", rating: 2756, badge: Medal, color: "text-gray-300" },
                    { rank: 3, name: "ByteMaster", rating: 2698, badge: Medal, color: "text-amber-600" },
                    { rank: 4, name: "PixelSoul", rating: 2634, badge: Star, color: "text-souls-light/60" },
                    { rank: 5, name: "DarkCoder", rating: 2589, badge: Star, color: "text-souls-light/60" },
                  ].map((player, index) => (
                    <motion.div
                      key={player.rank}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-3 flex items-center gap-3 hover:bg-souls-darker/50 transition-colors"
                    >
                      <div
                        className={cn(
                          "w-8 h-8 flex items-center justify-center font-mono text-sm",
                          player.rank <= 3 ? "text-souls-gold" : "text-souls-light/40",
                        )}
                      >
                        #{player.rank}
                      </div>
                      <player.badge className={cn("w-5 h-5", player.color)} />
                      <div className="flex-1">
                        <p className="font-mono text-souls-light text-sm">{player.name}</p>
                      </div>
                      <p className="font-mono text-souls-gold">{player.rating}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="p-3 border-t-2 border-souls-darker">
                  <button className="w-full py-2 font-mono text-sm text-souls-light/60 hover:text-souls-light transition-colors flex items-center justify-center gap-2">
                    View Full Leaderboard
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-souls-dark/80 border-2 border-souls-darker p-4"
              >
                <h3 className="font-mono text-sm uppercase text-souls-light/60 mb-4">Season Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-souls-light/60">Total Matches</span>
                    <span className="font-mono text-souls-light">{playerStats.totalMatches}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-souls-light/60">Highest Rating</span>
                    <span className="font-mono text-green-400">{playerStats.highestRating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm text-souls-light/60">Current Streak</span>
                    <span className="font-mono text-souls-gold flex items-center gap-1">
                      <Zap className="w-4 h-4" />
                      {playerStats.streak} wins
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
