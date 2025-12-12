"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function Logo({ size = "lg", showText = false }: { size?: "sm" | "md" | "lg"; showText?: boolean }) {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg" },
    md: { icon: "w-12 h-12", text: "text-2xl" },
    lg: { icon: "w-48 h-48", text: "text-4xl" },
  }

  return (
    <motion.div
      className="relative select-none flex items-center gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`${sizes[size].icon} flex items-center justify-center relative`}
        animate={{
          filter: [
            "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
            "drop-shadow(0 0 16px rgba(255, 255, 255, 0.2))",
            "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/code-souls-logo-v1-1.png"
          alt="Code Souls"
          fill
          className="object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </motion.div>

      {showText && (
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={`font-mono ${sizes[size].text} font-bold tracking-wider text-souls-light uppercase`}>
            Code
          </span>
          <span className={`font-mono ${sizes[size].text} font-bold tracking-wider text-souls-red uppercase -mt-2`}>
            Souls
          </span>
        </motion.div>
      )}
    </motion.div>
  )
}
