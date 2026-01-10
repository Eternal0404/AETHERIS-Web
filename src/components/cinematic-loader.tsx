"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

// Global to track if loader has been shown in the current window session (memory-safe)
let hasShownInSession = false

export function CinematicLoader() {
  const [mounted, setMounted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    
    // If we've already shown it in this memory session, or sessionStorage has it, don't show
    if (hasShownInSession) return

    const hasLoaded = sessionStorage.getItem("aetheris-loaded")
    if (!hasLoaded) {
      setLoading(true)
      hasShownInSession = true
      const timer = setTimeout(() => {
        setLoading(false)
        sessionStorage.setItem("aetheris-loaded", "true")
      }, 2500)
      return () => clearTimeout(timer)
    } else {
      hasShownInSession = true
    }
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute -inset-20 border border-primary/20 rounded-full"
            />
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.5, 1.2],
                rotate: [0, -180, -360],
              }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute -inset-32 border border-primary/10 rounded-full"
            />

            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl font-bold tracking-[0.3em] font-mono text-foreground"
              >
                AETHERIS
              </motion.div>
              
              <motion.div
                initial={{ top: "-100%" }}
                animate={{ top: "200%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-primary shadow-[0_0_15px_var(--primary)] z-10"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scaleY: [1, 2, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                  className="w-1 h-4 bg-primary rounded-full"
                />
              ))}
            </div>
            <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
              Initializing Neural Mesh...
            </div>
          </motion.div>

          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
