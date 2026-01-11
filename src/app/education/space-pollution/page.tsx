// src/app/education/space-pollution/page.tsx
"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { EarthPollutionModel } from "@/components/earth-pollution-model";
import { ScrambleIn } from "@/components/scramble-in";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Zap, Activity, Info, AlertTriangle, Recycle, Target, Waves, Search, BarChart3, Globe, Layers, Clock, TrendingUp, Filter, Database, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase";

const SOLUTIONS = [
  {
    id: "clearspace",
    title: "ClearSpace-1",
    subtitle: "Active Debris Removal",
    description: "The world's first mission to remove a piece of space debris from orbit. Using a 'chaser' satellite with four robotic arms to grab and de-orbit spent rocket stages.",
    icon: <Target className="h-6 w-6" />,
    color: "bg-blue-500",
    stats: "Launch: 2026 | Target: Vespa Payload Adapter"
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
    stats: "Status: Ongoing Flight Tests"
  },
  {
    id: "drag",
    title: "Plasma Brake",
    subtitle: "Micro-Tether Propulsion",
    description: "A propulsion-less system that uses a long, thin conducting tether to interact with Earth's ionosphere, creating electromagnetic drag to safely lower satellite altitude.",
    icon: <Activity className="h-6 w-6" />,
    color: "bg-purple-500",
    stats: "Efficiency: 400% vs Chemical"
  },
  {
    id: "recycling",
    title: "In-Orbit Factory",
    subtitle: "Orbital Manufacturing",
    description: "Transforming junk into resources. Using robotic arms to collect debris and solar-powered furnaces to melt it into raw materials for 3D printing in space.",
    icon: <Layers className="h-6 w-6" />,
    color: "bg-cyan-500",
    stats: "Prototype: TRL-4"
  }
];

const HISTORICAL_EVENTS = [
  { year: "1957", event: "Sputnik 1 Launch", desc: "Start of human-made objects in orbit.", type: "milestone" },
  { year: "1996", event: "Cerise Collision", desc: "First verified collision between two catalogued objects. A French satellite hit by a piece of an Ariane rocket.", type: "collision" },
  { year: "2007", event: "Fengyun-1C Test", desc: "Chinese ASAT test created over 3,000 tracked fragments, the largest debris event in history.", type: "explosion" },
  { year: "2009", event: "Iridium-Kosmos", desc: "First major hypervelocity collision between two intact satellites (Iridium 33 and Kosmos 2251).", type: "collision" },
  { year: "2021", event: "Russian ASAT Test", desc: "Destruction of Cosmos 1408 created a debris cloud forcing ISS crew to take shelter.", type: "explosion" },
  { year: "2024", event: "Resurs-P Fragmentation", desc: "Decommissioned Russian satellite broke up into 100+ tracked pieces in LEO.", type: "fragmentation" }
];

const DEBRIS_TYPES = [
  { label: "Defunct Satellites", val: "9,100+", desc: "Satellites that have reached end-of-life but remain in orbit.", icon: <Globe className="w-5 h-5" /> },
  { label: "Rocket Stages", val: "2,000+", desc: "Spent upper stages used to launch payloads into orbit.", icon: <TrendingUp className="w-5 h-5" /> },
  { label: "Mission Related", val: "12,000+", desc: "Nuts, bolts, and lens caps released during deployment.", icon: <Filter className="w-5 h-5" /> },
  { label: "Fragmentation", val: "26,000+", desc: "Pieces created by explosions and collisions.", icon: <Zap className="w-5 h-5" /> }
];

const TRACKING_SYSTEMS = [
  {
    name: "SSN (Space Surveillance Network)",
    desc: "A worldwide network of 30+ ground-based radar and optical sensors operated by the US Space Force.",
    capability: "Tracks objects > 10cm"
  },
  {
    name: "ESA SDM (Space Debris Mind)",
    desc: "European database providing high-fidelity models for debris environment prediction.",
    capability: "Predictive modeling"
  },
  {
    name: "LEO Fence",
    desc: "Advanced S-band radar systems designed to detect and track small objects in Low Earth Orbit.",
    capability: "Increased sensitivity"
  }
];

