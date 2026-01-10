"use client"

import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Navbar } from "@/components/navbar"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-background/50">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div 
            key={pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 p-6 pt-24"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
