"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Cpu, 
  Zap, 
  Activity, 
  Server, 
  Plus,
  ArrowRight,
  MoreVertical,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

const nodes = [
  { id: "node-1", type: "Compute Optimized", cpu: "8 vCPU", mem: "16 GB", status: "running", health: 100 },
  { id: "node-2", type: "General Purpose", cpu: "4 vCPU", mem: "8 GB", status: "running", health: 98 },
  { id: "node-3", type: "Memory Optimized", cpu: "16 vCPU", mem: "64 GB", status: "stopped", health: 100 },
]

export default function ComputePage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compute Units</h1>
          <p className="text-muted-foreground">Manage and scale your neural processing clusters.</p>
        </div>
        <Button size="sm" className="rounded-full shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" />
          Provision Node
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Active Nodes</h3>
          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group p-4 rounded-2xl glass border border-foreground/10 flex items-center justify-between hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                  node.status === "running" ? "bg-primary/10 text-primary" : "bg-foreground/5 text-muted-foreground"
                }`}>
                  <Cpu className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold">{node.id}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{node.type} • {node.cpu} / {node.mem}</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="hidden md:block">
                  <div className="text-[10px] text-muted-foreground uppercase mb-1">Health</div>
                  <div className="h-1 w-24 bg-foreground/5 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${node.health}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                    node.status === "running" ? "bg-green-500/10 text-green-500" : "bg-foreground/10 text-muted-foreground"
                  }`}>
                    {node.status}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quick Stats</h3>
          <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-6">
            <StatRow label="Total vCPUs" value="124" />
            <StatRow label="Allocated RAM" value="512 GB" />
            <StatRow label="Avg Load" value="42%" />
            <div className="pt-4 border-t border-foreground/5">
              <Button variant="outline" className="w-full text-xs">View Performance Metrics</Button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <h4 className="text-sm font-bold mb-2">Auto-Scaling Active</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Based on your current load, 2 additional nodes will be provisioned if traffic exceeds 80% for more than 5 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-mono font-bold">{value}</span>
    </div>
  )
}
