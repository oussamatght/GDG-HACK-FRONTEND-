"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type PixelButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger" | "gold"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  className?: string
  type?: "button" | "submit"
}

export function PixelButton({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  type = "button",
}: PixelButtonProps) {
  const baseStyles = "relative font-mono uppercase tracking-wider border-4 transition-colors select-none"

  const variants = {
    primary: "bg-souls-red border-souls-red-dark text-souls-light hover:bg-souls-red-light",
    secondary: "bg-souls-dark border-souls-darker text-souls-light hover:bg-souls-darker",
    danger: "bg-red-600 border-red-800 text-white hover:bg-red-500",
    gold: "bg-souls-gold border-souls-gold-dark text-souls-darker hover:bg-souls-gold-light",
  }

  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-6 py-2 text-sm",
    lg: "px-8 py-3 text-base",
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], disabled && "opacity-50 cursor-not-allowed", className)}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      style={{
        imageRendering: "pixelated",
        boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </motion.button>
  )
}
