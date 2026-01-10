// src/app/education/space-pollution/page.tsx
"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { EarthPollutionModel } from "@/components/earth-pollution-model";
import { ScrambleIn } from "@/components/scramble-in";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Activity, Info, AlertTriangle, Recycle, Target, Waves, Search, BarChart3, Globe, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const SOLUTIONS = [
  {
    id: "clearspace",
    title: "ClearSpace-1",
    subtitle: "Active Debris Removal",
    description: "The world's first mission to remove a piece of space debris from orbit. Using a 'chaser' satellite with four robotic arms to grab and de-orbit spent rocket stages.",
    icon: <Target className="h-6 w-6" />,
    color: "bg-blue-500",
    stats: "Launch: 2025 | Target: Vespa Payload Adapter"
  },
  {
    id: "nets",
    title: "RemoveDEBRIS",
    subtitle: "Net & Harpoon",
    description: "A multi-platform mission testing net capture, harpoon capture, and vision-based navigation to safely secure larger objects before dragging them into the atmosphere.",
    icon: <Waves className="h-6 w-6" />,
    color: "bg-red-500",
    stats: "Success rate: 92% in simulations"
  },
  {
    id: "lasers",
    title: "Laser Ablation",
    subtitle: "Ground-to-Orbit Force",
    description: "Using high-power ground-based lasers to create a small plasma jet on a piece of debris, providing enough thrust to change its orbit and avoid collisions.",
    icon: <Zap className="h-6 w-6" />,
    color: "bg-amber-500",
    stats: "Range: 400km - 800km"
  },
  {
    id: "magnets",
    title: "ELSA-d",
    subtitle: "Magnetic Docking",
    description: "End-of-Life Services by Astroscale. Demonstrating magnetic docking technology to capture and remove defunct satellites from orbit.",
    icon: <Recycle className="h-6 w-6" />,
    color: "bg-emerald-500",
    stats: "Deployment: Operational"
  }
];

