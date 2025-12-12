"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type DocumentationPanelProps = {
  topic: string
  content: {
    overview: string
    codeExample: string
    keyConcepts: string[]
    proTips: string[]
  }
  onAcknowledge: () => void
}

export function DocumentationPanel({ topic, content, onAcknowledge }: DocumentationPanelProps) {
  const [expanded, setExpanded] = useState(true)
  const [hasRead, setHasRead] = useState(false)

  const handleAcknowledge = () => {
    setHasRead(true)
    setExpanded(false)
    onAcknowledge()
  }

  return (
    <div className="bg-souls-darker border-2 border-souls-dark">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-souls-dark hover:bg-souls-darker transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">DOCS</span>
          <span className="font-mono text-souls-light uppercase">{topic}</span>
          {hasRead && <span className="px-2 py-0.5 bg-green-600 text-xs font-mono text-white">READ</span>}
        </div>
        <motion.svg
          className="w-5 h-5 text-souls-light"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: expanded ? 180 : 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
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
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {/* Read Before Starting Warning */}
              <div className="bg-souls-red/20 border border-souls-red p-3">
                <span className="font-mono text-sm text-souls-red">
                  READ BEFORE STARTING - Understanding these concepts is crucial for the challenges ahead.
                </span>
              </div>

              {/* Overview */}
              <div>
                <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Topic Overview</h3>
                <p className="font-mono text-sm text-souls-light leading-relaxed">{content.overview}</p>
              </div>

              {/* Code Example */}
              <div>
                <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Code Example</h3>
                <pre className="bg-souls-dark p-3 overflow-x-auto">
                  <code className="font-mono text-sm text-green-400">{content.codeExample}</code>
                </pre>
              </div>

              {/* Key Concepts */}
              <div>
                <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Key Concepts</h3>
                <ul className="space-y-1">
                  {content.keyConcepts.map((concept, i) => (
                    <li key={i} className="font-mono text-sm text-souls-light flex items-start gap-2">
                      <span className="text-souls-red">{">"}</span>
                      {concept}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Tips */}
              <div>
                <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Pro Tips</h3>
                <ul className="space-y-1">
                  {content.proTips.map((tip, i) => (
                    <li key={i} className="font-mono text-sm text-yellow-400 flex items-start gap-2">
                      <span>TIP:</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Acknowledge Button */}
              {!hasRead && (
                <button
                  onClick={handleAcknowledge}
                  className="w-full py-3 bg-souls-red border-2 border-souls-red-dark font-mono text-sm uppercase text-souls-light hover:bg-souls-red-light transition-colors"
                >
                  I&apos;ve Read This - Start Challenge
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
