"use client"

import { motion, AnimatePresence } from "framer-motion"
import { PixelButton } from "./pixel-button"

type ChallengeResultModalProps = {
  isOpen: boolean
  success: boolean
  stars: number
  goldEarned: number
  diamondsEarned: number
  timeRemaining: number
  onContinue: () => void
  onRetry: () => void
}

export function ChallengeResultModal({
  isOpen,
  success,
  stars,
  goldEarned,
  diamondsEarned,
  timeRemaining,
  onContinue,
  onRetry,
}: ChallengeResultModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-souls-darker border-4 border-souls-dark overflow-hidden"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div
              className={`p-6 text-center ${success ? "bg-gradient-to-b from-green-900/50 to-transparent" : "bg-gradient-to-b from-red-900/50 to-transparent"}`}
            >
              <motion.h2
                className={`font-mono text-3xl uppercase tracking-wider ${success ? "text-green-400" : "text-red-400"}`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {success ? "Victory!" : "Defeated"}
              </motion.h2>
              <motion.p
                className="font-mono text-sm text-souls-light/60 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {success ? "Challenge completed successfully!" : "Don't give up, warrior!"}
              </motion.p>
            </div>

            {/* Stars */}
            {success && (
              <motion.div
                className="flex justify-center gap-4 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {[1, 2, 3].map((star, index) => (
                  <motion.div
                    key={star}
                    className={`w-12 h-12 flex items-center justify-center ${star <= stars ? "text-yellow-400" : "text-souls-dark"}`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + index * 0.2, type: "spring" }}
                  >
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Rewards */}
            {success && (
              <motion.div
                className="px-6 pb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="font-mono text-xs text-souls-light/60 uppercase mb-3 text-center">Rewards</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-souls-dark p-3 text-center">
                    <div className="w-8 h-8 mx-auto rounded-full bg-yellow-500 flex items-center justify-center text-sm font-bold text-yellow-900">
                      G
                    </div>
                    <motion.span
                      className="font-mono text-lg text-souls-gold block mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      +{goldEarned}
                    </motion.span>
                  </div>
                  {diamondsEarned > 0 && (
                    <div className="bg-souls-dark p-3 text-center">
                      <div className="w-8 h-8 mx-auto bg-cyan-400 rotate-45 flex items-center justify-center">
                        <span className="-rotate-45 text-sm font-bold text-cyan-900">D</span>
                      </div>
                      <motion.span
                        className="font-mono text-lg text-cyan-400 block mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                      >
                        +{diamondsEarned}
                      </motion.span>
                    </div>
                  )}
                  <div className="bg-souls-dark p-3 text-center">
                    <div className="w-8 h-8 mx-auto bg-souls-red flex items-center justify-center text-sm">?</div>
                    <span className="font-mono text-xs text-souls-light/60 block mt-1">No Drop</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Time Remaining */}
            {success && timeRemaining > 0 && (
              <motion.div
                className="px-6 pb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="font-mono text-xs text-souls-light/60">
                  Time Remaining: {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, "0")}
                </span>
              </motion.div>
            )}

            {/* Actions */}
            <div className="p-4 border-t-2 border-souls-dark flex gap-3">
              {!success && (
                <PixelButton variant="secondary" size="md" onClick={onRetry} className="flex-1">
                  Retry
                </PixelButton>
              )}
              <PixelButton variant="primary" size="md" onClick={onContinue} className="flex-1">
                {success ? "Continue" : "Back to Map"}
              </PixelButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
