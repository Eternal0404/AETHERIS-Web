"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  ArrowUpRight, 
  Activity, 
  Globe, 
  Zap,
  Clock,
  Filter,
  Download,
  Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"

const data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  traffic: Math.floor(Math.random() * 6000) + 500,
  peak: Math.floor(Math.random() * 9000) + 4000,
}))

export default function OutgoingTrafficPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Outgoing Traffic</h1>
          <p className="text-muted-foreground">Analysis of data egress from the neural mesh to global endpoints.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share Report
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Egress Logs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 rounded-2xl glass p-6 border border-foreground/10"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Egress Throughput (Gbps)</h3>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-cyber-pink">
                <div className="h-1.5 w-1.5 rounded-full bg-cyber-pink" />
                ACTIVE EGRESS
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <div className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
                CAPACITY
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" hide />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <Area type="monotone" dataKey="traffic" stroke="var(--cyber-pink)" fill="var(--cyber-pink)" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <div className="space-y-6">
          <StatMini label="Global Egress" value="2.8 Tbps" icon={ArrowUpRight} color="text-cyber-pink" />
          <StatMini label="Delivery Success" value="99.99%" icon={Activity} color="text-green-500" />
          <StatMini label="Avg TTL" value="64" icon={Clock} color="text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Edge Cache", "Origin", "P2P", "Direct"].map((source) => (
          <motion.div 
            key={source}
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl glass border border-foreground/10"
          >
            <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{source}</div>
            <div className="text-xl font-bold">{(Math.random() * 100).toFixed(1)}%</div>
            <div className="mt-2 h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
              <div className="h-full bg-cyber-pink" style={{ width: `${Math.random() * 100}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StatMini({ label, value, icon: Icon, color }: any) {
  return (
    <div className="p-4 rounded-xl glass border border-foreground/10 flex items-center justify-between">
      <div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</div>
        <div className="text-xl font-bold mt-1">{value}</div>
      </div>
      <div className={`h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  )
}
