"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Activity, 
  Clock, 
  Globe, 
  ArrowRight,
  Zap,
  RefreshCw
} from "lucide-react"
import { Button } from "@/components/ui/button"

const regions = [
  { from: "US-EAST", to: "EU-WEST", latency: "68ms", status: "optimal" },
  { from: "US-EAST", to: "AP-SOUTH", latency: "245ms", status: "degraded" },
  { from: "EU-WEST", to: "AP-SOUTH", latency: "112ms", status: "optimal" },
  { from: "US-WEST", to: "US-EAST", latency: "42ms", status: "optimal" },
  { from: "SA-EAST", to: "US-EAST", latency: "135ms", status: "warning" },
]

export default function LatencyPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Latency Mesh</h1>
          <p className="text-muted-foreground">Real-time inter-region communication delays.</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Re-test All Routes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl glass border border-foreground/10 p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-10" />
          <div className="relative z-10 grid grid-cols-3 gap-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                  transition={{ 
                    duration: 2, 
                    repeat: 999999, 
                    delay: i * 0.3 
                  }}
                className="h-16 w-16 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5"
              >
                <div className="h-2 w-2 rounded-full bg-primary" />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg className="w-full h-full opacity-20">
              <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="var(--primary)" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>
          <div className="mt-12 text-[10px] font-mono tracking-[0.3em] text-primary animate-pulse">
            PINGING GLOBAL CLUSTERS...
          </div>
        </motion.div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Inter-Regional Routes</h3>
          {regions.map((route, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-xl glass border border-foreground/10 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="text-xs font-bold font-mono">{route.from}</div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="text-xs font-bold font-mono">{route.to}</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-sm font-bold font-mono">{route.latency}</div>
                <div className={`h-2 w-2 rounded-full ${
                  route.status === "optimal" ? "bg-green-500 shadow-[0_0_8px_#22c55e]" :
                  route.status === "warning" ? "bg-amber-500 shadow-[0_0_8px_#f59e0b]" : "bg-red-500 shadow-[0_0_8px_#ef4444]"
                }`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Averge P99</span>
          </div>
          <div className="text-2xl font-bold">14.2ms</div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Across all healthy nodes</p>
        </div>
        <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Optimization</span>
          </div>
          <div className="text-2xl font-bold">94.8%</div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Pathfinding efficiency</p>
        </div>
        <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <Activity className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Jitter</span>
          </div>
          <div className="text-2xl font-bold">0.42ms</div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Stable signal variance</p>
        </div>
      </div>
    </div>
  )
}
