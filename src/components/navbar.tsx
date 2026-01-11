"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SearchOverlay } from "./search-overlay"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"

export function Navbar() {
  const [user, setUser] = React.useState<User | null>(null)
  const supabase = createClient()

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between border-b border-foreground/10 bg-background/50 px-6 py-4 backdrop-blur-md"
    >
      <div className="flex items-center gap-8">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
            A
          </div>
          <span className="font-mono text-xl font-bold tracking-tighter transition-colors group-hover:text-primary">
            AETHERIS
          </span>
        </Link>
          <div className="hidden gap-6 md:flex">
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/education/space-pollution" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
              Education
            </Link>
            <Link href="/resources" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Resources
            </Link>
            <Link href="/docs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Docs
            </Link>
          </div>
      </div>

      <div className="flex items-center gap-4">
        <SearchOverlay />
        <ThemeToggle />
        {user ? (
          <Button variant="outline" className="rounded-full" onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <Link href="/auth">
            <Button variant="outline" className="rounded-full">
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </motion.nav>
  )
}