export default function SpacePollutionPage() {
  const [activeTab, setActiveTab] = React.useState<"overview" | "solutions" | "map" | "live">("overview");
  const [debrisData, setDebrisData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const supabase = createClient();

  React.useEffect(() => {
    if (activeTab === "live") {
      fetchDebris();
    }
  }, [activeTab]);

  const fetchDebris = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orbital_debris')
        .select('*')
        .order('risk_factor', { ascending: false });
      
      if (error) throw error;
      setDebrisData(data || []);
    } catch (error) {
      console.error("Error fetching debris:", error);
      // Fallback data
      setDebrisData([
        { id: 1, object_name: 'Vanguard 1', object_type: 'Satellite', altitude_km: 650, density_profile: 'LEO', risk_factor: 0.15 },
        { id: 2, object_name: 'Cosmos 2251 Fragment', object_type: 'Debris', altitude_km: 780, density_profile: 'LEO', risk_factor: 0.85 },
        { id: 3, object_name: 'Iridium 33 Fragment', object_type: 'Debris', altitude_km: 780, density_profile: 'LEO', risk_factor: 0.82 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-red-500/30 font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Hero 3D Section */}
      <section className="relative h-[80vh] md:h-[85vh] w-full pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EarthPollutionModel />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        </div>
        
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-32 md:pb-40 px-6 pointer-events-none">
          <ScrambleIn delay={0.5} stagger={0.1} className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/10 px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest text-red-500 backdrop-blur-sm"
            >
              <Activity className="h-3 w-3 animate-pulse" />
              Orbital Risk: Critical (ESA Index 4/1)
            </motion.div>
            <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-9xl lg:text-[11rem] leading-none uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
              ORBITAL
            </h1>
            <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-9xl lg:text-[11rem] leading-none uppercase -mt-2 md:-mt-4 text-transparent bg-clip-text bg-gradient-to-t from-red-600 to-red-400">
              DEBRIS
            </h1>
          </ScrambleIn>
        </div>

        {/* Navigation Tabs - Responsive Layout */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full w-[95%] md:w-auto overflow-x-auto no-scrollbar">
          {[
            { id: "overview", label: "Overview", icon: <Search className="w-4 h-4" /> },
            { id: "map", label: "Data Map", icon: <Layers className="w-4 h-4" /> },
            { id: "live", label: "Live Stats", icon: <Database className="w-4 h-4" /> },
            { id: "solutions", label: "Solutions", icon: <Target className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "relative flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 text-[10px] md:text-sm font-bold uppercase tracking-wider transition-all rounded-full flex-shrink-0",
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
              <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-32">
                <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
                  {[
                    { val: "35,000", label: "Tracked Objects", desc: "Objects larger than 10cm catalogued by Space Surveillance Networks.", icon: <Activity />, color: "border-red-500/20 bg-red-500/5" },
                    { val: "140M", label: "Lethal Fragments", desc: "Pieces from 1mm to 1cm orbiting at hypervelocity (28,000 km/h).", icon: <Zap />, color: "border-white/10 bg-white/5" },
                    { val: "9,200t", label: "Orbital Mass", desc: "Total mass of all human-made objects currently in Earth orbit.", icon: <Shield />, color: "border-white/10 bg-white/5" }
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={cn("rounded-2xl md:rounded-3xl border p-6 md:p-10 backdrop-blur-md hover:border-white/20 transition-colors group", stat.color)}
                    >
                      <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-white/5 text-white group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-2">{stat.val}</h3>
                      <p className="text-lg md:text-xl font-bold mb-4 uppercase tracking-tighter text-white/80">{stat.label}</p>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{stat.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Debris Types Grid */}
              <section className="mx-auto max-w-7xl px-4 md:px-6 pb-16 md:pb-32">
                <div className="mb-10 md:mb-16">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic border-l-4 border-red-500 pl-4 md:pl-6">Anatomy of the Junkyard</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {DEBRIS_TYPES.map((type, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-5 md:p-6 hover:bg-white/10 transition-colors">
                      <div className="text-red-500 mb-3 md:mb-4">{type.icon}</div>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{type.label}</p>
                      <p className="text-xl md:text-2xl font-black mb-2">{type.val}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{type.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Technical Tracking Info */}
              <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-32 bg-white/[0.02] border-y border-white/5">
                <div className="grid md:grid-cols-3 gap-12">
                   <div className="md:col-span-1">
                      <h2 className="text-4xl font-black tracking-tighter uppercase italic mb-6">How we Track</h2>
                      <p className="text-lg text-muted-foreground">Monitoring millions of fragments moving 10x faster than a bullet requires global coordination and advanced physics.</p>
                   </div>
                   <div className="md:col-span-2 grid sm:grid-cols-3 gap-6">
                      {TRACKING_SYSTEMS.map((sys, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-white/10 bg-black">
                           <h4 className="font-bold text-red-500 mb-2">{sys.name}</h4>
                           <p className="text-xs text-muted-foreground mb-4">{sys.desc}</p>
                           <div className="text-[10px] font-mono text-white/40 uppercase bg-white/5 p-2 rounded">{sys.capability}</div>
                        </div>
                      ))}
                   </div>
                </div>
              </section>

              {/* Educational Content */}
              <section className="mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-32 space-y-32 md:space-y-48">
                <div className="grid gap-12 md:gap-20 md:grid-cols-2 items-center">
                  <div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter flex items-center gap-4 md:gap-6 mb-6 md:mb-8 uppercase italic">
                      The Junk Problem
                    </h2>
                    <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-light">
                      Space debris is any human-made object in orbit around Earth that no longer serves a useful function. Even a tiny 1cm fragment carries the energy of a hand grenade at orbital speeds, capable of mission-ending damage to satellites and space stations.
                    </p>
                    <div className="mt-8 md:mt-10 flex gap-4">
                      <div className="h-1 w-16 md:w-20 bg-red-500" />
                      <div className="h-1 w-6 md:w-8 bg-red-500/30" />
                      <div className="h-1 w-3 md:w-4 bg-red-500/10" />
                    </div>
                  </div>
                  <div className="relative aspect-square max-w-[400px] mx-auto w-full">
                    <div className="absolute inset-0 bg-red-500/10 blur-[60px] md:blur-[100px] animate-pulse" />
                    <div className="relative h-full w-full rounded-full border border-red-500/20 flex items-center justify-center bg-black/50 backdrop-blur-3xl overflow-hidden">
                       <div className="absolute inset-4 rounded-full border border-red-500/10 border-dashed animate-spin-slow" />
                       <AlertTriangle className="h-20 w-20 md:h-32 md:w-32 text-red-500/50" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-12 md:gap-20 md:grid-cols-2 items-center">
                  <div className="order-2 md:order-1 relative aspect-square max-w-[400px] mx-auto w-full">
                    <div className="absolute inset-0 bg-blue-500/10 blur-[60px] md:blur-[100px] animate-pulse" />
                    <div className="relative h-full w-full rounded-full border border-blue-500/20 flex items-center justify-center bg-black/50 backdrop-blur-3xl overflow-hidden">
                       <div className="absolute inset-4 rounded-full border border-blue-500/10 border-dashed animate-spin-slow" />
                       <Recycle className="h-20 w-20 md:h-32 md:w-32 text-blue-500/50" />
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 md:mb-8 uppercase italic text-blue-400">
                      Cascade Effect
                    </h2>
                    <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-light">
                      The Kessler Syndrome warns that the density of objects in LEO could become high enough that collisions trigger a chain reaction. This self-sustaining debris generation could eventually render critical orbits unusable, cutting off global GPS, weather monitoring, and communications.
                    </p>
                    <div className="mt-8 md:mt-10 flex gap-4 justify-end">
                      <div className="h-1 w-3 md:w-4 bg-blue-500/10" />
                      <div className="h-1 w-6 md:w-8 bg-blue-500/30" />
                      <div className="h-1 w-16 md:w-20 bg-blue-500" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Sustainability Section */}
              <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-32">
                 <div className="rounded-[2rem] md:rounded-[3rem] bg-gradient-to-r from-red-950 to-black border border-red-500/20 p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[120px] -mr-32 -mt-32" />
                    <div className="relative z-10 grid md:grid-cols-2 gap-12">
                       <div>
                          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">International Policy</h2>
                          <p className="text-muted-foreground mb-8">The IADC (Inter-Agency Space Debris Coordination Committee) has established critical guidelines for debris mitigation:</p>
                          <ul className="space-y-4">
                             {[
                                "25-Year Rule: Post-mission de-orbiting required",
                                "Passivation: Depletion of all energy sources (fuel, batteries)",
                                "Avoidance: Active collision avoidance maneuvers",
                                "Graveyard Orbits: Re-locating GEO satellites after EOL"
                             ].map((rule, i) => (
                                <li key={i} className="flex items-start gap-3">
                                   <div className="h-5 w-5 rounded-full bg-red-500 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">✓</div>
                                   <span className="text-sm md:text-base font-medium">{rule}</span>
                                </li>
                             ))}
                          </ul>
                       </div>
                       <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="font-bold mb-4 flex items-center gap-2"><Info className="w-4 h-4 text-red-500" /> Space Sustainability Rating</h4>
                          <p className="text-sm text-muted-foreground mb-6">A new initiative to incentivize operators to design for disposal and share tracking data. High-rated satellites get insurance discounts and regulatory priority.</p>
                          <div className="h-2 w-full bg-white/5 rounded-full mb-2">
                             <div className="h-full w-[65%] bg-green-500 rounded-full" />
                          </div>
                          <div className="flex justify-between text-[10px] font-mono uppercase text-white/40">
                             <span>Current Industry Compliance: ~65%</span>
                             <span>Target: 100%</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </section>

              {/* Timeline Section */}
              <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-32 border-t border-white/5">
                <div className="mb-12 md:mb-20 text-center">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4">Collision Timeline</h2>
                  <p className="text-lg md:text-xl text-muted-foreground">Key events that shaped our current orbital environment.</p>
                </div>
                <div className="relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
                  <div className="space-y-10 md:space-y-12">
                    {HISTORICAL_EVENTS.map((event, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={cn("flex flex-col md:flex-row items-center gap-6 md:gap-8", i % 2 === 0 ? "md:flex-row-reverse md:text-right" : "")}
                      >
                        <div className="flex-1 w-full">
                          <span className="text-xs md:text-sm font-mono text-red-500 font-bold mb-1 md:mb-2 block">{event.year}</span>
                          <h4 className="text-2xl md:text-3xl font-black uppercase mb-3 md:mb-4">{event.event}</h4>
                          <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto md:mx-0">{event.desc}</p>
                        </div>
                        <div className="relative z-10 h-3 w-3 md:h-4 md:w-4 rounded-full bg-red-500 ring-4 md:ring-8 ring-red-500/20" />
                        <div className="flex-1 hidden md:block" />
                      </motion.div>
                    ))}
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
              className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-32"
            >
              <div className="mb-12 md:mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Orbital Density Map</h2>
                <p className="text-lg md:text-xl text-muted-foreground">Real-time visualization of debris concentration across various altitude layers.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-2 rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-white/5 p-6 md:p-12 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-4 md:p-8">
                    <Globe className="w-8 h-8 md:w-12 md:h-12 text-white/10 group-hover:text-white/30 transition-colors" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-4">
                    <BarChart3 className="text-blue-500" /> Density by Altitude
                  </h3>
                  
                  <div className="space-y-8 md:space-y-12">
                    {[
                      { layer: "LEO (Low Earth Orbit)", height: "200 - 2,000km", density: 85, color: "bg-red-500", desc: "Highest risk zone. Critical density at 550km where satellites expect 30 conjunctions/year." },
                      { layer: "MEO (Medium Earth Orbit)", height: "2,000 - 35,000km", density: 12, color: "bg-yellow-500", desc: "GPS and navigation satellite zone. Relatively stable but growing." },
                      { layer: "GEO (Geostationary)", height: "35,786km", density: 3, color: "bg-blue-500", desc: "Telecommunications zone. Strict 'Graveyard Orbit' protocols required." }
                    ].map((row, i) => (
                      <div key={i} className="relative">
                        <div className="flex justify-between items-end mb-3 md:mb-4">
                          <div>
                            <p className="text-xl md:text-2xl font-bold">{row.layer}</p>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">{row.height}</p>
                          </div>
                          <p className="text-3xl md:text-4xl font-black italic">{row.density}%</p>
                        </div>
                        <div className="h-3 md:h-4 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${row.density}%` }}
                            transition={{ delay: 0.5 + i * 0.2, duration: 1.5, ease: "circOut" }}
                            className={cn("h-full rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)]", row.color)} 
                          />
                        </div>
                        <p className="mt-3 md:mt-4 text-xs md:text-sm text-muted-foreground">{row.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Live Terminal Simulation */}
                  <div className="mt-10 md:mt-16 rounded-xl md:rounded-2xl bg-black/50 p-4 md:p-6 font-mono text-[10px] md:text-xs text-blue-400/70 border border-white/5">
                    <div className="flex items-center gap-2 mb-3 md:mb-4 text-white/40">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                      SYSTEM_LOG: INGESTING_ESA_REPORT_2025...
                    </div>
                    <div className="space-y-1">
                      <p>[14:22:01] Detected Resurs-P fragmentation in LEO-Sector-7G</p>
                      <p>[14:22:05] Cataloging 100+ new trackable fragments</p>
                      <p>[14:22:12] Updating health index from MASTER-8 model...</p>
                      <p className="text-white/20 italic">_telemetry stream stabilized_</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <div className="rounded-[1.5rem] md:rounded-[2.5rem] border border-red-500/20 bg-red-500/5 p-6 md:p-10">
                    <h4 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3">
                      <AlertTriangle className="text-red-500" /> Risk Factors
                    </h4>
                    <ul className="space-y-4 md:space-y-6">
                      {[
                        { label: "Propulsion Failures", val: "37%", trend: "up" },
                        { label: "ASAT Tests", val: "22%", trend: "stable" },
                        { label: "Collisions", val: "15%", trend: "up" },
                        { label: "Anomalous breakup", val: "26%", trend: "down" }
                      ].map((item, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <span className="text-xs md:text-sm text-muted-foreground">{item.label}</span>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-red-400 text-xs md:text-sm">{item.val}</span>
                            <div className={cn("h-1 w-1 md:h-1.5 md:w-1.5 rounded-full", item.trend === "up" ? "bg-red-500 animate-pulse" : "bg-white/20")} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.5rem] md:rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-10">
                    <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-3">
                      <Recycle className="text-emerald-500" /> Re-entry Success
                    </h4>
                    <p className="text-4xl md:text-6xl font-black mb-2">3+ <span className="text-xl md:text-2xl uppercase italic">Daily</span></p>
                    <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest leading-relaxed">Average rate of objects (satellites or rocket bodies) re-entering the atmosphere in 2024.</p>
                  </div>

                  <div className="rounded-[1.5rem] md:rounded-[2.5rem] bg-gradient-to-br from-red-600 to-red-800 p-6 md:p-10 text-white shadow-2xl shadow-red-500/20">
                    <h4 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2"><Activity className="w-5 h-5" /> Orbital Health Index</h4>
                    <p className="text-4xl md:text-5xl font-black mb-4">4 / 1</p>
                    <p className="text-xs md:text-sm opacity-80 leading-relaxed mb-6">ESA metric for sustainability. Level 1 is the threshold for long-term stability. We are currently 4x above the safety limit.</p>
                    <Button variant="secondary" className="w-full rounded-full bg-white text-red-600 font-bold hover:bg-white/90 text-xs md:text-sm py-5 md:py-6">
                      View ESA Report
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "live" && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-32"
            >
              <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 italic">Live Telemetry</h2>
                  <p className="text-lg md:text-xl text-muted-foreground">Streaming data from the Aetheris Orbital Monitoring System.</p>
                </div>
                <Button onClick={fetchDebris} disabled={loading} className="rounded-full h-12 px-6 gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Clock className="w-4 h-4" />}
                  Refresh Sync
                </Button>
              </div>

              <div className="glass rounded-[2rem] md:rounded-[3rem] border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/5">
                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/40">Object Name</th>
                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/40">Type</th>
                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/40">Altitude</th>
                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/40">Density</th>
                        <th className="px-6 md:px-10 py-6 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/40 text-right">Risk Index</th>
                      </tr>
                    </thead>
                    <tbody>
                      {debrisData.map((obj, i) => (
                        <motion.tr 
                          key={obj.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-6 md:px-10 py-6 font-bold text-sm md:text-base">{obj.object_name}</td>
                          <td className="px-6 md:px-10 py-6">
                            <span className={cn(
                              "text-[10px] font-mono px-2 py-1 rounded-md",
                              obj.object_type === 'Satellite' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-400'
                            )}>
                              {obj.object_type}
                            </span>
                          </td>
                          <td className="px-6 md:px-10 py-6 text-sm font-mono text-white/60">{obj.altitude_km}km</td>
                          <td className="px-6 md:px-10 py-6 text-sm font-bold text-white/80">{obj.density_profile}</td>
                          <td className="px-6 md:px-10 py-6 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden hidden md:block">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${obj.risk_factor * 100}%` }}
                                  className={cn("h-full", obj.risk_factor > 0.7 ? "bg-red-500" : "bg-blue-500")}
                                />
                              </div>
                              <span className={cn(
                                "font-mono font-bold text-xs md:text-sm",
                                obj.risk_factor > 0.7 ? "text-red-500" : "text-blue-500"
                              )}>
                                {obj.risk_factor.toFixed(2)}
                              </span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-[10px] md:text-xs font-mono text-white/20 uppercase tracking-[0.3em]">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                Live Data Stream Active // Source: ESA/Space-Force-SSN
              </div>
            </motion.div>
          )}

          {activeTab === "solutions" && (
            <motion.div
              key="solutions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-32"
            >
              <div className="mb-12 md:mb-20">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">Cleaning The</h2>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none text-red-500">Frontier</h2>
                <p className="mt-4 md:mt-6 text-lg md:text-2xl text-muted-foreground max-w-3xl">Global engineers are pioneering radical technologies to remediate our orbital environment.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {SOLUTIONS.map((solution, i) => (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-white/5 p-8 md:p-12 hover:border-white/20 transition-all hover:bg-white/[0.07]"
                  >
                    <div className={cn("absolute -top-12 -right-12 h-64 w-64 rounded-full opacity-0 group-hover:opacity-10 transition-opacity blur-[80px]", solution.color)} />
                    
                    <div className="mb-6 md:mb-8 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-white/10 text-white group-hover:scale-110 transition-transform duration-500">
                      {solution.icon}
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-muted-foreground mb-2">{solution.subtitle}</h4>
                      <h3 className="text-2xl md:text-4xl font-black mb-4 md:mb-6 uppercase tracking-tighter">{solution.title}</h3>
                      <p className="text-base md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8">{solution.description}</p>
                      
                      <div className="pt-6 md:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">{solution.stats}</span>
                        <Button variant="ghost" className="w-full sm:w-auto rounded-full hover:bg-white hover:text-black font-bold uppercase tracking-wider text-[10px] md:text-xs">
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
      <section className="relative overflow-hidden bg-red-600 py-32 md:py-48 text-center px-4 md:px-6">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-none italic">
            Protect Our <br className="hidden sm:block" /> Future
          </h2>
          <p className="mx-auto mt-8 md:mt-12 max-w-2xl text-lg md:text-2xl font-medium text-white/90">
            Support international debris mitigation guidelines and sustainable satellite design.
          </p>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Button size="lg" className="bg-black hover:bg-white hover:text-black text-white rounded-full px-8 md:px-16 h-16 md:h-20 text-lg md:text-xl font-bold uppercase transition-all">
              Join the Mission
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 md:px-16 h-16 md:h-20 text-lg md:text-xl font-bold uppercase border-white/40 hover:bg-white/10">
              Donate Data
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 md:py-24 text-center text-muted-foreground text-[10px] md:text-sm font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] border-t border-white/5 bg-black px-4">
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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-red-600 py-32 md:py-48 text-center px-4 md:px-6">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-none italic">
            Protect Our <br className="hidden sm:block" /> Future
          </h2>
          <p className="mx-auto mt-8 md:mt-12 max-w-2xl text-lg md:text-2xl font-medium text-white/90">
            Support international debris mitigation guidelines and sustainable satellite design.
          </p>
          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Button size="lg" className="bg-black hover:bg-white hover:text-black text-white rounded-full px-8 md:px-16 h-16 md:h-20 text-lg md:text-xl font-bold uppercase transition-all">
              Join the Mission
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 md:px-16 h-16 md:h-20 text-lg md:text-xl font-bold uppercase border-white/40 hover:bg-white/10">
              Donate Data
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 md:py-24 text-center text-muted-foreground text-[10px] md:text-sm font-mono uppercase tracking-[0.3em] md:tracking-[0.5em] border-t border-white/5 bg-black px-4">
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
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
