"use client"

import * as React from "react"
import { Search, FileText, LayoutDashboard, Settings, User, Command } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"

export function SearchOverlay() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-foreground/30 hover:bg-foreground/5"
      >
        <Search className="h-4 w-4" />
        <span>Search Aetheris...</span>
        <kbd className="ml-4 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="overflow-hidden rounded-xl border border-foreground/10 bg-background/80 shadow-2xl backdrop-blur-2xl">
          <CommandInput placeholder="Type a command or search..." className="h-14 border-none focus:ring-0" />
          <CommandList className="max-h-[350px]">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Quick Access">
              <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/resources"))}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Resource Library</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/docs"))}>
                <Command className="mr-2 h-4 w-4" />
                <span>API Documentation</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => runCommand(() => router.push("/profile"))}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </CommandItem>
              <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </div>
      </CommandDialog>
    </>
  )
}
