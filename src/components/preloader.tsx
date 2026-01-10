"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [isDone, setIsDone] = React.useState(false)
  const [shouldSkip, setShouldSkip] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const hasLoaded = sessionStorage.getItem("aetheris-preloader-loaded")
    if (hasLoaded) {
      setShouldSkip(true)
      onComplete()
    }
  }, [onComplete])

  React.useEffect(() => {
    if (!mounted || shouldSkip) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsDone(true)
            sessionStorage.setItem("aetheris-preloader-loaded", "true")
            setTimeout(onComplete, 1000)
          }, 500)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 100)
    return () => clearInterval(interval)
  }, [mounted, shouldSkip, onComplete])

  const logoVariants = {
    initial: {
      d: "M 20 20 L 80 20 L 80 80 L 20 80 Z",
      fill: "transparent",
      stroke: "currentColor",
    },
    animate: {
      d: [
        "M 20 20 L 80 20 L 80 80 L 20 80 Z",
        "M 50 10 L 90 50 L 50 90 L 10 50 Z",
        "M 20 20 L 80 20 L 80 80 L 20 80 Z",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  if (!mounted || shouldSkip) return null

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative h-32 w-32">
            <svg viewBox="0 0 100 100" className="h-full w-full text-primary">
              <motion.path
                variants={logoVariants}
                initial="initial"
                animate="animate"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold">
              {Math.min(progress, 100)}%
            </div>
          </div>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="mt-8 h-px w-64 origin-left bg-primary/30"
          />
          <div className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Initializing Aetheris
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
