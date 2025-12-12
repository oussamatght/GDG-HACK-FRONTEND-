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
  FileCode,
  GitBranch,
} from "lucide-react"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import Sidebar from "@/components/Sidebar"
import { cn } from "@/lib/utils"
import { LEARNING_MODULES, getTotalLessons, getTotalCompletedLessons, getModuleProgress } from "@/lib/lessons-data"

const iconMap: Record<string, typeof BookOpen> = {
  "internet-basics": Globe,
  "html-mastery": Code,
  "css-styling": Palette,
  "javascript-core": Zap,
  "react-fundamentals": Layout,
  typescript: FileCode,
  nextjs: Layout,
  "git-github": GitBranch,
}

const difficultyColors = {
  beginner: "text-green-400 border-green-400",
  intermediate: "text-yellow-400 border-yellow-400",
  advanced: "text-red-400 border-red-400",
}

export default function LearnPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("docs")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const filteredModules = LEARNING_MODULES.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesDifficulty = !selectedDifficulty || module.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  const totalLessons = getTotalLessons()
  const completedLessons = getTotalCompletedLessons()

  return (
    <div className="min-h-screen bg-souls-darker relative flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 pt-24 pb-8 px-4 lg:pl-64 relative">
        <ParticleBackground theme="hell" />
        <HUD />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-8 h-8 text-souls-red" />
              <h1 className="font-mono text-2xl sm:text-3xl uppercase tracking-wider text-souls-light">
                Learning Codex
              </h1>
            </div>
            <p className="font-mono text-sm sm:text-base text-souls-light/60">
              Master frontend development with {totalLessons}+ comprehensive lessons and interactive challenges.
            </p>
          </motion.div>

          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-souls-dark/80 border-2 border-souls-darker p-4">
              <span className="font-mono text-xs text-souls-light/60 uppercase">Total Progress</span>
              <div className="mt-2">
                <div className="flex justify-between text-sm font-mono mb-1">
                  <span className="text-souls-light">
                    {completedLessons} / {totalLessons}
                  </span>
                  <span className="text-souls-light/60">{Math.round((completedLessons / totalLessons) * 100)}%</span>
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
                {LEARNING_MODULES.length}
                <span className="text-souls-light/40 text-sm ml-2">Available</span>
              </p>
            </div>

            <div className="bg-souls-dark/80 border-2 border-souls-darker p-4 sm:col-span-2 lg:col-span-1">
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
            className="flex flex-col sm:flex-row gap-4 mb-6"
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

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDifficulty(null)}
                className={cn(
                  "px-3 py-2 font-mono text-xs uppercase border-2 transition-colors",
                  !selectedDifficulty
                    ? "bg-souls-red border-souls-red-dark text-souls-light"
                    : "bg-souls-dark border-souls-darker text-souls-light/60 hover:text-souls-light",
                )}
              >
                All
              </button>
              {["beginner", "intermediate", "advanced"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={cn(
                    "px-3 py-2 font-mono text-xs uppercase border-2 transition-colors",
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

          {/* Module Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {filteredModules.map((module, index) => {
              const progress = getModuleProgress(module.id)
              const Icon = iconMap[module.id] || BookOpen
              const completedCount = module.lessons.filter((l) => l.completed).length

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
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 flex-shrink-0 flex items-center justify-center border-2"
                      style={{ borderColor: module.color, backgroundColor: `${module.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: module.color }} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="font-mono text-lg text-souls-light group-hover:text-souls-red transition-colors truncate">
                          {module.title}
                        </h3>
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs font-mono border whitespace-nowrap w-fit",
                            difficultyColors[module.difficulty],
                          )}
                        >
                          {module.difficulty}
                        </span>
                      </div>

                      <p className="font-mono text-sm text-souls-light/60 mt-1 line-clamp-2">{module.description}</p>

                      {/* Progress */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs font-mono mb-1">
                          <span className="text-souls-light/60">
                            {completedCount} / {module.lessons.length} lessons
                          </span>
                          <span className="text-souls-light/40">{progress}%</span>
                        </div>
                        <div className="h-1.5 bg-souls-darker">
                          <motion.div
                            className="h-full"
                            style={{ backgroundColor: module.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          />
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {module.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-1.5 py-0.5 bg-souls-darker text-xs font-mono text-souls-light/50"
                          >
                            {topic}
                          </span>
                        ))}
                        {module.topics.length > 3 && (
                          <span className="px-1.5 py-0.5 text-xs font-mono text-souls-light/40">
                            +{module.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 flex-shrink-0 text-souls-light/40 group-hover:text-souls-red group-hover:translate-x-1 transition-all hidden sm:block" />
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
      </div>
    </div>
  )
}
