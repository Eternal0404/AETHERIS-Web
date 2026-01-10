"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts"
import { 
  Activity, 
  Zap, 
  Shield, 
  Cpu, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  Maximize2,
  RefreshCcw,
  Settings,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"

const data = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 5000) + 2000,
  latency: Math.floor(Math.random() * 50) + 10,
  cpu: Math.floor(Math.random() * 40) + 20,
  errors: Math.floor(Math.random() * 10)
}))

export default function TelemetryPage() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const refreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Telemetry</h1>
          <p className="text-muted-foreground">Deep-stream analysis of neural node performance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configure Feed
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current RPS" value="4,821" change="+12%" positive={true} icon={Zap} />
        <StatCard label="P99 Latency" value="18.4ms" change="-2.1ms" positive={true} icon={Clock} />
        <StatCard label="Cluster Health" value="99.98%" change="+0.01%" positive={true} icon={Shield} />
        <StatCard label="Active Nodes" value="124/128" change="0" positive={true} icon={Cpu} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 rounded-2xl glass p-6 border border-foreground/10"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold">Request Velocity</h3>
              <p className="text-xs text-muted-foreground">Real-time load distribution across global clusters</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-primary/10 text-primary text-[10px] font-bold">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                LIVE
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(0,0,0,0.8)", 
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorRequests)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl glass p-6 border border-foreground/10 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Node Health</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-6 flex-1">
            {[
              { label: "US-EAST-1", value: 98, status: "operational" },
              { label: "EU-WEST-2", value: 94, status: "warning" },
              { label: "AP-SOUTH-1", value: 100, status: "operational" },
              { label: "SA-EAST-1", value: 82, status: "degraded" },
              { label: "US-WEST-2", value: 96, status: "operational" },
            ].map((node, i) => (
              <div key={node.label} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono">{node.label}</span>
                  <span className={
                    node.status === "operational" ? "text-green-500" :
                    node.status === "warning" ? "text-amber-500" : "text-red-500"
                  }>{node.value}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-foreground/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${node.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${
                      node.status === "operational" ? "bg-green-500" :
                      node.status === "warning" ? "bg-amber-500" : "bg-red-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="text-xs font-bold text-primary mb-1">INTELLIGENT INSIGHT</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Traffic is spiking in EU regions. Auto-scaling is preparing 4 additional nodes to maintain sub-20ms latency.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TelemetryCard title="CPU Saturation" dataKey="cpu" color="#22d3ee" />
        <TelemetryCard title="Network Latency" dataKey="latency" color="#f472b6" />
        <TelemetryCard title="Error Rate" dataKey="errors" color="#fbbf24" />
      </div>
    </div>
  )
}

function StatCard({ label, value, change, positive, icon: Icon }: any) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="rounded-xl glass p-4 border border-foreground/10"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 rounded-lg bg-foreground/5 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <div className={`text-xs font-medium flex items-center ${positive ? "text-green-500" : "text-red-500"}`}>
          {positive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{label}</div>
    </motion.div>
  )
}

function TelemetryCard({ title, dataKey, color }: { title: string, dataKey: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl glass p-4 border border-foreground/10 h-[200px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold">{title}</h4>
        <Activity className="h-3 w-3 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.slice(-12)}>
            <Bar 
              dataKey={dataKey} 
              fill={color} 
              radius={[2, 2, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
