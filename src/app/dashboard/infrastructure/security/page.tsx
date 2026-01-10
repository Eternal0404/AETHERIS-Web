"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Shield, 
  Lock, 
  Eye, 
  ShieldAlert, 
  Terminal,
  RefreshCw,
  CheckCircle2,
  AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SecurityPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Core</h1>
          <p className="text-muted-foreground">Unified threat management and encryption protocols.</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Full System Scan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-4">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">WAF Status</h3>
          <p className="text-sm text-muted-foreground">Level 7 protection is currently filtering all incoming traffic clusters.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-green-500">
            <CheckCircle2 className="h-4 w-4" />
            ACTIVE PROTECTION
          </div>
        </div>
        <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-4">
          <div className="h-10 w-10 rounded-xl bg-cyber-pink/10 flex items-center justify-center text-cyber-pink">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">SSL/TLS Core</h3>
          <p className="text-sm text-muted-foreground">RSA-4096 encryption is enforced across all edge regions.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-primary">
            <RefreshCw className="h-4 w-4 animate-spin-slow" />
            AUTO-ROTATING KEYS
          </div>
        </div>
        <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-4">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Eye className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">Intrusion Detection</h3>
          <p className="text-sm text-muted-foreground">No anomalies detected in the last 168 hours of operation.</p>
          <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            CLEAN AUDIT
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 space-y-6">
        <h3 className="text-xl font-bold">Recent Security Events</h3>
        <div className="space-y-4">
          {[
            { event: "Brute force attempt blocked", source: "IP: 192.168.1.1", time: "2m ago", severity: "low" },
            { event: "API Key rotation successful", source: "System", time: "1h ago", severity: "info" },
            { event: "New region firewall rules applied", source: "Admin", time: "3h ago", severity: "info" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-foreground/5 last:border-0">
              <div className="flex items-center gap-4">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                  item.severity === "low" ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                }`}>
                  <ShieldAlert className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{item.event}</div>
                  <div className="text-xs text-muted-foreground">{item.source}</div>
                </div>
              </div>
              <div className="text-xs font-mono text-muted-foreground">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
