"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Globe, 
  MapPin, 
  Server, 
  Activity, 
  Wifi, 
  ArrowUpRight,
  ShieldCheck,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"

const regions = [
  { id: "us-east-1", name: "US East (N. Virginia)", nodes: 42, health: 100, traffic: "High", latency: "12ms" },
  { id: "us-west-2", name: "US West (Oregon)", nodes: 28, health: 100, traffic: "Medium", latency: "45ms" },
  { id: "eu-central-1", name: "Europe (Frankfurt)", nodes: 35, health: 98, traffic: "High", latency: "85ms" },
  { id: "ap-southeast-1", name: "Asia Pacific (Singapore)", nodes: 22, health: 100, traffic: "Low", latency: "160ms" },
  { id: "sa-east-1", name: "South America (São Paulo)", nodes: 12, health: 85, traffic: "Medium", latency: "140ms" },
]

export default function RegionsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edge Regions</h1>
          <p className="text-muted-foreground">Global distribution of Aetheris compute nodes.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button size="sm">Provision New Region</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 rounded-3xl glass border border-foreground/10 overflow-hidden relative min-h-[400px] flex items-center justify-center bg-primary/5"
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)]" />
          </div>
          
          <div className="relative z-10 text-center">
            <Globe className="h-48 w-48 text-primary/20 animate-pulse mx-auto mb-4" />
            <div className="text-sm font-mono text-primary animate-pulse">GLOBAL MESH SYNCING...</div>
          </div>

          <div className="absolute top-6 left-6 flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-foreground/10 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold">128 ACTIVE NODES</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/50 border border-foreground/10 backdrop-blur-md">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-[10px] font-bold">5 GLOBAL REGIONS</span>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Regional Health</h3>
          {regions.map((region, i) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              className="p-4 rounded-xl glass border border-foreground/10 group cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold">{region.id.toUpperCase()}</span>
                </div>
                <div className={`h-2 w-2 rounded-full ${
                  region.health === 100 ? "bg-green-500" :
                  region.health >= 90 ? "bg-amber-500" : "bg-red-500"
                }`} />
              </div>
              <div className="text-xs text-muted-foreground mb-3">{region.name}</div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="flex items-center gap-1">
                  <Server className="h-3 w-3 opacity-50" />
                  <span>{region.nodes} NODES</span>
                </div>
                <div className="flex items-center gap-1">
                  <Activity className="h-3 w-3 opacity-50" />
                  <span>{region.latency}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard 
          icon={Wifi} 
          title="Anycast Routing" 
          desc="Global traffic is automatically routed to the nearest healthy node."
        />
        <FeatureCard 
          icon={ShieldCheck} 
          title="Edge Security" 
          desc="DDoS protection and WAF filtering at the regional level."
        />
        <FeatureCard 
          icon={Zap} 
          title="Zero Latency" 
          desc="Global replication with sub-millisecond local response times."
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl glass border border-foreground/10"
    >
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
        <Icon className="h-5 w-5" />
      </div>
      <h4 className="text-lg font-bold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      <Button variant="link" className="px-0 mt-4 text-primary group">
        Learn More <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Button>
    </motion.div>
  )
}
