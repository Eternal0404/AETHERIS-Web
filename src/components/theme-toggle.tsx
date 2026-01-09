"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [ripple, setRipple] = React.useState<{ x: number; y: number; theme: string } | null>(null)

  const handleThemeChange = (newTheme: string, e: React.MouseEvent) => {
    if (newTheme === theme) return

    setRipple({
      x: e.clientX,
      y: e.clientY,
      theme: newTheme,
    })

    // Delay the actual theme change to sync with ripple
    setTimeout(() => {
      setTheme(newTheme)
      setTimeout(() => setRipple(null), 1000)
    }, 400)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full border border-foreground/10">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass">
          <DropdownMenuItem onClick={(e) => handleThemeChange("light", e)} className="gap-2">
            <Sun className="h-4 w-4" /> Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => handleThemeChange("dark", e)} className="gap-2">
            <Moon className="h-4 w-4" /> Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => handleThemeChange("cyber", e)} className="gap-2">
            <Zap className="h-4 w-4 text-cyber-neon" /> Cyber
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => handleThemeChange("system", e)} className="gap-2">
            <Monitor className="h-4 w-4" /> System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AnimatePresence>
        {ripple && (
          <motion.div
            initial={{ 
              clipPath: `circle(0% at ${ripple.x}px ${ripple.y}px)`,
              opacity: 1
            }}
            animate={{ 
              clipPath: `circle(150% at ${ripple.x}px ${ripple.y}px)`,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`fixed inset-0 z-[9999] pointer-events-none ${
              ripple.theme === 'dark' ? 'bg-black' : 
              ripple.theme === 'cyber' ? 'bg-[#020617]' : 
              'bg-white'
            }`}
          />
        )}
      </AnimatePresence>
    </>
  )
}
