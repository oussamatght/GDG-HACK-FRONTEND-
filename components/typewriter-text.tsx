"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type TypewriterTextProps = {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TypewriterText({ text, speed = 30, onComplete, className }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const char = text[currentIndex]
      const delay = [",", ".", "!", "?"].includes(char) ? speed * 5 : speed

      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + char)
        setCurrentIndex((prev) => prev + 1)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <motion.span className={className} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}>
          _
        </motion.span>
      )}
    </motion.span>
  )
}
