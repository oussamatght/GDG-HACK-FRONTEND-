"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}

export function ParticleBackground({ theme = "hell" }: { theme?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const colors: Record<string, string[]> = {
    hell: ["#FF4136", "#FF851B", "#FFDC00"],
    ocean: ["#0074D9", "#7FDBFF", "#39CCCC"],
    desert: ["#FFDC00", "#FF851B", "#F4D03F"],
    nature: ["#2ECC40", "#01FF70", "#3D9970"],
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const particles: Particle[] = []
    const particleCount = 50
    const themeColors = colors[theme] || colors.hell

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1 - 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.2,
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size)
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ imageRendering: "pixelated" }}
    />
  )
}
