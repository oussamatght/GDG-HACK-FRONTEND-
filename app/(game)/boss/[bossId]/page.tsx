"use client"

import { useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { getBossById, BOSSES } from "@/lib/boss-data"
import { WORLDS } from "@/lib/game-state"
import { BossHealthBar } from "@/components/boss-health-bar"
import { BossIntroSequence } from "@/components/boss-intro-sequence"
import { BossVictorySequence } from "@/components/boss-victory-sequence"
import { CodeEditor } from "@/components/code-editor"
import { PreviewPanel } from "@/components/preview-panel"
import { ChallengeTimer } from "@/components/challenge-timer"
import { PixelButton } from "@/components/pixel-button"
import { ParticleBackground } from "@/components/particle-background"

export default function BossPage() {
  const params = useParams()
  const router = useRouter()
  const { player, setPlayer } = useGame()

  const bossId = params.bossId as string
  const boss = getBossById(bossId) || BOSSES[0]
  const world = WORLDS.find((w) => w.id === boss.worldId) || WORLDS[0]

  const [phase, setPhase] = useState<"intro" | "battle" | "victory" | "defeat">("intro")
  const [bossHp, setBossHp] = useState(boss.hp)
  const [htmlCode, setHtmlCode] = useState("")
  const [cssCode, setCssCode] = useState("")
  const [checkpoints, setCheckpoints] = useState<boolean[]>(boss.challenge.requirements.map(() => false))

  const handleIntroComplete = () => {
    setPhase("battle")
  }

  const handleTimeUp = useCallback(() => {
    setPhase("defeat")
  }, [])

  const checkRequirements = () => {
    // Simulate checking requirements - in production this would be more sophisticated
    const fullCode = htmlCode + cssCode
    const newCheckpoints = boss.challenge.requirements.map((req, index) => {
      // Simple keyword checks for demo
      if (req.toLowerCase().includes("header") && fullCode.includes("<header")) return true
      if (req.toLowerCase().includes("nav") && fullCode.includes("<nav")) return true
      if (req.toLowerCase().includes("section") && fullCode.includes("<section")) return true
      if (req.toLowerCase().includes("form") && fullCode.includes("<form")) return true
      if (req.toLowerCase().includes("responsive") && fullCode.includes("@media")) return true
      if (req.toLowerCase().includes("semantic") && (fullCode.includes("<main") || fullCode.includes("<article")))
        return true
      // Random completion for demo purposes
      return Math.random() > 0.5
    })

    setCheckpoints(newCheckpoints)

    // Calculate damage based on completed requirements
    const completedCount = newCheckpoints.filter(Boolean).length
    const damagePerReq = Math.floor(boss.hp / boss.challenge.requirements.length)
    const totalDamage = completedCount * damagePerReq

    const newHp = Math.max(0, boss.hp - totalDamage)
    setBossHp(newHp)

    if (newHp <= 0) {
      // Victory!
      const goldEarned = Math.floor(
        Math.random() * (boss.rewards.gold.max - boss.rewards.gold.min) + boss.rewards.gold.min,
      )
      const diamondsEarned = Math.floor(
        Math.random() * (boss.rewards.diamonds.max - boss.rewards.diamonds.min) + boss.rewards.diamonds.min,
      )

      setPlayer({
        ...player,
        gold: player.gold + goldEarned,
        diamonds: player.diamonds + diamondsEarned,
        iq: player.iq + boss.rewards.iq,
      })

      setPhase("victory")
    }
  }

  const handleVictoryContinue = () => {
    router.push(`/world/${boss.worldId}`)
  }

  const handleDefeatRetry = () => {
    setBossHp(boss.hp)
    setCheckpoints(boss.challenge.requirements.map(() => false))
    setHtmlCode("")
    setCssCode("")
    setPhase("intro")
  }

  // Calculate earned rewards for victory screen
  const goldEarned = Math.floor(Math.random() * (boss.rewards.gold.max - boss.rewards.gold.min) + boss.rewards.gold.min)
  const diamondsEarned = Math.floor(
    Math.random() * (boss.rewards.diamonds.max - boss.rewards.diamonds.min) + boss.rewards.diamonds.min,
  )

  if (phase === "intro") {
    return <BossIntroSequence boss={boss} worldTheme={world.theme} onComplete={handleIntroComplete} />
  }

  if (phase === "victory") {
    return (
      <BossVictorySequence
        boss={boss}
        goldEarned={goldEarned}
        diamondsEarned={diamondsEarned}
        onContinue={handleVictoryContinue}
      />
    )
  }

  if (phase === "defeat") {
    return (
      <div className="min-h-screen bg-souls-darker flex items-center justify-center">
        <motion.div
          className="text-center max-w-md p-8 bg-souls-dark border-4 border-red-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <h2 className="font-mono text-3xl text-red-400 uppercase mb-4">Defeated</h2>
          <p className="font-mono text-souls-light mb-6">
            The {boss.name} proved too powerful this time. Train harder and return!
          </p>
          <div className="flex gap-4 justify-center">
            <PixelButton variant="secondary" onClick={() => router.push(`/world/${boss.worldId}`)}>
              Return to Map
            </PixelButton>
            <PixelButton variant="primary" onClick={handleDefeatRetry}>
              Retry
            </PixelButton>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-souls-darker relative">
      <ParticleBackground theme={world.theme} />

      {/* Boss Battle Header */}
      <div
        className="fixed top-0 left-0 right-0 z-40 bg-souls-darker/95 border-b-4 p-4"
        style={{ borderColor: world.colorPalette.dark }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            {/* Boss Health */}
            <div className="flex-1">
              <BossHealthBar boss={boss} currentHp={bossHp} />
            </div>

            {/* Timer */}
            <ChallengeTimer initialSeconds={boss.timeLimit} onTimeUp={handleTimeUp} />
          </div>
        </div>
      </div>

      {/* Main Battle Area */}
      <div className="pt-32 pb-8 px-4 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Challenge Info */}
          <motion.div
            className="bg-souls-dark border-2 border-souls-darker p-4 mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3 className="font-mono text-lg text-souls-red uppercase mb-2">{boss.challenge.title}</h3>
            <p className="font-mono text-sm text-souls-light/80">{boss.challenge.description}</p>
          </motion.div>

          {/* Requirements Checklist */}
          <motion.div
            className="bg-souls-dark border-2 border-souls-darker p-4 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-mono text-xs text-souls-light/60 uppercase mb-3">Requirements Progress</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {boss.challenge.requirements.map((req, index) => (
                <div
                  key={index}
                  className={`p-2 border text-sm font-mono ${
                    checkpoints[index]
                      ? "border-green-500 bg-green-900/20 text-green-400"
                      : "border-souls-darker text-souls-light/60"
                  }`}
                >
                  <span className="mr-2">{checkpoints[index] ? "[X]" : "[ ]"}</span>
                  {req}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Editor Layout */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Left - Editors */}
            <div className="flex flex-col gap-4">
              <CodeEditor language="html" initialCode={htmlCode} onChange={setHtmlCode} className="min-h-[250px]" />
              <CodeEditor language="css" initialCode={cssCode} onChange={setCssCode} className="min-h-[250px]" />
            </div>

            {/* Right - Preview & Actions */}
            <div className="flex flex-col gap-4">
              <PreviewPanel html={htmlCode} css={cssCode} className="flex-1 min-h-[400px]" />

              {/* Attack Button */}
              <PixelButton variant="primary" size="lg" onClick={checkRequirements} className="w-full">
                Submit Code - Attack Boss!
              </PixelButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
