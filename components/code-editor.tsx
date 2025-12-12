"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type CodeEditorProps = {
  language: "html" | "css" | "javascript"
  initialCode?: string
  onChange: (code: string) => void
  readOnly?: boolean
  className?: string
}

export function CodeEditor({ language, initialCode = "", onChange, readOnly = false, className }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [lineNumbers, setLineNumbers] = useState<number[]>([1])

  useEffect(() => {
    const lines = code.split("\n").length
    setLineNumbers(Array.from({ length: Math.max(lines, 10) }, (_, i) => i + 1))
  }, [code])

  const handleChange = (value: string) => {
    setCode(value)
    onChange(value)
  }

  const getLanguageColor = () => {
    switch (language) {
      case "html":
        return "#FF6B35"
      case "css":
        return "#264DE4"
      case "javascript":
        return "#F7DF1E"
      default:
        return "#888"
    }
  }

  return (
    <div className={cn("flex flex-col h-full bg-souls-darker border-2 border-souls-dark", className)}>
      {/* Editor Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-souls-dark border-b-2 border-souls-darker">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getLanguageColor() }} />
          <span className="font-mono text-xs uppercase text-souls-light/70">{language}</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Line Numbers */}
        <div className="flex flex-col bg-souls-dark/50 px-2 py-2 text-right select-none border-r border-souls-darker">
          {lineNumbers.map((num) => (
            <span key={num} className="font-mono text-xs text-souls-light/30 leading-5">
              {num}
            </span>
          ))}
        </div>

        {/* Code Area */}
        <textarea
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          readOnly={readOnly}
          className={cn(
            "flex-1 bg-transparent px-3 py-2 font-mono text-sm text-souls-light resize-none focus:outline-none leading-5",
            readOnly && "cursor-not-allowed opacity-70",
          )}
          spellCheck={false}
          style={{
            tabSize: 2,
          }}
        />
      </div>
    </div>
  )
}
