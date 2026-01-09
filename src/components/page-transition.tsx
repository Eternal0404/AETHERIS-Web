"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          variants={{
            initial: { scaleY: 0 },
            animate: { scaleY: 0 },
            exit: { scaleY: 1 },
          }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[50] origin-top bg-primary"
        />
        <motion.div
          variants={{
            initial: { scaleY: 1 },
            animate: { scaleY: 0 },
            exit: { scaleY: 0 },
          }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[50] origin-bottom bg-primary"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
