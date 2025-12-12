"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Code,
  Globe,
  Layout,
  Palette,
  Zap,
  ChevronRight,
  Search,
  Star,
  Trophy,
  Crown,
  Medal,
  Award,
  Flame,
  Box,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import Sidebar from "@/components/Sidebar"
import { cn } from "@/lib/utils"

interface LearningModule {
  id: string
  title: string
  description: string
  icon: typeof BookOpen
  color: string
  lessons: number
  completedLessons: number
  difficulty: "beginner" | "intermediate" | "advanced" | "master"
  topics: string[]
  stage: number
}

const learningModules: LearningModule[] = [
  // Stage 1 - Foundation
  {
    id: "internet-basics",
    title: "Internet Fundamentals",
    description: "Understand how the web works: protocols, DNS, HTTP, and more.",
    icon: Globe,
    color: "#0074D9",
    lessons: 18,
    completedLessons: 12,
    difficulty: "beginner",
    stage: 1,
    topics: ["HTTP/HTTPS", "DNS", "IP Addresses", "TCP/IP", "Web Browsers", "CDN", "Caching", "Web Servers"],
  },
  {
    id: "html-mastery",
    title: "HTML Mastery",
    description: "Learn semantic HTML, accessibility, and document structure.",
    icon: Code,
    color: "#FF851B",
    lessons: 28,
    completedLessons: 18,
    difficulty: "beginner",
    stage: 1,
    topics: [
      "Semantic Elements",
      "Forms",
      "Tables",
      "Media",
      "Accessibility",
      "Meta Tags",
      "SVG Basics",
      "Canvas Intro",
    ],
  },
  // Stage 2 - Styling
  {
    id: "css-fundamentals",
    title: "CSS Fundamentals",
    description: "Master selectors, box model, and basic styling techniques.",
    icon: Palette,
    color: "#B10DC9",
    lessons: 25,
    completedLessons: 10,
    difficulty: "beginner",
    stage: 2,
    topics: ["Selectors", "Box Model", "Colors", "Typography", "Units", "Specificity", "Inheritance"],
  },
  {
    id: "css-layouts",
    title: "CSS Layouts",
    description: "Flexbox, Grid, and responsive design patterns.",
    icon: Layout,
    color: "#39CCCC",
    lessons: 32,
    completedLessons: 5,
    difficulty: "intermediate",
    stage: 2,
    topics: ["Flexbox", "CSS Grid", "Positioning", "Float", "Multi-column", "Responsive Design", "Media Queries"],
  },
  {
    id: "css-animations",
    title: "CSS Animations",
    description: "Transitions, keyframes, and performance optimization.",
    icon: Zap,
    color: "#FF4136",
    lessons: 20,
    completedLessons: 0,
    difficulty: "intermediate",
    stage: 2,
    topics: ["Transitions", "Keyframes", "Transform", "Performance", "GPU Acceleration", "Easing Functions"],
  },
  // Stage 3 - JavaScript
  {
    id: "javascript-core",
    title: "JavaScript Core",
    description: "Variables, functions, DOM manipulation, and async programming.",
    icon: Zap,
    color: "#FFDC00",
    lessons: 45,
    completedLessons: 0,
    difficulty: "intermediate",
    stage: 3,
    topics: ["Variables", "Functions", "DOM", "Events", "Async/Await", "Promises", "Error Handling", "Closures"],
  },
  {
    id: "javascript-advanced",
    title: "JavaScript Advanced",
    description: "OOP, functional programming, and design patterns.",
    icon: Code,
    color: "#F0DB4F",
    lessons: 38,
    completedLessons: 0,
    difficulty: "advanced",
    stage: 3,
    topics: ["Classes", "Prototypes", "FP Patterns", "Design Patterns", "Modules", "Web APIs", "Testing"],
  },
  // Stage 4 - Frameworks
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    description: "Components, hooks, state management, and React patterns.",
    icon: Layout,
    color: "#61DAFB",
    lessons: 40,
    completedLessons: 0,
    difficulty: "advanced",
    stage: 4,
    topics: ["Components", "Hooks", "State", "Props", "Context", "Effects", "Refs", "Performance"],
  },
  {
    id: "react-advanced",
    title: "React Advanced",
    description: "Server components, suspense, and advanced patterns.",
    icon: Layout,
    color: "#087EA4",
    lessons: 35,
    completedLessons: 0,
    difficulty: "master",
    stage: 4,
    topics: ["Server Components", "Suspense", "Concurrent", "Custom Hooks", "State Machines", "Testing"],
  },
  {
    id: "nextjs-mastery",
    title: "Next.js Mastery",
    description: "App router, server actions, and full-stack development.",
    icon: Globe,
    color: "#000000",
    lessons: 42,
    completedLessons: 0,
    difficulty: "master",
    stage: 4,
    topics: ["App Router", "Server Actions", "API Routes", "Middleware", "Caching", "Deployment"],
  },
  // Stage 5 - 3D Animation (Dark Souls Theme)
  {
    id: "3d-modeling-basics",
    title: "Ashen Forge: 3D Basics",
    description: "Enter the dark realm of 3D modeling. Learn vertices, edges, and faces.",
    icon: Box,
    color: "#8B0000",
    lessons: 30,
    completedLessons: 0,
    difficulty: "intermediate",
    stage: 5,
    topics: ["Vertices & Edges", "Mesh Modeling", "Primitives", "Subdivision", "Sculpting Intro", "UV Mapping"],
  },
  {
    id: "3d-rigging",
    title: "Bonfire's Blessing: Rigging",
    description: "Bind the bones of your creations. Master skeletal systems and weight painting.",
    icon: Box,
    color: "#4A0404",
    lessons: 28,
    completedLessons: 0,
    difficulty: "advanced",
    stage: 5,
    topics: ["Armatures", "Bone Chains", "Weight Painting", "IK/FK", "Constraints", "Facial Rigging"],
  },
  {
    id: "3d-animation-fundamentals",
    title: "Souls of Motion: Animation",
    description: "Breathe life into the hollow. Master keyframes and motion principles.",
    icon: Flame,
    color: "#CC5500",
    lessons: 35,
    completedLessons: 0,
    difficulty: "advanced",
    stage: 5,
    topics: ["Keyframes", "Timing", "Easing", "Walk Cycles", "Combat Animation", "Physics Simulation"],
  },
  {
    id: "3d-environments",
    title: "Firelink Shrine: Environments",
    description: "Build dark, atmospheric worlds. Master lighting and mood.",
    icon: Box,
    color: "#2F4F4F",
    lessons: 32,
    completedLessons: 0,
    difficulty: "advanced",
    stage: 5,
    topics: ["World Building", "Atmospheric Lighting", "Fog & Particles", "Gothic Architecture", "Ruins & Decay"],
  },
  {
    id: "3d-rendering",
    title: "Kiln of the First Flame: Rendering",
    description: "Master the final art. Shaders, materials, and cinematic output.",
    icon: Flame,
    color: "#FF6600",
    lessons: 25,
    completedLessons: 0,
    difficulty: "master",
    stage: 5,
    topics: ["PBR Materials", "Shader Nodes", "Compositing", "Ray Tracing", "Export & Optimization"],
  },
]

