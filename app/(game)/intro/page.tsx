"use client"
import { useState, useEffect, useCallback } from "react"
import type React from "react"

import { useRouter } from "next/navigation"
import { TypewriterText } from "@/components/typewriter-text"
import { PixelButton } from "@/components/pixel-button"
import { cn } from "@/lib/utils"
import { ChevronRight, Wifi, Globe, Server, Lock, Shield } from "lucide-react"

interface StoryStep {
  id: number
  text: string
  icon?: React.ReactNode
  topic?: string
}

const storySteps: StoryStep[] = [
  {
    id: 1,
    text: "The year is 2099. The Internet has become the backbone of human civilization...",
  },
  {
    id: 2,
    text: "But a digital plague has spread across the network. Malicious code infects every corner of cyberspace.",
    icon: <Shield className="w-12 h-12 text-souls-red animate-pulse" />,
  },
  {
    id: 3,
    text: "You are a Code Soul - a digital warrior chosen to restore the Internet to its former glory.",
  },
  {
    id: 4,
    text: "But first, you must understand the world you're about to save...",
    topic: "What is the Internet?",
    icon: <Globe className="w-12 h-12 text-souls-red" />,
  },
  {
    id: 5,
    text: "The Internet is a vast network connecting billions of devices worldwide. It's not a cloud - it's physical infrastructure spanning the globe.",
    topic: "The Physical Internet",
    icon: <Wifi className="w-12 h-12 text-blue-400" />,
  },
  {
    id: 6,
    text: "Fiber optic cables, copper wires, and wireless signals carry your data across continents and oceans at the speed of light.",
    topic: "Cables & Connections",
  },
  {
    id: 7,
    text: "Every device has an IP address - a unique identifier. DNS servers translate human-readable names into these addresses.",
    topic: "IP & DNS",
    icon: <Server className="w-12 h-12 text-green-400" />,
  },
  {
    id: 8,
    text: "Your data travels in packets - small chunks that find their way through the network and reassemble at the destination.",
    topic: "Packets & Routing",
  },
  {
    id: 9,
    text: "HTTP is the language browsers and servers speak. HTML structures the content you see on every webpage.",
    topic: "HTTP & HTML",
  },
  {
    id: 10,
    text: "Encryption protects your secrets. SSL/TLS creates secure tunnels for your data, keeping the viruses at bay.",
    topic: "Encryption & Security",
    icon: <Lock className="w-12 h-12 text-souls-gold" />,
  },
  {
    id: 11,
    text: "Now you understand the battlefield. The Internet awaits its hero. Are you ready to become a Code Soul?",
  },
]

interface IntroScreenProps {
  onComplete: () => void
}

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [textComplete, setTextComplete] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleContinue = useCallback(() => {
    if (currentStep < storySteps.length - 1) {
      setTextComplete(false)
      setCurrentStep((prev: number) => prev + 1)
    } else {
      setFadeOut(true)
      setTimeout(onComplete, 500)
    }
  }, [currentStep, onComplete])

  const handleSkip = () => {
    setFadeOut(true)
    setTimeout(onComplete, 500)
  }

  const step = storySteps[currentStep]

  return (
    <div
      className={cn(
        "fixed inset-0 bg-souls-darker z-50 flex items-center justify-center transition-opacity duration-500",
        fadeOut && "opacity-0",
      )}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-souls-red/5 via-transparent to-transparent" />
        {/* Digital rain effect */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-souls-red/20 font-mono text-xs animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-4 right-4 text-souls-light/60 hover:text-souls-light text-sm font-mono transition-colors"
      >
        SKIP {"->"}
      </button>

      {/* Progress indicator */}
      <div className="absolute top-4 left-4 flex gap-1">
        {storySteps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 transition-colors duration-300",
              i <= currentStep ? "bg-souls-red" : "bg-souls-dark",
            )}
          />
        ))}
      </div>

      {/* Main content */}
      <div
        className={cn(
          "relative max-w-2xl mx-auto px-8 text-center transition-opacity duration-500",
          showContent ? "opacity-100" : "opacity-0",
        )}
      >
        {/* Topic badge */}
        {step.topic && (
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-souls-red/20 border border-souls-red/30 font-mono text-xs text-souls-red">
              {step.topic}
            </span>
          </div>
        )}

        {/* Icon */}
        {step.icon && <div className="mb-8 flex justify-center">{step.icon}</div>}

        {/* Typewriter text */}
        <div className="min-h-[100px] flex items-center justify-center">
          <TypewriterText
            key={step.id}
            text={step.text}
            speed={25}
            className="text-xl md:text-2xl text-souls-light leading-relaxed font-mono"
            onComplete={() => setTextComplete(true)}
          />
        </div>

        {/* Continue button - replaced Button with PixelButton */}
        <div className={cn("mt-12 transition-opacity duration-300", textComplete ? "opacity-100" : "opacity-0")}>
          <PixelButton variant="primary" size="lg" onClick={handleContinue} className="group">
            {currentStep < storySteps.length - 1 ? (
              <>
                CONTINUE
                <ChevronRight className="ml-2 inline group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              "BEGIN YOUR JOURNEY"
            )}
          </PixelButton>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-souls-red/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-souls-red/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-souls-red/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-souls-red/30" />
    </div>
  )
}

export default function Page() {
  const router = useRouter()

  return <IntroScreen onComplete={() => router.push("/level-select")} />
}
