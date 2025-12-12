"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Code,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Play,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import { PixelButton } from "./pixel-button"

export interface DocumentationContent {
  overview: string
  codeExample: string
  keyConcepts: string[]
  proTips: string[]
  relatedTopics?: string[]
  externalLinks?: { title: string; url: string }[]
  interactiveExample?: {
    html: string
    css: string
    description: string
  }
}

type EnhancedDocumentationPanelProps = {
  topic: string
  content: DocumentationContent
  onAcknowledge: () => void
  difficulty?: "beginner" | "intermediate" | "advanced"
}

export function EnhancedDocumentationPanel({
  topic,
  content,
  onAcknowledge,
  difficulty = "beginner",
}: EnhancedDocumentationPanelProps) {
  const [expanded, setExpanded] = useState(true)
  const [hasRead, setHasRead] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "code" | "tips">("overview")
  const [copied, setCopied] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [showInteractive, setShowInteractive] = useState(false)

  const handleAcknowledge = () => {
    setHasRead(true)
    setExpanded(false)
    onAcknowledge()
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content.codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  }

  return (
    <div className="bg-souls-darker border-2 border-souls-dark overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-souls-dark hover:bg-souls-darker transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-souls-red" />
          <span className="font-mono text-souls-light uppercase">{topic}</span>

          {/* Difficulty Badge */}
          <span className={cn("px-2 py-0.5 text-xs font-mono border", difficultyColors[difficulty])}>
            {difficulty.toUpperCase()}
          </span>

          {hasRead && (
            <span className="px-2 py-0.5 bg-green-600 text-xs font-mono text-white flex items-center gap-1">
              <Check className="w-3 h-3" /> READ
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setBookmarked(!bookmarked)
            }}
            className="p-1 hover:bg-souls-darker rounded transition-colors"
          >
            {bookmarked ? (
              <BookmarkCheck className="w-4 h-4 text-souls-gold" />
            ) : (
              <Bookmark className="w-4 h-4 text-souls-light/60" />
            )}
          </button>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
            <ChevronDown className="w-5 h-5 text-souls-light" />
          </motion.div>
        </div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {/* Read Before Warning */}
            <div className="mx-4 mt-4 bg-souls-red/20 border border-souls-red p-3">
              <span className="font-mono text-sm text-souls-red flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                READ BEFORE STARTING - Understanding these concepts is crucial for the challenges ahead.
              </span>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-souls-dark mx-4 mt-4">
              {[
                { id: "overview", label: "Overview", icon: BookOpen },
                { id: "code", label: "Code Example", icon: Code },
                { id: "tips", label: "Pro Tips", icon: Lightbulb },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 font-mono text-sm transition-colors border-b-2 -mb-px",
                    activeTab === tab.id
                      ? "border-souls-red text-souls-red"
                      : "border-transparent text-souls-light/60 hover:text-souls-light",
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-4 max-h-[500px] overflow-y-auto">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div>
                    <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Topic Overview</h3>
                    <p className="font-mono text-sm text-souls-light leading-relaxed">{content.overview}</p>
                  </div>

                  {/* Key Concepts */}
                  <div>
                    <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Key Concepts</h3>
                    <ul className="space-y-2">
                      {content.keyConcepts.map((concept, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="font-mono text-sm text-souls-light flex items-start gap-2 bg-souls-dark/50 p-2 border-l-2 border-souls-red"
                        >
                          <ChevronRight className="w-4 h-4 text-souls-red flex-shrink-0 mt-0.5" />
                          {concept}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Topics */}
                  {content.relatedTopics && content.relatedTopics.length > 0 && (
                    <div>
                      <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Related Topics</h3>
                      <div className="flex flex-wrap gap-2">
                        {content.relatedTopics.map((topic, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-souls-dark border border-souls-darker text-xs font-mono text-souls-light/80 hover:border-souls-red transition-colors cursor-pointer"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Code Tab */}
              {activeTab === "code" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-mono text-sm text-souls-light/60 uppercase">Code Example</h3>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-mono text-souls-light/60 hover:text-souls-light transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-green-400" />
                            <span className="text-green-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="bg-souls-dark p-4 overflow-x-auto border border-souls-darker">
                      <code className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                        {content.codeExample}
                      </code>
                    </pre>
                  </div>

                  {/* Interactive Example */}
                  {content.interactiveExample && (
                    <div>
                      <button
                        onClick={() => setShowInteractive(!showInteractive)}
                        className="flex items-center gap-2 font-mono text-sm text-souls-gold hover:text-souls-gold-light transition-colors"
                      >
                        <Play className="w-4 h-4" />
                        {showInteractive ? "Hide" : "Try"} Interactive Example
                      </button>

                      <AnimatePresence>
                        {showInteractive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 border border-souls-dark overflow-hidden"
                          >
                            <div className="bg-white p-4">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: `<style>${content.interactiveExample.css}</style>${content.interactiveExample.html}`,
                                }}
                              />
                            </div>
                            <div className="bg-souls-dark p-2 text-xs font-mono text-souls-light/60">
                              {content.interactiveExample.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tips Tab */}
              {activeTab === "tips" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div>
                    <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Pro Tips</h3>
                    <ul className="space-y-2">
                      {content.proTips.map((tip, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="font-mono text-sm text-souls-gold flex items-start gap-2 bg-souls-gold/10 p-3 border border-souls-gold/20"
                        >
                          <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {tip}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* External Links */}
                  {content.externalLinks && content.externalLinks.length > 0 && (
                    <div>
                      <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Learn More</h3>
                      <div className="space-y-1">
                        {content.externalLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-mono text-sm text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Acknowledge Button */}
              {!hasRead && (
                <div className="pt-4 border-t border-souls-dark">
                  <PixelButton variant="primary" size="lg" onClick={handleAcknowledge} className="w-full">
                    I&apos;ve Read This - Start Challenge
                  </PixelButton>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
