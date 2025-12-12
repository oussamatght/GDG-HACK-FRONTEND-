"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ParticleBackground } from "@/components/particle-background"
import { PixelButton } from "@/components/pixel-button"
import { Logo } from "@/components/logo"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-souls-darker flex flex-col items-center justify-center relative overflow-hidden">
      <ParticleBackground theme="hell" />

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <Logo size="lg" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-mono text-souls-light/70 text-lg mt-4 mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Master Frontend Development Through Epic Adventure
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <PixelButton variant="primary" size="lg" onClick={() => router.push("/signup")}>
            Begin Your Journey
          </PixelButton>
          <PixelButton variant="secondary" size="lg" onClick={() => router.push("/login")}>
            Continue Adventure
          </PixelButton>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            {
              title: "4 Worlds",
              desc: "Journey through Inferno, Abyss, Desert & Eden",
            },
            {
              title: "320+ Stages",
              desc: "Master HTML, CSS, JavaScript & React",
            },
            {
              title: "Multiplayer",
              desc: "Compete in 1v1 and 5v5 battles",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-souls-dark/80 backdrop-blur-sm border-2 border-souls-darker p-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              whileHover={{ scale: 1.02, borderColor: "#ff4136" }}
            >
              <h3 className="font-mono text-souls-red text-lg uppercase">{feature.title}</h3>
              <p className="font-mono text-souls-light/60 text-sm mt-1">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Decorative Border */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-souls-red to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </div>
  )
}
