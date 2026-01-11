"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import * as THREE from "three"
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from "@dnd-kit/core"
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Activity, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  Maximize2, 
  MoreVertical,
  Zap,
  Bell,
  Search,
  ChevronDown,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Globe,
  Server,
  Cpu,
  X
} from "lucide-react"
import { TelemetryWaveform } from "@/components/interactive-cards"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function HeatmapScene() {
  const meshRef = React.useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.sin(time / 2)
  })

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("ambientLight", { intensity: 0.5 }),
    React.createElement("pointLight", { position: [10, 10, 10] }),
    React.createElement(
      Float,
      { speed: 2, rotationIntensity: 1, floatIntensity: 1 },
      React.createElement(
        Sphere,
        { ref: meshRef, args: [1, 100, 100], scale: 2 },
        React.createElement(MeshDistortMaterial, {
          color: "#22d3ee",
          attach: "material",
          distort: 0.4,
          speed: 2,
          roughness: 0,
        })
      )
    )
  )
}

function WebGLHeatmap() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative h-[300px] w-full overflow-hidden rounded-2xl glass border border-primary/20 bg-primary/5"
    >
      <div className="absolute top-4 left-6 z-10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Neural Activity Heatmap</h3>
        <p className="text-xs text-muted-foreground">Real-time processing distribution</p>
      </div>
      {React.createElement(Canvas, { 
        camera: { position: [0, 0, 5], fov: 75 } 
      } as any, React.createElement(HeatmapScene))}
      <div className="absolute bottom-4 right-6 z-10 flex gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono">ACTIVE NODES: 1,248</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="h-2 w-2 rounded-full bg-cyber-pink animate-pulse" />
          <span className="text-[10px] font-mono">LOAD: 82%</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

const initialWidgets = [
  { id: "traffic", title: "Traffic Velocity", icon: TrendingUp, content: <TelemetryWaveform color="var(--cyber-neon)" />, change: "+12.4%", positive: true },
  { id: "users", title: "Active Entities", icon: Users, value: "12,408", sub: "+12% from last hour", change: "+12%", positive: true },
  { id: "security", title: "Security Core", icon: ShieldAlert, value: "Optimal", sub: "No threats detected", change: "100%", positive: true },
  { id: "power", title: "Power Output", icon: Zap, value: "1.2 GW", sub: "Grid stable", change: "-2%", positive: false }
]

