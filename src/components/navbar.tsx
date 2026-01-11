"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { SearchOverlay } from "./search-overlay"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User as UserIcon, Settings, LayoutDashboard } from "lucide-react"

interface NavbarProps {
  initialUser?: User | null
}

export function Navbar({ initialUser }: NavbarProps) {
  const [user, setUser] = React.useState<User | null>(initialUser ?? null)
  const supabase = React.useMemo(() => createClient(), [])

  React.useEffect(() => {
    if (initialUser) {
      setUser(initialUser)
    } else {
      const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      }
      getUser()
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase, initialUser])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const userInitials = user?.email?.substring(0, 2).toUpperCase() ?? "U"
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User"
  const avatarUrl = user?.user_metadata?.avatar_url

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
              <Link href="/education" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
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
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {user.email}
                </span>
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full border border-foreground/10 p-0 hover:bg-foreground/5">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={avatarUrl} alt={displayName} />
                      <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link href="/dashboard/settings">
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
