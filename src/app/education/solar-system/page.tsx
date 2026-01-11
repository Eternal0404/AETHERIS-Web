// src/app/education/solar-system/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Sun, 
  Circle, 
  Globe, 
  Info, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Telescope,
  Wind,
  Layers,
  Thermometer,
  Orbit,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANETS = [
  {
    id: "sun",
    name: "The Sun",
    type: "Yellow Dwarf Star",
    description: "The heart of our solar system, a nearly perfect sphere of hot plasma. It provides the energy that sustains life on Earth and drives our weather and climate.",
    details: "The Sun's core temperature reaches 15 million degrees Celsius. It accounts for 99.8% of the total mass of the solar system.",
    stats: {
      temp: "5,500°C (Surface)",
      distance: "Center",
      diameter: "1.39 Million km"
    },
    color: "from-yellow-400 to-orange-600",
    image: "https://images.unsplash.com/photo-1538370910416-a6ad66b96c71?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "mercury",
    name: "Mercury",
    type: "Terrestrial Planet",
    description: "The smallest and innermost planet. It has no atmosphere to retain heat, leading to extreme temperature fluctuations.",
    details: "Mercury is only slightly larger than Earth's Moon. It speeds around the Sun every 88 Earth days.",
    stats: {
      temp: "-173°C to 427°C",
      distance: "58 Million km",
      diameter: "4,879 km"
    },
    color: "from-gray-400 to-gray-600",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "venus",
    name: "Venus",
    type: "Terrestrial Planet",
    description: "Earth's 'evil twin' with a runaway greenhouse effect that makes it the hottest planet in our solar system.",
    details: "Its thick atmosphere traps heat, and it rotates in the opposite direction of most planets.",
    stats: {
      temp: "462°C",
      distance: "108 Million km",
      diameter: "12,104 km"
    },
    color: "from-orange-200 to-yellow-700",
    image: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "earth",
    name: "Earth",
    type: "Terrestrial Planet",
    description: "Our home, the only planet known to harbor life. It has a vast ocean of liquid water and a protective atmosphere.",
    details: "Earth is the only place in the universe where we've confirmed life exists.",
    stats: {
      temp: "-89°C to 58°C",
      distance: "150 Million km",
      diameter: "12,742 km"
    },
    color: "from-blue-400 to-green-500",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bc46?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "mars",
    name: "Mars",
    type: "Terrestrial Planet",
    description: "The Red Planet. A dusty, cold, desert world with a very thin atmosphere and evidence of ancient water.",
    details: "Home to Olympus Mons, the largest volcano in the solar system, and Valles Marineris, a massive canyon system.",
    stats: {
      temp: "-153°C to 20°C",
      distance: "228 Million km",
      diameter: "6,779 km"
    },
    color: "from-red-500 to-orange-800",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "Gas Giant",
    description: "The king of planets. More than twice as massive as all the other planets combined.",
    details: "Famous for its Great Red Spot, a storm larger than Earth that has raged for centuries.",
    stats: {
      temp: "-110°C",
      distance: "778 Million km",
      diameter: "139,820 km"
    },
    color: "from-orange-300 to-red-400",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "Gas Giant",
    description: "Adorned with a dazzling system of icy rings, Saturn is a unique jewel in our solar system.",
    details: "It's the least dense planet—so light it would float in a giant bathtub of water.",
    stats: {
      temp: "-140°C",
      distance: "1.4 Billion km",
      diameter: "116,460 km"
    },
    color: "from-yellow-200 to-amber-500",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bc46?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "Ice Giant",
    description: "An ice giant that rotates on its side. It has a blue-green tint due to methane in its atmosphere.",
    details: "Uranus was the first planet found with the aid of a telescope in 1781.",
    stats: {
      temp: "-195°C",
      distance: "2.9 Billion km",
      diameter: "50,724 km"
    },
    color: "from-cyan-300 to-blue-400",
    image: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "Ice Giant",
    description: "The most distant major planet orbiting our Sun. It is dark, cold, and whipped by supersonic winds.",
    details: "It was the first planet located through mathematical calculations rather than direct observation.",
    stats: {
      temp: "-201°C",
      distance: "4.5 Billion km",
      diameter: "49,244 km"
    },
    color: "from-blue-600 to-indigo-900",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2000"
  }
];

const OTHER_BODIES = [
  {
    name: "Asteroid Belt",
    desc: "A region between Mars and Jupiter filled with rocky fragments left over from the early solar system.",
    icon: <Circle className="h-5 w-5" />
  },
  {
    name: "Kuiper Belt",
    desc: "An icy region beyond Neptune, home to dwarf planets like Pluto and Eris.",
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    name: "Oort Cloud",
    desc: "The most distant region of our solar system, a giant spherical shell surrounding everything else.",
    icon: <Globe className="h-5 w-5" />
  }
];