const rankingData = [
  { rank: 1, name: "ShadowLord", rating: 2847, level: 89, badge: Crown, trend: "up", change: 12, country: "US" },
  { rank: 2, name: "CodeKnight", rating: 2756, level: 82, badge: Medal, trend: "up", change: 8, country: "UK" },
  { rank: 3, name: "ByteMaster", rating: 2698, level: 75, badge: Medal, trend: "down", change: 3, country: "DE" },
  { rank: 4, name: "PixelSoul", rating: 2634, level: 68, badge: Award, trend: "up", change: 15, country: "JP" },
  { rank: 5, name: "DarkCoder", rating: 2589, level: 61, badge: Award, trend: "same", change: 0, country: "FR" },
  { rank: 6, name: "HollowDev", rating: 2523, level: 54, badge: Star, trend: "down", change: 5, country: "KR" },
  { rank: 7, name: "AshMaster", rating: 2467, level: 47, badge: Star, trend: "up", change: 22, country: "BR" },
  { rank: 8, name: "FireKeeper", rating: 2401, level: 40, badge: Star, trend: "up", change: 7, country: "CA" },
]

const difficultyColors = {
  beginner: "text-green-400 border-green-400",
  intermediate: "text-yellow-400 border-yellow-400",
  advanced: "text-red-400 border-red-400",
  master: "text-purple-400 border-purple-400",
}

const stageNames = ["", "Foundation", "Styling", "JavaScript", "Frameworks", "3D Animation"]

