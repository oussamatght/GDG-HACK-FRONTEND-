"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type PreviewPanelProps = {
  html: string
  css: string
  className?: string
}

export function PreviewPanel({ html, css, className }: PreviewPanelProps) {
  const [srcDoc, setSrcDoc] = useState("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: sans-serif; padding: 16px; }
              ${css}
            </style>
          </head>
          <body>
            ${html}
          </body>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css])

  return (
    <div className={cn("flex flex-col h-full bg-white border-2 border-souls-dark", className)}>
      {/* Preview Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-souls-dark border-b-2 border-souls-darker">
        <span className="font-mono text-xs uppercase text-souls-light/70">Live Preview</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[10px] text-souls-light/50">Auto-refresh</span>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto">
        <iframe title="preview" srcDoc={srcDoc} className="w-full h-full border-0" sandbox="allow-scripts" />
      </div>
    </div>
  )
}
