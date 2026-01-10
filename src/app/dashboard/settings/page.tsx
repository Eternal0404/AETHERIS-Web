"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  User, 
  Bell, 
  Shield, 
  Zap, 
  Globe, 
  Database, 
  ChevronRight,
  Search,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState("general")

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>
        <p className="text-muted-foreground">Manage your Aetheris instance and security protocols.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-1">
          <TabButton 
            active={activeTab === "general"} 
            onClick={() => setActiveTab("general")} 
            icon={User} 
            label="General" 
          />
          <TabButton 
            active={activeTab === "notifications"} 
            onClick={() => setActiveTab("notifications")} 
            icon={Bell} 
            label="Notifications" 
          />
          <TabButton 
            active={activeTab === "security"} 
            onClick={() => setActiveTab("security")} 
            icon={Shield} 
            label="Security Core" 
          />
          <TabButton 
            active={activeTab === "performance"} 
            onClick={() => setActiveTab("performance")} 
            icon={Zap} 
            label="Performance" 
          />
          <TabButton 
            active={activeTab === "network"} 
            onClick={() => setActiveTab("network")} 
            icon={Globe} 
            label="Network Mesh" 
          />
        </div>

        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 space-y-8"
        >
          {activeTab === "general" && (
            <div className="space-y-6">
              <Section title="Workspace Identity">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">System Name</Label>
                    <Input id="name" defaultValue="Aetheris Mainframe" className="bg-foreground/5 border-foreground/10" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="id">System ID</Label>
                    <div className="flex gap-2">
                      <Input id="id" defaultValue="AE-842-X-91" readOnly className="bg-foreground/5 border-foreground/10 font-mono text-muted-foreground" />
                      <Button variant="outline">Copy</Button>
                    </div>
                  </div>
                </div>
              </Section>

              <Section title="Environment Controls">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl glass border border-foreground/10">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Auto-Scaling</div>
                      <div className="text-xs text-muted-foreground">Automatically provision nodes based on traffic velocity.</div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl glass border border-foreground/10">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Debug Mode</div>
                      <div className="text-xs text-muted-foreground">Enable detailed logging for neural operations.</div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </Section>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <Section title="Encryption Protocols">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">End-to-End Encryption</div>
                    <div className="text-xs text-muted-foreground">All data streams are currently encrypted using RSA-4096.</div>
                  </div>
                  <CheckCircle2 className="text-green-500 h-5 w-5" />
                </div>
              </Section>

              <Section title="Access Control">
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                    <span className="text-muted-foreground">Two-Factor Authentication</span>
                    <Button variant="link" className="text-primary h-auto p-0 font-bold">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-foreground/5">
                    <span className="text-muted-foreground">API Key Rotation</span>
                    <span className="text-xs font-mono">Every 30 days</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Active Sessions</span>
                    <span className="text-xs">4 global nodes</span>
                  </div>
                </div>
              </Section>
            </div>
          )}

          <div className="pt-6 border-t border-foreground/10 flex justify-end gap-3">
            <Button variant="ghost">Discard Changes</Button>
            <Button>Save Configuration</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{title}</h3>
      {children}
    </div>
  )
}

function TabButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
        active 
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
          : "hover:bg-foreground/5 text-muted-foreground"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {active && <motion.div layoutId="tab-active" className="h-1 w-1 rounded-full bg-white" />}
    </button>
  )
}