export default function LearnPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("docs")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [selectedStage, setSelectedStage] = useState<number | null>(null)

  const filteredModules = learningModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDifficulty = !selectedDifficulty || module.difficulty === selectedDifficulty
    const matchesStage = !selectedStage || module.stage === selectedStage
    return matchesSearch && matchesDifficulty && matchesStage
  })

  const totalLessons = learningModules.reduce((acc, m) => acc + m.lessons, 0)
  const completedLessons = learningModules.reduce((acc, m) => acc + m.completedLessons, 0)

  const userStats = {
    rank: 42,
    rating: 1856,
    level: 15,
    gamesPlayed: 127,
    winRate: 68,
    streak: 7,
    highestRating: 1923,
  }

  return (
    <div className="min-h-screen bg-souls-darker relative flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 pt-24 pb-8 px-4 lg:pl-72 relative">
        <ParticleBackground theme="hell" />
        <HUD />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
            {/* Left Column - Roadmap (4/5 width) */}
            <div className="xl:col-span-4">
              {/* Header */}
              <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-8 h-8 text-souls-red" />
                  <h1 className="font-mono text-3xl uppercase tracking-wider text-souls-light">Learning Codex</h1>
                </div>
                <p className="font-mono text-souls-light/60">
                  Master frontend development with comprehensive documentation and interactive lessons.
                </p>
              </motion.div>

              {/* Progress Overview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              >
                <div className="bg-souls-dark/80 border-2 border-souls-darker p-4">
                  <span className="font-mono text-xs text-souls-light/60 uppercase">Total Progress</span>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm font-mono mb-1">
                      <span className="text-souls-light">
                        {completedLessons} / {totalLessons}
                      </span>
                      <span className="text-souls-light/60">
                        {Math.round((completedLessons / totalLessons) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-souls-darker">
                      <motion.div
                        className="h-full bg-souls-red"
                        initial={{ width: 0 }}
                        animate={{ width: `${(completedLessons / totalLessons) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-souls-dark/80 border-2 border-souls-darker p-4">
                  <span className="font-mono text-xs text-souls-light/60 uppercase">Modules</span>
                  <p className="font-mono text-2xl text-souls-light mt-1">
                    {learningModules.length}
                    <span className="text-souls-light/40 text-sm ml-2">Available</span>
                  </p>
                </div>

                <div className="bg-souls-dark/80 border-2 border-souls-darker p-4">
                  <span className="font-mono text-xs text-souls-light/60 uppercase">Current Streak</span>
                  <p className="font-mono text-2xl text-souls-gold mt-1 flex items-center gap-2">
                    <Star className="w-5 h-5" />7 Days
                  </p>
                </div>
              </motion.div>

              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-4 mb-6"
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-souls-light/40" />
                  <input
                    type="text"
                    placeholder="Search modules or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-souls-dark border-2 border-souls-darker pl-10 pr-4 py-2 font-mono text-sm text-souls-light placeholder:text-souls-light/40 focus:border-souls-red outline-none"
                  />
                </div>

                {/* Stage Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono text-xs text-souls-light/60 self-center mr-2">Stage:</span>
                  <button
                    onClick={() => setSelectedStage(null)}
                    className={cn(
                      "px-3 py-1 font-mono text-xs uppercase border-2 transition-colors",
                      !selectedStage
                        ? "bg-souls-red border-souls-red-dark text-souls-light"
                        : "bg-souls-dark border-souls-darker text-souls-light/60 hover:text-souls-light",
                    )}
                  >
                    All
                  </button>
                  {[1, 2, 3, 4, 5].map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setSelectedStage(stage)}
                      className={cn(
                        "px-3 py-1 font-mono text-xs uppercase border-2 transition-colors",
                        selectedStage === stage
                          ? "bg-souls-red border-souls-red-dark text-souls-light"
                          : "bg-souls-dark border-souls-darker text-souls-light/60 hover:text-souls-light",
                      )}
                    >
                      {stageNames[stage]}
                    </button>
                  ))}
                </div>

                {/* Difficulty Filter */}
                <div className="flex flex-wrap gap-2">
                  <span className="font-mono text-xs text-souls-light/60 self-center mr-2">Level:</span>
                  <button
                    onClick={() => setSelectedDifficulty(null)}
                    className={cn(
                      "px-3 py-1 font-mono text-xs uppercase border-2 transition-colors",
                      !selectedDifficulty
                        ? "bg-souls-red border-souls-red-dark text-souls-light"
                        : "bg-souls-dark border-souls-darker text-souls-light/60 hover:text-souls-light",
                    )}
                  >
                    All
                  </button>
                  {["beginner", "intermediate", "advanced", "master"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={cn(
                        "px-3 py-1 font-mono text-xs uppercase border-2 transition-colors",
                        selectedDifficulty === diff
                          ? "bg-souls-red border-souls-red-dark text-souls-light"
                          : "bg-souls-dark border-souls-darker text-souls-light/60 hover:text-souls-light",
                      )}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {filteredModules.map((module, index) => {
                  const progress = (module.completedLessons / module.lessons) * 100
                  const Icon = module.icon

                  return (
                    <motion.div
                      key={module.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.01 }}
                      className="bg-souls-dark/80 border-2 border-souls-darker p-4 cursor-pointer group"
                      onClick={() => router.push(`/learn/${module.id}`)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-2"
                          style={{ borderColor: module.color, backgroundColor: `${module.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: module.color }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <h3 className="font-mono text-sm text-souls-light group-hover:text-souls-red transition-colors truncate">
                              {module.title}
                            </h3>
                            <ChevronRight className="w-4 h-4 text-souls-light/40 group-hover:text-souls-red group-hover:translate-x-1 transition-all flex-shrink-0" />
                          </div>

                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-1.5 py-0.5 text-xs font-mono bg-souls-darker text-souls-light/60">
                              S{module.stage}
                            </span>
                            <span
                              className={cn(
                                "px-1.5 py-0.5 text-xs font-mono border",
                                difficultyColors[module.difficulty],
                              )}
                            >
                              {module.difficulty}
                            </span>
                          </div>

                          {/* Progress */}
                          <div className="mt-2">
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-souls-light/60">
                                {module.completedLessons}/{module.lessons}
                              </span>
                              <span className="text-souls-light/40">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1 bg-souls-darker">
                              <motion.div
                                className="h-full"
                                style={{ backgroundColor: module.color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {filteredModules.length === 0 && (
                <div className="text-center py-12">
                  <p className="font-mono text-souls-light/60">No modules found matching your search.</p>
                </div>
              )}
            </div>

            <div className="xl:col-span-1">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-souls-dark/80 border-2 border-souls-darker sticky top-24 overflow-hidden"
              >
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-souls-gold/20 to-transparent p-3 border-b-2 border-souls-darker">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-souls-gold" />
                    <h2 className="font-mono text-sm uppercase tracking-wider text-souls-light">Rankings</h2>
                  </div>
                </div>

                {/* Your Stats Card - Compact */}
                <div className="p-3 border-b-2 border-souls-darker bg-souls-red/5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-10 h-10 border-2 border-souls-red bg-souls-darker flex items-center justify-center">
                      <span className="font-mono text-sm text-souls-red">#{userStats.rank}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-xs text-souls-light/60">Your Rank</p>
                      <p className="font-mono text-lg text-souls-gold">{userStats.rating}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-souls-darker p-2">
                      <p className="font-mono text-lg text-green-400">{userStats.winRate}%</p>
                      <p className="font-mono text-xs text-souls-light/40">Win Rate</p>
                    </div>
                    <div className="bg-souls-darker p-2">
                      <p className="font-mono text-lg text-souls-gold">{userStats.streak}</p>
                      <p className="font-mono text-xs text-souls-light/40">Streak</p>
                    </div>
                  </div>
                </div>

                {/* Top Players - Compact */}
                <div className="divide-y divide-souls-darker max-h-[400px] overflow-y-auto">
                  {rankingData.map((player, index) => {
                    const BadgeIcon = player.badge
                    const TrendIcon =
                      player.trend === "up" ? TrendingUp : player.trend === "down" ? TrendingDown : Minus

                    return (
                      <div key={player.rank} className="p-2 hover:bg-souls-darker/50 transition-colors">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "font-mono text-xs w-5",
                              player.rank <= 3 ? "text-souls-gold" : "text-souls-light/40",
                            )}
                          >
                            {player.rank}
                          </span>
                          <BadgeIcon
                            className={cn(
                              "w-4 h-4",
                              player.rank === 1
                                ? "text-souls-gold"
                                : player.rank === 2
                                  ? "text-gray-300"
                                  : player.rank === 3
                                    ? "text-amber-600"
                                    : "text-souls-light/40",
                            )}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-mono text-xs text-souls-light truncate">{player.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-xs text-souls-gold">{player.rating}</p>
                            <div
                              className={cn(
                                "flex items-center gap-0.5 text-xs",
                                player.trend === "up"
                                  ? "text-green-400"
                                  : player.trend === "down"
                                    ? "text-red-400"
                                    : "text-souls-light/40",
                              )}
                            >
                              <TrendIcon className="w-3 h-3" />
                              <span>{player.change}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="p-2 border-t-2 border-souls-darker">
                  <button className="w-full py-1.5 font-mono text-xs text-souls-light/60 hover:text-souls-light transition-colors flex items-center justify-center gap-1">
                    View All
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
