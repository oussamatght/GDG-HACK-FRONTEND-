"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

type PixelInputProps = {
  type?: "text" | "email" | "password"
  placeholder?: string
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  className?: string
}

export function PixelInput({ type = "text", placeholder, value, onChange, label, error, className }: PixelInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <label className="font-mono text-xs uppercase tracking-wider text-souls-light/80">{label}</label>}
      <div
        className={cn(
          "relative border-4 transition-all duration-200",
          focused ? "border-souls-red" : "border-souls-dark",
          error && "border-red-500",
        )}
        style={{
          boxShadow: focused ? "0 0 20px rgba(255, 65, 54, 0.3)" : "none",
        }}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-souls-darker px-4 py-3 font-mono text-souls-light placeholder:text-souls-light/40 focus:outline-none"
        />
      </div>
      {error && <span className="font-mono text-xs text-red-400">{error}</span>}
    </div>
  )
}
