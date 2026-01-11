"use client"

import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Navbar } from "@/components/navbar"
import { User } from "@supabase/supabase-js"

export function DashboardClientLayout({ 
  children, 
  user 
}: { 
  children: React.ReactNode
  user: User | null
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-background/50">
        <Navbar initialUser={user} />
        <div className="flex-1 p-6 pt-24">
          {children}
        </div>
      </div>
    </div>
  )
}
