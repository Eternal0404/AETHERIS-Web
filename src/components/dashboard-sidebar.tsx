"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Users, 
  Shield, 
  Activity, 
  Database, 
  Globe, 
  ChevronRight, 
  Zap,
  Cpu,
  Server,
  Cloud,
  Terminal
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = React.useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="relative flex h-screen flex-col border-r border-foreground/10 bg-background transition-all duration-500 ease-[0.76,0,0.24,1]"
    >
      <div className="flex h-20 items-center justify-between px-6">
        {!collapsed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xl font-bold tracking-tighter"
          >
            AETHERIS
          </motion.div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-foreground/5"
        >
          <div className="flex flex-col gap-1">
            <div className={cn("h-0.5 w-4 bg-foreground transition-all", collapsed && "w-6")} />
            <div className="h-0.5 w-4 bg-foreground" />
            <div className={cn("h-0.5 w-4 bg-foreground transition-all", collapsed && "w-6")} />
          </div>
        </button>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6 no-scrollbar">
        <SidebarGroup label="CORE PROTOCOLS" collapsed={collapsed}>
          <SidebarItem icon={LayoutDashboard} label="Command Center" href="/dashboard" active={pathname === "/dashboard"} collapsed={collapsed} />
          <SidebarItem icon={Activity} label="Live Telemetry" href="/dashboard/telemetry" collapsed={collapsed} />
          <SidebarItem 
            icon={Globe} 
            label="Global Mesh" 
            collapsed={collapsed}
            subItems={[
              { label: "Edge Regions", href: "/dashboard/mesh/regions" },
              { label: "Latency Map", href: "/dashboard/mesh/latency" },
              { 
                label: "Traffic Analysis", 
                subItems: [
                  { label: "Incoming", href: "/dashboard/mesh/traffic/in" },
                  { label: "Outgoing", href: "/dashboard/mesh/traffic/out" }
                ] 
              }
            ]}
          />
        </SidebarGroup>

        <SidebarGroup label="INFRASTRUCTURE" collapsed={collapsed}>
          <SidebarItem icon={Cpu} label="Compute Units" collapsed={collapsed} />
          <SidebarItem icon={Database} label="Storage Vaults" collapsed={collapsed} />
          <SidebarItem icon={Shield} label="Security Core" collapsed={collapsed} />
        </SidebarGroup>

        <SidebarGroup label="DEVELOPMENT" collapsed={collapsed}>
          <SidebarItem icon={Terminal} label="API Console" collapsed={collapsed} />
          <SidebarItem icon={FileText} label="Documentation" href="/docs" collapsed={collapsed} />
          <SidebarItem icon={Settings} label="System Config" collapsed={collapsed} />
        </SidebarGroup>
      </nav>

      <div className="p-4">
        <div className={cn("rounded-xl glass p-4", collapsed && "p-2 text-center")}>
          {!collapsed ? (
            <>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">System Status</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-xs font-medium">All Nodes Operational</span>
              </div>
            </>
          ) : (
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 mx-auto" />
          )}
        </div>
      </div>
    </motion.aside>
  )
}

function SidebarGroup({ label, children, collapsed }: { label: string, children: React.ReactNode, collapsed: boolean }) {
  return (
    <div className="space-y-1">
      {!collapsed && (
        <div className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

function SidebarItem({ 
  icon: Icon, 
  label, 
  href, 
  active, 
  collapsed,
  subItems 
}: { 
  icon: any, 
  label: string, 
  href?: string, 
  active?: boolean,
  collapsed: boolean,
  subItems?: any[]
}) {
  const [open, setOpen] = React.useState(false)

  const content = (
    <div className={cn(
      "flex items-center justify-between rounded-lg px-4 py-3 transition-all hover:bg-foreground/5",
      active && "bg-primary/10 text-primary",
      collapsed && "justify-center px-0"
    )}>
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="text-sm font-medium">{label}</span>}
      </div>
      {!collapsed && subItems && (
        <motion.div animate={{ rotate: open ? 90 : 0 }}>
          <ChevronRight className="h-4 w-4 opacity-50" />
        </motion.div>
      )}
    </div>
  )

  return (
    <div>
      {href && !subItems ? (
        <Link href={href}>{content}</Link>
      ) : (
        <button className="w-full text-left" onClick={() => setOpen(!open)}>
          {content}
        </button>
      )}

      {!collapsed && subItems && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="ml-9 mt-1 space-y-1 border-l border-foreground/10 pl-2"
            >
              {subItems.map((item, i) => (
                <div key={i}>
                  {item.subItems ? (
                    <SidebarSubItem label={item.label} subItems={item.subItems} />
                  ) : (
                    <Link 
                      href={item.href || "#"} 
                      className="block rounded-md px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

function SidebarSubItem({ label, subItems }: { label: string, subItems: any[] }) {
  const [open, setOpen] = React.useState(false)

  return (
    <div>
      <button 
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
      >
        <span>{label}</span>
        <ChevronRight className={cn("h-3 w-3 transition-transform", open && "rotate-90")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="ml-3 mt-1 space-y-1 border-l border-foreground/10 pl-2"
          >
            {subItems.map((item, i) => (
              <Link 
                key={i}
                href={item.href || "#"} 
                className="block rounded-md px-3 py-2 text-[11px] text-muted-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