function SortableWidget({ id, title, icon: Icon, value, sub, content, change, positive }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`group relative rounded-xl glass p-6 transition-all hover:border-primary/50 ${isDragging ? "z-50 shadow-2xl" : ""}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary"
          >
            <Icon className="h-5 w-5" />
          </motion.div>
          <h4 className="text-sm font-bold">{title}</h4>
        </div>
        <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-foreground/5">
            <Maximize2 className="h-4 w-4" />
          </button>
          <div {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-foreground/5 active:cursor-grabbing">
            <MoreVertical className="h-4 w-4" />
          </div>
        </div>
      </div>
      {value ? (
        <div>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">{sub}</div>
            <div className={`flex items-center gap-1 text-xs font-medium ${positive ? "text-green-500" : "text-red-500"}`}>
              {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {change}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">{content}</div>
      )}
    </motion.div>
  )
}

const activityItems = [
  { title: "Neural Network Training Complete", region: "us-east-1", time: "2m ago", status: "success" },
  { title: "Security Scan Initiated", region: "eu-central", time: "5m ago", status: "pending" },
  { title: "Database Backup Successful", region: "ap-south", time: "12m ago", status: "success" },
  { title: "API Rate Limit Warning", region: "us-west-2", time: "18m ago", status: "warning" },
  { title: "New User Registration", region: "global", time: "24m ago", status: "success" },
]

const notifications = [
  { title: "System Update Available", message: "v2.4.1 ready for deployment", time: "1h ago" },
  { title: "High Traffic Alert", message: "Traffic spike detected in US region", time: "3h ago" },
  { title: "Security Report", message: "Weekly security audit completed", time: "1d ago" },
]

export default function DashboardPage() {
  const [mounted, setMounted] = React.useState(false)
  const [widgets, setWidgets] = React.useState(initialWidgets)
  const [showNotifications, setShowNotifications] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [user, setUser] = React.useState<User | null>(null)
  const supabase = createClient()

  React.useEffect(() => {
    setMounted(true)
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: any) {
    const { active, over } = event
    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground">Unified interface for all Aetheris operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search commands..." 
              className="pl-10 w-64 h-10 rounded-full bg-foreground/5 border-foreground/10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                3
              </span>
            </Button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 w-80 rounded-xl glass border border-foreground/10 p-4 shadow-2xl z-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold">Notifications</h4>
                    <button onClick={() => setShowNotifications(false)} className="text-muted-foreground hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.map((notif, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer"
                      >
                        <div className="font-medium text-sm">{notif.title}</div>
                        <div className="text-xs text-muted-foreground">{notif.message}</div>
                        <div className="text-[10px] text-muted-foreground/50 mt-1">{notif.time}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {user && (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 pl-3 border-l border-foreground/10"
            >
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold leading-none">
                  {user.user_metadata?.full_name || user.email?.split('@')[0]}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">
                  Authorized User
                </div>
              </div>
              <Avatar className="h-10 w-10 border border-primary/20 ring-2 ring-primary/10">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {(user.user_metadata?.full_name || user.email || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          )}

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 text-xs font-mono text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            LIVE SYSTEM FEED
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Requests", value: "2.4M", change: "+18%", icon: Globe },
          { label: "Avg Latency", value: "14ms", change: "-3ms", icon: Clock },
          { label: "Active Servers", value: "48", change: "+2", icon: Server },
          { label: "CPU Usage", value: "67%", change: "+5%", icon: Cpu },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-xl glass p-4 border border-foreground/10"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-green-500">{stat.change}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <WebGLHeatmap />

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <SortableContext 
            items={widgets.map(w => w.id)}
            strategy={verticalListSortingStrategy}
          >
            {widgets.map((widget, i) => (
              <SortableWidget key={widget.id} {...widget} />
            ))}
          </SortableContext>
        </motion.div>
      </DndContext>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 rounded-2xl border border-foreground/10 bg-foreground/5 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Activity Stream</h3>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View All <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-4">
            {activityItems.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between border-b border-foreground/5 pb-4 last:border-0 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    item.status === "success" ? "bg-green-500/10" :
                    item.status === "warning" ? "bg-amber-500/10" : "bg-blue-500/10"
                  }`}>
                    <Activity className={`h-5 w-5 ${
                      item.status === "success" ? "text-green-500" :
                      item.status === "warning" ? "text-amber-500" : "text-blue-500"
                    }`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Globe className="h-3 w-3" />
                      {item.region}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-muted-foreground">{item.time}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl glass p-6"
        >
          <h3 className="mb-6 text-xl font-bold">Resource Allocation</h3>
          <div className="space-y-6">
            <ResourceBar label="Compute" value={75} color="var(--primary)" />
            <ResourceBar label="Memory" value={42} color="var(--cyber-neon)" />
            <ResourceBar label="Network" value={91} color="var(--cyber-pink)" />
            <ResourceBar label="Storage" value={28} color="var(--cyber-yellow)" />
          </div>
          
          <div className="mt-8 pt-6 border-t border-foreground/10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-bold">Quick Actions</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Scale Up", "Backup", "Restart", "Monitor"].map((action) => (
                <Button key={action} variant="outline" size="sm" className="rounded-lg text-xs">
                  {action}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function ResourceBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold uppercase tracking-wider">{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-foreground/5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          style={{ backgroundColor: color }}
          className="h-full rounded-full"
        />
      </div>
    </div>
  )
}
