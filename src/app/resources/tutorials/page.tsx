"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Play, 
  BookOpen, 
  Code, 
  Terminal, 
  ArrowRight,
  Star,
  Clock,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

const tutorials = [
  {
    title: "Getting Started with Aetheris CLI",
    level: "Beginner",
    duration: "15 min",
    points: 100,
    icon: Terminal,
    color: "#22d3ee"
  },
  {
    title: "Deploying Your First Edge Function",
    level: "Intermediate",
    duration: "25 min",
    points: 250,
    icon: Code,
    color: "#f472b6"
  },
  {
    title: "Advanced Traffic Steering Protocols",
    level: "Advanced",
    duration: "45 min",
    points: 500,
    icon: BookOpen,
    color: "#fbbf24"
  }
]

export default function TutorialsPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Learning Path</h1>
          <p className="text-muted-foreground max-w-xl">
            Master the neural mesh with our step-by-step guides and interactive labs.
          </p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl glass border border-foreground/10">
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Your Progress</div>
            <div className="text-sm font-bold">Level 4 Node Architect</div>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin-slow flex items-center justify-center">
            <span className="text-xs font-bold animate-none">75%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tutorials.map((tut, i) => (
          <motion.div
            key={tut.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="group relative p-6 rounded-2xl glass border border-foreground/10 overflow-hidden"
          >
            <div 
              className="absolute top-0 right-0 w-32 h-32 opacity-10 blur-3xl rounded-full"
              style={{ backgroundColor: tut.color }}
            />
            
            <div className="flex items-start justify-between mb-6">
              <div 
                className="h-12 w-12 rounded-xl flex items-center justify-center text-background"
                style={{ backgroundColor: tut.color }}
              >
                <tut.icon className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <Star className="h-3 w-3 fill-primary text-primary" />
                {tut.points} PTS
              </div>
            </div>

            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tut.title}</h3>
            
            <div className="flex items-center gap-4 mb-8 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {tut.duration}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-full bg-foreground/5">{tut.level}</span>
            </div>

            <Button className="w-full group/btn" variant="outline">
              Start Tutorial 
              <Play className="ml-2 h-3 w-3 fill-current group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Detailed Curriculum</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="group flex items-center justify-between p-4 rounded-xl border border-foreground/5 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-lg bg-foreground/5 flex items-center justify-center text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  0{step}
                </div>
                <div>
                  <div className="text-sm font-bold">Module {step}: Neural Fundamentals</div>
                  <div className="text-xs text-muted-foreground">Understanding node topology and shard distribution.</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