export default function SolarSystemPage() {
  const [activePlanet, setActivePlanet] = React.useState(PLANETS[0]);
  const { scrollYProgress } = useScroll();
  
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-yellow-500/30 font-sans overflow-x-hidden">
      <Navbar />

      {/* Interactive Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
             className="absolute inset-[-50%] border-[1px] border-white/5 rounded-full"
           />
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
             className="absolute inset-[-20%] border-[1px] border-white/5 rounded-full"
           />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-6 py-2 text-sm font-bold uppercase tracking-widest text-yellow-400 backdrop-blur-md"
          >
            <Orbit className="h-4 w-4 animate-spin-slow" />
            Solar System Explorer
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-8"
          >
            Our Cosmic <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">NEIGHBORHOOD</span>
          </motion.h1>
          <motion.p
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-xl md:text-2xl text-white/60 font-light max-w-2xl mx-auto"
          >
            Explore the vast expanses of our solar system, from the scorching surface of the Sun to the icy reaches of the Oort Cloud.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Interactive Planet Browser */}
      <section className="relative z-10 py-32 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Left: Navigation List */}
            <div className="w-full lg:w-1/3 space-y-2">
              <h2 className="text-sm font-black uppercase tracking-[0.5em] text-white/40 mb-8">Celestial Catalog</h2>
              {PLANETS.map((planet) => (
                <button
                  key={planet.id}
                  onClick={() => setActivePlanet(planet)}
                  className={cn(
                    "w-full group flex items-center justify-between p-6 rounded-2xl transition-all border",
                    activePlanet.id === planet.id 
                      ? "bg-white/10 border-white/20 shadow-2xl scale-[1.02]" 
                      : "bg-transparent border-transparent hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("h-3 w-3 rounded-full bg-gradient-to-br shadow-[0_0_15px_rgba(255,255,255,0.5)]", planet.color)} />
                    <span className={cn(
                      "text-xl font-bold uppercase tracking-tighter transition-colors",
                      activePlanet.id === planet.id ? "text-white" : "text-white/40 group-hover:text-white/70"
                    )}>
                      {planet.name}
                    </span>
                  </div>
                  <ChevronRight className={cn(
                    "h-5 w-5 transition-transform",
                    activePlanet.id === planet.id ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  )} />
                </button>
              ))}
            </div>

            {/* Right: Detailed View */}
            <div className="flex-1 min-h-[600px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlanet.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/5 rounded-[3rem] border border-white/10 p-8 md:p-12 relative overflow-hidden h-full"
                >
                  <div className="relative z-10 grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                          <Zap className="h-3 w-3" />
                          {activePlanet.type}
                        </div>
                        <h3 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6">{activePlanet.name}</h3>
                        <p className="text-xl text-white/70 leading-relaxed italic">
                          "{activePlanet.description}"
                        </p>
                      </div>

                      <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
                        <p className="text-white/60 leading-relaxed">
                          {activePlanet.details}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <Thermometer className="h-4 w-4 text-red-400 mb-2" />
                          <div className="text-[10px] uppercase font-bold text-white/40">Temperature</div>
                          <div className="text-sm font-mono font-bold">{activePlanet.stats.temp}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <Orbit className="h-4 w-4 text-blue-400 mb-2" />
                          <div className="text-[10px] uppercase font-bold text-white/40">Distance</div>
                          <div className="text-sm font-mono font-bold">{activePlanet.stats.distance}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <Globe className="h-4 w-4 text-green-400 mb-2" />
                          <div className="text-[10px] uppercase font-bold text-white/40">Diameter</div>
                          <div className="text-sm font-mono font-bold">{activePlanet.stats.diameter}</div>
                        </div>
                      </div>
                    </div>

                    <div className="relative aspect-square rounded-[2rem] overflow-hidden group">
                      <img 
                        src={activePlanet.image} 
                        alt={activePlanet.name}
                        className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                      />
                      <div className={cn("absolute inset-0 bg-gradient-to-t opacity-40 mix-blend-overlay", activePlanet.color)} />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                  </div>

                  {/* Background Decoration */}
                  <div className={cn("absolute -right-20 -bottom-20 w-96 h-96 blur-[150px] opacity-20 transition-all duration-1000 bg-gradient-to-br", activePlanet.color)} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond the Planets */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 italic">Beyond the Spheres</h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">Our solar system is more than just planets. It is a complex ecosystem of debris, ice, and mysterious structures.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {OTHER_BODIES.map((body, i) => (
            <motion.div
              key={body.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                {body.icon}
              </div>
              <h4 className="text-2xl font-bold uppercase mb-4">{body.name}</h4>
              <p className="text-white/60 leading-relaxed mb-6">{body.desc}</p>
              <Link href="#" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-400 hover:gap-4 transition-all">
                Learn More <ArrowRight className="h-3 w-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visual Infographic (simplified) */}
      <section className="relative h-[600px] w-full overflow-hidden bg-black flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none opacity-20">
           {[...Array(5)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"
               style={{ 
                 width: (i + 1) * 200, 
                 height: (i + 1) * 200 
               }}
               animate={{ rotate: 360 }}
               transition={{ duration: (i + 1) * 20, repeat: Infinity, ease: "linear" }}
             />
           ))}
        </div>
        
        <div className="relative z-10 text-center space-y-8">
          <Telescope className="h-16 w-16 text-white/20 mx-auto animate-pulse" />
          <h2 className="text-4xl font-black uppercase tracking-tighter">A Never-Ending Journey</h2>
          <p className="text-white/40 max-w-lg">Every day, we learn more about our celestial home. The data provided here reflects the most recent consensus from the global scientific community.</p>
          <Button variant="outline" className="rounded-full px-12 uppercase font-bold tracking-widest border-white/20 hover:bg-white/10">
            View Research Papers
          </Button>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-blue-900/20 text-center">
        <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter">Back to the Academy?</h3>
        <Link href="/education">
          <Button size="lg" className="rounded-full px-12 h-16 font-black uppercase tracking-tighter text-lg">
            Return to Hub
          </Button>
        </Link>
      </section>

      <footer className="py-12 text-center text-muted-foreground text-xs font-mono uppercase tracking-[0.5em] border-t border-white/5 bg-black">
        Aetheris Planetary Systems // Ver 2.4.0
      </footer>
    </main>
  );
}
