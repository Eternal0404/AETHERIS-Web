"use client"

import * as React from "react"
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
import { motion } from "framer-motion"
import { 
  Activity, 
  Users, 
  ShieldAlert, 
  TrendingUp, 
  Maximize2, 
  MoreVertical,
  Zap
} from "lucide-react"
import { TelemetryWaveform } from "@/components/interactive-cards"

// WebGL Heatmap Component
function HeatmapScene() {
  const meshRef = React.useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.sin(time / 2)
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={meshRef} args={[1, 100, 100]} scale={2}>
          <MeshDistortMaterial
            color="#22d3ee"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
          />
        </Sphere>
      </Float>
    </>
  )
}

function WebGLHeatmap() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden rounded-2xl glass border border-primary/20 bg-primary/5">
      <div className="absolute top-4 left-6 z-10">
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Neural Activity Heatmap</h3>
        <p className="text-xs text-muted-foreground">Real-time processing distribution</p>
      </div>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <HeatmapScene />
      </Canvas>
      <div className="absolute bottom-4 right-6 z-10 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-[10px] font-mono">ACTIVE NODES: 1,248</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-cyber-pink" />
          <span className="text-[10px] font-mono">LOAD: 82%</span>
        </div>
      </div>
    </div>
  )
}

// Widget System
const initialWidgets = [
  { id: "traffic", title: "Traffic Velocity", icon: TrendingUp, content: <TelemetryWaveform color="var(--cyber-neon)" /> },
  { id: "users", title: "Active Entities", icon: Users, value: "12,408", sub: "+12% from last hour" },
  { id: "security", title: "Security Core", icon: ShieldAlert, value: "Optimal", sub: "No threats detected" },
  { id: "power", title: "Power Output", icon: Zap, value: "1.2 GW", sub: "Grid stable" }
]

function SortableWidget({ id, title, icon: Icon, value, sub, content }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="group relative rounded-xl glass p-6 transition-all hover:border-primary/50"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold">{title}</h4>
        </div>
        <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="text-muted-foreground hover:text-foreground">
            <Maximize2 className="h-4 w-4" />
          </button>
          <div {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground active:cursor-grabbing">
            <MoreVertical className="h-4 w-4" />
          </div>
        </div>
      </div>
      {value ? (
        <div>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
        </div>
      ) : (
        <div className="mt-4">{content}</div>
      )}
    </div>
  )
}

export default function DashboardPage() {
  const [widgets, setWidgets] = React.useState(initialWidgets)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
          <p className="text-muted-foreground">Unified interface for all Aetheris operations.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          LIVE SYSTEM FEED
        </div>
      </div>

      <WebGLHeatmap />

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <SortableContext 
            items={widgets.map(w => w.id)}
            strategy={verticalListSortingStrategy}
          >
            {widgets.map((widget) => (
              <SortableWidget key={widget.id} {...widget} />
            ))}
          </SortableContext>
        </div>
      </DndContext>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-foreground/10 bg-foreground/5 p-6">
          <h3 className="mb-6 text-xl font-bold">Activity Stream</h3>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between border-b border-foreground/5 pb-4 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">System Update Protocol {420 + i}</div>
                    <div className="text-xs text-muted-foreground">Successful deployment to Region-0{i+1}</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-muted-foreground">{i * 2}m ago</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl glass p-6">
          <h3 className="mb-6 text-xl font-bold">Resource Allocation</h3>
          <div className="space-y-6">
            <ResourceBar label="Compute" value={75} color="var(--primary)" />
            <ResourceBar label="Memory" value={42} color="var(--cyber-neon)" />
            <ResourceBar label="Network" value={91} color="var(--cyber-pink)" />
            <ResourceBar label="Storage" value={28} color="var(--cyber-yellow)" />
          </div>
        </div>
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
      <div className="h-1.5 w-full rounded-full bg-foreground/5 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ backgroundColor: color }}
          className="h-full"
        />
      </div>
    </div>
  )
}
