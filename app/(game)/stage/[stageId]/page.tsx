"use client"

import { useState, useCallback } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useGame } from "@/lib/game-context"
import { WORLDS } from "@/lib/game-state"
import { CodeEditor } from "@/components/code-editor"
import { PreviewPanel } from "@/components/preview-panel"
import { ChallengeTimer } from "@/components/challenge-timer"
import { EnhancedDocumentationPanel } from "@/components/enhanced-documentation-panel"
import { ChallengeResultModal } from "@/components/challenge-result-modal"
import { PixelButton } from "@/components/pixel-button"
import { World3DBackground } from "@/components/world-3d-background"
import { ChevronLeft, Lightbulb } from "lucide-react"

// Sample challenge data with enhanced documentation
const SAMPLE_CHALLENGE = {
  id: 1,
  title: "Create a Navigation Bar",
  instructions: `Create a simple navigation bar with:
• A logo text on the left
• Three navigation links (Home, About, Contact)
• Use semantic HTML elements`,
  initialHtml: `<!-- Create your navigation bar here -->
<nav>

</nav>`,
  initialCss: `/* Style your navigation */
nav {

}`,
  documentation: {
    overview:
      "Navigation bars are essential UI components that help users navigate through a website. They typically contain a logo, navigation links, and sometimes additional elements like search bars or user menus.",
    codeExample: `<nav>
  <div class="logo">MySite</div>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>

/* CSS */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #1a1a2e;
}

.nav-links {
  display: flex;
  gap: 1rem;
  list-style: none;
}

.nav-links a {
  color: #eaeaea;
  text-decoration: none;
}`,
    keyConcepts: [
      "The <nav> element represents a section of navigation links",
      "Use <ul> and <li> for navigation link lists for better semantics",
      "The <a> element creates hyperlinks to other pages",
      "CSS Flexbox is commonly used to layout navigation elements",
      "justify-content: space-between distributes items evenly",
    ],
    proTips: [
      "Always use semantic HTML elements for better accessibility",
      "Keep navigation simple and consistent across pages",
      "Consider mobile responsiveness from the start",
      "Use hover states to improve user experience",
    ],
    relatedTopics: ["Semantic HTML", "CSS Flexbox", "Accessibility", "Responsive Design"],
    externalLinks: [
      { title: "MDN - Navigation Element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav" },
      { title: "CSS Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
    ],
    interactiveExample: {
      html: `<nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: #1a1a2e;">
  <div style="font-weight: bold; color: #ff4136; font-size: 1.2rem;">MySite</div>
  <ul style="display: flex; gap: 1.5rem; list-style: none; margin: 0; padding: 0;">
    <li><a href="#" style="color: #eaeaea; text-decoration: none;">Home</a></li>
    <li><a href="#" style="color: #eaeaea; text-decoration: none;">About</a></li>
    <li><a href="#" style="color: #eaeaea; text-decoration: none;">Contact</a></li>
  </ul>
</nav>`,
      css: "",
      description: "A fully styled navigation bar using flexbox - this is what you're trying to build!",
    },
  },
}

export default function StagePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { player, setPlayer } = useGame()

  const stageId = Number(params.stageId)
  const worldId = Number(searchParams.get("world")) || 1
  const world = WORLDS.find((w) => w.id === worldId) || WORLDS[0]

  const [currentChallenge, setCurrentChallenge] = useState(1)
  const [htmlCode, setHtmlCode] = useState(SAMPLE_CHALLENGE.initialHtml)
  const [cssCode, setCssCode] = useState(SAMPLE_CHALLENGE.initialCss)
  const [hasReadDocs, setHasReadDocs] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [challengeResult, setChallengeResult] = useState({
    success: false,
    stars: 0,
    goldEarned: 0,
    diamondsEarned: 0,
    timeRemaining: 0,
  })
  const [timeRemaining, setTimeRemaining] = useState(480)
  const [hintsRemaining, setHintsRemaining] = useState(3)

  const handleTimeUp = useCallback(() => {
    setTimeRemaining(0)
  }, [])

  const handleSubmit = () => {
    const hasNav = htmlCode.includes("<nav") && htmlCode.includes("</nav>")
    const hasLinks = htmlCode.includes("<a") || htmlCode.includes("<li")

    const success = hasNav && hasLinks
    const stars = success ? (timeRemaining > 240 ? 3 : timeRemaining > 120 ? 2 : 1) : 0
    const goldEarned = success ? 5 + stars * 2 : 0
    const diamondsEarned = success && timeRemaining > 0 ? 1 : 0

    setChallengeResult({
      success,
      stars,
      goldEarned,
      diamondsEarned,
      timeRemaining,
    })
    setShowResult(true)

    if (success) {
      setPlayer({
        ...player,
        gold: player.gold + goldEarned,
        diamonds: player.diamonds + diamondsEarned,
      })
    }
  }

  const handleContinue = () => {
    if (challengeResult.success) {
      if (currentChallenge < 3) {
        setCurrentChallenge((prev) => prev + 1)
        setShowResult(false)
        setHtmlCode(SAMPLE_CHALLENGE.initialHtml)
        setCssCode(SAMPLE_CHALLENGE.initialCss)
        setHasReadDocs(false)
        setTimeRemaining(480)
      } else {
        router.push(`/world/${worldId}`)
      }
    } else {
      router.push(`/world/${worldId}`)
    }
  }

  const handleRetry = () => {
    setShowResult(false)
    setHtmlCode(SAMPLE_CHALLENGE.initialHtml)
    setCssCode(SAMPLE_CHALLENGE.initialCss)
    setTimeRemaining(480)
  }

  const handleHint = () => {
    if (hintsRemaining > 0) {
      setHintsRemaining((prev) => prev - 1)
      alert("Hint: Make sure to include the <nav> element as the container and use <ul>/<li> for your links!")
    }
  }

  return (
    <div className="min-h-screen bg-souls-darker relative">
      <World3DBackground
        theme={world.theme as "hell" | "ocean" | "desert" | "nature"}
        className="absolute inset-0 z-0 opacity-30"
      />

      {/* Stage Header */}
      <div
        className="fixed top-0 left-0 right-0 z-40 bg-souls-darker/95 backdrop-blur-sm border-b-4 border-souls-dark"
        style={{ borderColor: world.colorPalette.dark }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/world/${worldId}`)}
              className="font-mono text-souls-light/60 hover:text-souls-light transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <div>
              <span className="font-mono text-xs text-souls-light/60 uppercase">Stage {stageId}</span>
              <h1 className="font-mono text-lg text-souls-light">{SAMPLE_CHALLENGE.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Challenge Progress */}
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-8 h-8 flex items-center justify-center font-mono text-sm border-2 ${
                    num === currentChallenge
                      ? "border-souls-red text-souls-light bg-souls-red/20"
                      : num < currentChallenge
                        ? "border-green-500 text-green-400 bg-green-500/20"
                        : "border-souls-dark text-souls-light/30"
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Timer */}
            <ChallengeTimer initialSeconds={480} onTimeUp={handleTimeUp} isPaused={showResult} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-8 px-4 min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div className="mb-4" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <EnhancedDocumentationPanel
              topic="HTML Navigation"
              content={SAMPLE_CHALLENGE.documentation}
              difficulty="beginner"
              onAcknowledge={() => setHasReadDocs(true)}
            />
          </motion.div>

          {/* Editor Layout */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Left Column - Instructions & Editors */}
            <div className="flex flex-col gap-4">
              {/* Instructions */}
              <div className="bg-souls-dark/80 backdrop-blur-sm border-2 border-souls-darker p-4">
                <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Instructions</h3>
                <p className="font-mono text-sm text-souls-light whitespace-pre-line">
                  {SAMPLE_CHALLENGE.instructions}
                </p>
              </div>

              {/* Code Editors */}
              <div className="flex-1 grid grid-rows-2 gap-4 min-h-[400px]">
                <CodeEditor language="html" initialCode={htmlCode} onChange={setHtmlCode} />
                <CodeEditor language="css" initialCode={cssCode} onChange={setCssCode} />
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="flex flex-col gap-4">
              {/* Preview */}
              <div className="flex-1 min-h-[300px]">
                <PreviewPanel html={htmlCode} css={cssCode} className="h-full" />
              </div>

              {/* Expected Output */}
              <div className="bg-souls-dark/80 backdrop-blur-sm border-2 border-souls-darker p-4">
                <h3 className="font-mono text-sm text-souls-light/60 uppercase mb-2">Expected Output</h3>
                <div className="bg-white p-4 text-black font-sans text-sm">
                  <nav className="flex items-center justify-between">
                    <div className="font-bold">Logo</div>
                    <ul className="flex gap-4 list-none">
                      <li>Home</li>
                      <li>About</li>
                      <li>Contact</li>
                    </ul>
                  </nav>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <PixelButton variant="secondary" size="md" onClick={handleHint} disabled={hintsRemaining === 0}>
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Hint ({hintsRemaining})
                </PixelButton>
                <PixelButton
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!hasReadDocs}
                  className="flex-1"
                >
                  Submit
                </PixelButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Result Modal */}
      <ChallengeResultModal
        isOpen={showResult}
        success={challengeResult.success}
        stars={challengeResult.stars}
        goldEarned={challengeResult.goldEarned}
        diamondsEarned={challengeResult.diamondsEarned}
        timeRemaining={challengeResult.timeRemaining}
        onContinue={handleContinue}
        onRetry={handleRetry}
      />
    </div>
  )
}
