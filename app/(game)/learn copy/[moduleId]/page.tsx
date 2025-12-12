"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
  Circle,
  Clock,
  Code,
  FileText,
  HelpCircle,
  Rocket,
} from "lucide-react"
import { HUD } from "@/components/hud"
import { ParticleBackground } from "@/components/particle-background"
import { EnhancedDocumentationPanel } from "@/components/enhanced-documentation-panel"
import { PixelButton } from "@/components/pixel-button"
import { cn } from "@/lib/utils"
import { getModuleById, type LessonType } from "@/lib/lessons-data"

const sampleDocContent = {
  overview:
    "This lesson covers fundamental concepts that will help you build a strong foundation. Understanding these principles is essential for your journey as a developer.",
  codeExample: `// Example code for this lesson
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));
// Output: Hello, Developer!`,
  keyConcepts: [
    "Understanding the core fundamentals",
    "Learning best practices and patterns",
    "Building practical skills through examples",
    "Applying knowledge to real-world scenarios",
    "Debugging and problem-solving techniques",
  ],
  proTips: [
    "Practice regularly to reinforce learning",
    "Build small projects to apply concepts",
    "Read documentation and official guides",
    "Join developer communities for support",
  ],
  relatedTopics: ["Advanced Concepts", "Best Practices", "Design Patterns", "Testing"],
  externalLinks: [
    {
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
    },
    { title: "Official Documentation", url: "https://docs.example.com" },
  ],
  interactiveExample: {
    html: `<div style="padding: 1rem; background: #1a1a2e; color: #eaeaea;">
  <h2 style="color: #ff4136;">Interactive Example</h2>
  <p>This is a live preview of the concept!</p>
</div>`,
    css: "",
    description: "A live demonstration of the lesson concept",
  },
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.moduleId as string
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  const [hasAcknowledged, setHasAcknowledged] = useState(false)

  const module = getModuleById(moduleId)

  if (!module) {
    return (
      <div className="min-h-screen bg-souls-darker flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-mono text-2xl text-souls-red mb-4">Module Not Found</h1>
          <PixelButton variant="primary" onClick={() => router.push("/learn")}>
            Back to Codex
          </PixelButton>
        </div>
      </div>
    )
  }

  const completedCount = module.lessons.filter((l) => l.completed).length
  const progress = (completedCount / module.lessons.length) * 100
  const currentLesson = module.lessons.find((l) => l.id === selectedLesson)

  const getTypeIcon = (type: LessonType) => {
    switch (type) {
      case "reading":
        return FileText
      case "interactive":
        return Code
      case "challenge":
        return Play
      case "quiz":
        return HelpCircle
      case "project":
        return Rocket
    }
  }

  const getTypeColor = (type: LessonType) => {
    switch (type) {
      case "reading":
        return "text-blue-400"
      case "interactive":
        return "text-green-400"
      case "challenge":
        return "text-red-400"
      case "quiz":
        return "text-yellow-400"
      case "project":
        return "text-purple-400"
    }
  }

  return (
    <div className="min-h-screen bg-souls-darker relative">
      <ParticleBackground theme="hell" />
      <HUD />

      <div className="pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => router.push("/learn")}
            className="flex items-center gap-2 font-mono text-souls-light/60 hover:text-souls-light transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Codex
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lesson Sidebar */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-souls-dark/80 border-2 border-souls-darker p-4 lg:sticky lg:top-24">
                {/* Module Header */}
                <div className="mb-4">
                  <h2 className="font-mono text-lg sm:text-xl uppercase" style={{ color: module.color }}>
                    {module.title}
                  </h2>
                  <p className="font-mono text-sm text-souls-light/60 mt-1">{module.description}</p>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-souls-light/60">
                      {completedCount} / {module.lessons.length} completed
                    </span>
                    <span className="text-souls-light/40">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-souls-darker">
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: module.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Lessons List */}
                <div className="space-y-1 max-h-[50vh] lg:max-h-[400px] overflow-y-auto">
                  {module.lessons.map((lesson, index) => {
                    const TypeIcon = getTypeIcon(lesson.type)
                    const typeColor = getTypeColor(lesson.type)

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setSelectedLesson(lesson.id)}
                        className={cn(
                          "w-full flex items-center gap-3 p-2 text-left transition-colors",
                          selectedLesson === lesson.id
                            ? "bg-souls-red/20 border-l-2 border-souls-red"
                            : "hover:bg-souls-darker border-l-2 border-transparent",
                        )}
                      >
                        {lesson.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-souls-light/40 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p
                            className={cn(
                              "font-mono text-sm truncate",
                              lesson.completed ? "text-souls-light/60" : "text-souls-light",
                            )}
                          >
                            {index + 1}. {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <TypeIcon className={cn("w-3 h-3", typeColor)} />
                            <span className="font-mono text-xs text-souls-light/40 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {lesson.duration}
                            </span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {selectedLesson ? (
                <div className="space-y-6">
                  {/* Lesson Header */}
                  <div className="bg-souls-dark/80 border-2 border-souls-darker p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-mono text-xs text-souls-light/60 uppercase">
                          Lesson {module.lessons.findIndex((l) => l.id === selectedLesson) + 1}
                        </span>
                        <h1 className="font-mono text-xl sm:text-2xl text-souls-light mt-1">{currentLesson?.title}</h1>
                        <p className="font-mono text-sm text-souls-light/60 mt-1">{currentLesson?.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-souls-light/60">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono text-sm">{currentLesson?.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Documentation Panel */}
                  <EnhancedDocumentationPanel
                    topic={currentLesson?.title || ""}
                    content={sampleDocContent}
                    difficulty={module.difficulty}
                    onAcknowledge={() => setHasAcknowledged(true)}
                  />

                  {/* Navigation */}
                  <div className="flex flex-col sm:flex-row justify-between gap-3">
                    <PixelButton
                      variant="secondary"
                      onClick={() => {
                        const currentIndex = module.lessons.findIndex((l) => l.id === selectedLesson)
                        if (currentIndex > 0) {
                          setSelectedLesson(module.lessons[currentIndex - 1].id)
                          setHasAcknowledged(false)
                        }
                      }}
                      disabled={selectedLesson === module.lessons[0].id}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </PixelButton>

                    <PixelButton
                      variant="primary"
                      onClick={() => {
                        const currentIndex = module.lessons.findIndex((l) => l.id === selectedLesson)
                        if (currentIndex < module.lessons.length - 1) {
                          setSelectedLesson(module.lessons[currentIndex + 1].id)
                          setHasAcknowledged(false)
                        }
                      }}
                      disabled={selectedLesson === module.lessons[module.lessons.length - 1].id}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </PixelButton>
                  </div>
                </div>
              ) : (
                <div className="bg-souls-dark/80 border-2 border-souls-darker p-8 text-center">
                  <BookOpen className="w-16 h-16 text-souls-light/20 mx-auto mb-4" />
                  <h2 className="font-mono text-xl text-souls-light mb-2">Select a Lesson</h2>
                  <p className="font-mono text-souls-light/60">Choose a lesson from the sidebar to begin learning.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
