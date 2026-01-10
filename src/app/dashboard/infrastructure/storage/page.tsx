"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Database, 
  HardDrive, 
  Layers, 
  Cloud, 
  ArrowUpRight,
  MoreVertical,
  Plus
} from "lucide-react"
import { Button } from "@/components/ui/button"

const volumes = [
  { id: "vol-9182", type: "NVMe SSD", size: "500 GB", used: "320 GB", status: "attached" },
  { id: "vol-0129", type: "Block Storage", size: "2 TB", used: "1.2 TB", status: "attached" },
  { id: "vol-4421", type: "Object Store", size: "∞", used: "450 GB", status: "available" },
]

export default function StoragePage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Storage Vaults</h1>
          <p className="text-muted-foreground">Persistent data persistence across the neural mesh.</p>
        </div>
        <Button size="sm" className="rounded-full">
          <Plus className="mr-2 h-4 w-4" />
          Create Volume
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Active Volumes</h3>
          {volumes.map((vol, i) => (
            <motion.div
              key={vol.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl glass border border-foreground/10 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-foreground/5 flex items-center justify-center text-primary">
                  <HardDrive className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold">{vol.id}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{vol.type} • {vol.size}</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-[10px] text-muted-foreground uppercase mb-1">Usage</div>
                  <div className="text-xs font-mono">{vol.used} / {vol.size}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-2 py-0.5 rounded bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest">
                    {vol.status}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Global Quota</h3>
          <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground uppercase tracking-widest font-bold">SSD Throughput</span>
                <span className="font-mono">75%</span>
              </div>
              <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: "75%" }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground uppercase tracking-widest font-bold">IOPS Capacity</span>
                <span className="font-mono">42%</span>
              </div>
              <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyber-pink" style={{ width: "42%" }} />
              </div>
            </div>
            <div className="pt-4 border-t border-foreground/5">
              <div className="text-xs text-muted-foreground">Next billing cycle starts in 12 days. Current estimated cost: <span className="text-foreground font-bold">$142.50</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