export default function SpacePollutionPage() {
  const [activeTab, setActiveTab] = React.useState<"overview" | "solutions" | "map">("overview");

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-red-500/30 font-sans">
      <Navbar />
      
      {/* Hero 3D Section */}
      <section className="relative h-[85vh] w-full pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EarthPollutionModel />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-32 px-6 pointer-events-none">
          <ScrambleIn delay={0.5} stagger={0.1} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-red-500 backdrop-blur-sm"
            >
              <Activity className="h-3 w-3 animate-pulse" />
              Real-time Orbital Risk: Critical
            </motion.div>
            <h1 className="text-7xl font-black tracking-tighter md:text-9xl lg:text-[12rem] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              ORBITAL
            </h1>
            <h1 className="text-7xl font-black tracking-tighter md:text-9xl lg:text-[12rem] leading-none uppercase -mt-4 text-transparent bg-clip-text bg-gradient-to-t from-red-600 to-red-400">
              DEBRIS
            </h1>
          </ScrambleIn>
        </div>

        {/* Navigation Tabs */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
          {[
            { id: "overview", label: "Overview", icon: <Search className="w-4 h-4" /> },
            { id: "map", label: "Data Map", icon: <Layers className="w-4 h-4" /> },
            { id: "solutions", label: "Explore Solutions", icon: <Target className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "relative flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all rounded-full",
                activeTab === tab.id ? "text-black" : "text-white/60 hover:text-white"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="relative z-10 bg-black">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Stats Grid */}
              <section className="mx-auto max-w-7xl px-6 py-32">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {[
                    { val: "34,000+", label: "Tracked Objects", desc: "Objects larger than 10cm currently monitored by space agencies.", icon: <Activity />, color: "border-red-500/20 bg-red-500/5" },
                    { val: "128M", label: "Lethal Fragments", desc: "Pieces from 1mm to 1cm orbiting at speeds up to 28,000 km/h.", icon: <Zap />, color: "border-white/10 bg-white/5" },
                    { val: "7.5km/s", label: "Impact Velocity", desc: "Average relative speed of collision. A bolt has the energy of a hand grenade.", icon: <Shield />, color: "border-white/10 bg-white/5" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={cn("rounded-3xl border p-10 backdrop-blur-md hover:border-white/20 transition-colors group", stat.color)}
                    >
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                      <h3 className="text-5xl font-black tracking-tight mb-2">{stat.val}</h3>
                      <p className="text-xl font-bold mb-4 uppercase tracking-tighter text-white/80">{stat.label}</p>
                      <p className="text-muted-foreground leading-relaxed">{stat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Educational Content */}
              <section className="mx-auto max-w-5xl px-6 py-32 space-y-48">
                <div className="grid gap-20 md:grid-cols-2 items-center">
                  <div>
                    <h2 className="text-6xl font-black tracking-tighter flex items-center gap-6 mb-8 uppercase italic">
                      The Junk Problem
                    </h2>
                    <p className="text-2xl text-muted-foreground leading-relaxed font-light">
                      Space debris is any human-made object in orbit around Earth that no longer serves a useful function. Every bolt, paint chip, and defunct satellite contributes to an invisible minefield surrounding our planet.
                    </p>
                    <div className="mt-10 flex gap-4">
                      <div className="h-1 w-20 bg-red-500" />
                      <div className="h-1 w-8 bg-red-500/30" />
                      <div className="h-1 w-4 bg-red-500/10" />
                    </div>
                  </div>
                  <div className="relative aspect-square">
                    <div className="absolute inset-0 bg-red-500/10 blur-[100px] animate-pulse" />
                    <div className="relative h-full w-full rounded-full border border-red-500/20 flex items-center justify-center bg-black/50 backdrop-blur-3xl overflow-hidden">
                       <div className="absolute inset-4 rounded-full border border-red-500/10 border-dashed animate-spin-slow" />
                       <AlertTriangle className="h-32 w-32 text-red-500/50" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-20 md:grid-cols-2 items-center">
                  <div className="order-2 md:order-1 relative aspect-square">
                    <div className="absolute inset-0 bg-blue-500/10 blur-[100px] animate-pulse" />
                    <div className="relative h-full w-full rounded-full border border-blue-500/20 flex items-center justify-center bg-black/50 backdrop-blur-3xl overflow-hidden">
                       <div className="absolute inset-4 rounded-full border border-blue-500/10 border-dashed animate-spin-slow" />
                       <Recycle className="h-32 w-32 text-blue-500/50" />
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <h2 className="text-6xl font-black tracking-tighter mb-8 uppercase italic text-blue-400">
                      Cascade Effect
                    </h2>
                    <p className="text-2xl text-muted-foreground leading-relaxed font-light">
                      The Kessler Syndrome suggests that LEO is becoming so crowded that collisions will trigger a chain reaction, creating more debris and eventually making space travel and satellite operations impossible for generations.
                    </p>
                    <div className="mt-10 flex gap-4 justify-end">
                      <div className="h-1 w-4 bg-blue-500/10" />
                      <div className="h-1 w-8 bg-blue-500/30" />
                      <div className="h-1 w-20 bg-blue-500" />
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "map" && (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="mx-auto max-w-7xl px-6 py-32"
            >
              <div className="mb-16 text-center">
                <h2 className="text-6xl font-black tracking-tighter uppercase mb-4">Orbital Density Map</h2>
                <p className="text-xl text-muted-foreground">Real-time visualization of debris concentration across various altitude layers.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 rounded-[3rem] border border-white/10 bg-white/5 p-12 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8">
                    <Globe className="w-12 h-12 text-white/10 group-hover:text-white/30 transition-colors" />
                  </div>
                  <h3 className="text-3xl font-bold mb-12 flex items-center gap-4">
                    <BarChart3 className="text-blue-500" /> Density by Altitude
                  </h3>
                  
                  <div className="space-y-12">
                    {[
                      { layer: "LEO (Low Earth Orbit)", height: "200 - 2,000km", density: 85, color: "bg-red-500", desc: "Highest risk zone. Used for ISS and Starlink." },
                      { layer: "MEO (Medium Earth Orbit)", height: "2,000 - 35,000km", density: 12, color: "bg-yellow-500", desc: "GPS and navigation satellite zone." },
                      { layer: "GEO (Geostationary)", height: "35,786km", density: 3, color: "bg-blue-500", desc: "Telecommunications and weather satellites." }
                    ].map((row, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <p className="text-2xl font-bold">{row.layer}</p>
                            <p className="text-sm text-muted-foreground uppercase tracking-widest">{row.height}</p>
                          </div>
                          <p className="text-4xl font-black italic">{row.density}%</p>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${row.density}%` }}
                            transition={{ delay: 0.5 + i * 0.2, duration: 1.5, ease: "circOut" }}
                            className={cn("h-full rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]", row.color)} 
                          />
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground">{row.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Live Terminal Simulation */}
                  <div className="mt-16 rounded-2xl bg-black/50 p-6 font-mono text-xs text-blue-400/70 border border-white/5">
                    <div className="flex items-center gap-2 mb-4 text-white/40">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                      SYSTEM_LOG: INGESTING_NORAD_DATA...
                    </div>
                    <div className="space-y-1">
                      <p>[14:22:01] Detected fragmentation event in LEO-Sector-7G</p>
                      <p>[14:22:05] Cataloging 142 new trackable fragments</p>
                      <p>[14:22:12] Updating collision probability matrices...</p>
                      <p className="text-white/20 italic">_awaiting telemetry signal_</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="rounded-[2.5rem] border border-red-500/20 bg-red-500/5 p-10">
                    <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                      <AlertTriangle className="text-red-500" /> Top Threats
                    </h4>
                    <ul className="space-y-6">
                      {[
                        { label: "Fragmentation", val: "62%", trend: "up" },
                        { label: "Defunct Sats", val: "24%", trend: "stable" },
                        { label: "Rocket Stages", val: "14%", trend: "down" }
                      ].map((item, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <span className="text-muted-foreground">{item.label}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-red-400">{item.val}</span>
                            <div className={cn("h-1.5 w-1.5 rounded-full", item.trend === "up" ? "bg-red-500 animate-pulse" : "bg-white/20")} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10">
                    <h4 className="text-xl font-bold mb-6">Total Debris Mass</h4>
                    <p className="text-6xl font-black mb-2">9,200 <span className="text-2xl">TONS</span></p>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest">Equivalent to 400 Space Shuttles</p>
                    <div className="mt-8 h-1 w-full bg-white/5 rounded-full">
                       <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full w-2/3 bg-blue-500 rounded-full" 
                       />
                    </div>
                  </div>

                  <div className="rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white shadow-2xl shadow-blue-500/20">
                    <h4 className="text-xl font-bold mb-4">Space Traffic Control</h4>
                    <p className="text-sm opacity-80 leading-relaxed mb-6">Managing over 500,000 collision avoidance maneuvers annually.</p>
                    <Button variant="secondary" className="w-full rounded-full bg-white text-blue-600 font-bold hover:bg-white/90">
                      Download Report
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "solutions" && (
            <motion.div
              key="solutions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mx-auto max-w-7xl px-6 py-32"
            >
              <div className="mb-20">
                <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-none">Cleaning The</h2>
                <h2 className="text-7xl font-black tracking-tighter uppercase italic leading-none text-red-500">Frontier</h2>
                <p className="mt-6 text-2xl text-muted-foreground max-w-3xl">Global engineers are pioneering radical technologies to remediate our orbital environment.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SOLUTIONS.map((solution, i) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5 p-12 hover:border-white/20 transition-all hover:bg-white/[0.07]"
                  >
                    <div className={cn("absolute -top-12 -right-12 h-64 w-64 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-[80px]", solution.color)} />
                    
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white group-hover:scale-110 transition-transform duration-500">
                      {solution.icon}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">{solution.subtitle}</h4>
                      <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">{solution.title}</h3>
                      <p className="text-xl text-muted-foreground leading-relaxed mb-8">{solution.description}</p>
                      
                      <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/40">{solution.stats}</span>
                        <Button variant="ghost" className="rounded-full hover:bg-white hover:text-black font-bold uppercase tracking-wider text-xs">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-red-600 py-48 text-center px-6">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-6xl font-black tracking-tighter md:text-9xl uppercase leading-none italic">
            Protect Our <br /> Future
          </h2>
          <p className="mx-auto mt-12 max-w-2xl text-2xl font-medium text-white/90">
            Support international debris mitigation guidelines and sustainable satellite design.
          </p>
          <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-black hover:bg-white hover:text-black text-white rounded-full px-16 h-20 text-xl font-bold uppercase transition-all">
              Join the Mission
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-16 h-20 text-xl font-bold uppercase border-white/40 hover:bg-white/10">
              Donate Data
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="py-24 text-center text-muted-foreground text-sm font-mono uppercase tracking-[0.5em] border-t border-white/5 bg-black">
        Earth Orbit Monitoring System v4.0.2 // (c) 2024 Planetary Safety
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </main>
  );
}
