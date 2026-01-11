// src/app/education/nasa-missions/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Target, 
  Star, 
  Award, 
  Zap, 
  Users, 
  Telescope, 
  Globe, 
  Info, 
  ArrowRight, 
  Sparkles,
  Search,
  Cpu,
  Shield,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MISSIONS = [
  {
    id: "artemis",
    title: "Artemis Program",
    subtitle: "Moon to Mars",
    description: "NASA's most ambitious human spaceflight program since Apollo. Artemis aims to land the first woman and first person of color on the Moon, establishing a sustainable presence to prepare for the first human mission to Mars.",
    deepDive: "The program utilizes the Space Launch System (SLS), the most powerful rocket ever built, and the Orion spacecraft. It involves international partners and commercial companies to build the Lunar Gateway and human landing systems.",
    icon: <Rocket className="h-6 w-6" />,
    stats: "Next Launch: 2025 (Artemis II)",
    technical: [
      { label: "Rocket", value: "SLS Block 1" },
      { label: "Crew Capacity", value: "4 Astronauts" },
      { label: "Destination", value: "Lunar South Pole" }
    ],
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=2070",
    color: "bg-blue-600"
  },
  {
    id: "jwst",
    title: "James Webb",
    subtitle: "Unfolding the Universe",
    description: "The premier observatory of the next decade. Webb is solving mysteries in our solar system, looking beyond to distant worlds around other stars, and probing the mysterious structures and origins of our universe.",
    deepDive: "Webb's primary mirror is 6.5 meters across, composed of 18 hexagonal segments coated in gold. It operates at temperatures near absolute zero to detect the faint infrared glow from the earliest galaxies.",
    icon: <Telescope className="h-6 w-6" />,
    stats: "Distance: 1.5M km (L2 Point)",
    technical: [
      { label: "Mirror Size", value: "6.5 Meters" },
      { label: "Wavelengths", value: "Infrared" },
      { label: "Orbit", value: "Sun-Earth L2" }
    ],
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2000",
    color: "bg-amber-600"
  },
  {
    id: "perseverance",
    title: "Perseverance Rover",
    subtitle: "Seeking Life on Mars",
    description: "Currently exploring Jezero Crater, searching for signs of ancient microbial life, and collecting samples of rock and regolith for a future return to Earth.",
    deepDive: "Equipped with 19 cameras and 7 scientific instruments, Perseverance is the most sophisticated rover ever sent to Mars. It also carried the Ingenuity helicopter, the first aircraft to fly on another planet.",
    icon: <Target className="h-6 w-6" />,
    stats: "Landed: Feb 18, 2021",
    technical: [
      { label: "Weight", value: "1,025 kg" },
      { label: "Power", value: "MMRTG (Nuclear)" },
      { label: "Instruments", value: "7 Primary" }
    ],
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=2000",
    color: "bg-red-600"
  }
];

const ACHIEVEMENTS = [
  { year: "1969", title: "Apollo 11", desc: "First humans on the Moon. 'One small step for man, one giant leap for mankind.'", icon: <Star /> },
  { year: "1977", title: "Voyager 1 & 2", desc: "Grand tour of the outer planets. Voyager 1 is the first human-made object to enter interstellar space.", icon: <Globe /> },
  { year: "1990", title: "Hubble Telescope", desc: "The 'People's Telescope' revolutionized our understanding of the universe's age and expansion.", icon: <Sparkles /> },
  { year: "2011", title: "Curiosity Rover", desc: "Landed in Gale Crater to investigate Martian habitability and geology.", icon: <Target /> },
  { year: "2021", title: "Ingenuity", desc: "First powered, controlled flight on another planet. A 'Wright Brothers moment' on Mars.", icon: <Zap /> }
];

const QUICK_FACTS = [
  { title: "Budget", value: "$25.4B", desc: "NASA's annual budget for FY 2024.", icon: <Zap /> },
  { title: "Personnel", value: "18,000+", desc: "Dedicated scientists, engineers, and staff.", icon: <Users /> },
  { title: "Centres", value: "10", desc: "Major field centers across the United States.", icon: <Globe /> },
  { title: "Patents", value: "1,000+", desc: "NASA tech used in everyday life on Earth.", icon: <Cpu /> }
];

export default function NasaMissionsPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072" 
            alt="Space"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 backdrop-blur-sm"
          >
            <Sparkles className="h-3 w-3" />
            NASA Missions Archive
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8"
          >
            THE NASA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">EXPERIENCE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-light mb-12"
          >
            A comprehensive exploration of NASA's most ambitious endeavors, technical achievements, and future roadmap.
          </motion.p>
        </div>
      </section>

      {/* Quick Facts Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {QUICK_FACTS.map((fact, i) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center md:text-left"
            >
              <div className="text-blue-500 mb-4 flex justify-center md:justify-start">{fact.icon}</div>
              <div className="text-3xl md:text-4xl font-black tracking-tighter mb-1">{fact.value}</div>
              <div className="text-xs font-bold uppercase text-white/40 tracking-widest mb-2">{fact.title}</div>
              <p className="text-sm text-white/60">{fact.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Missions Section */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic border-l-8 border-blue-600 pl-8 mb-6">Flagship Operations</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">Deep dive into the current cornerstones of NASA's exploration strategy.</p>
        </div>

        <div className="space-y-48">
          {MISSIONS.map((mission, i) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "flex flex-col gap-16",
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              )}
            >
              <div className="flex-1 space-y-8">
                <div className={cn("inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white", mission.color)}>
                  {mission.icon}
                </div>
                <div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter mb-2">{mission.title}</h3>
                  <h4 className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-6">{mission.subtitle}</h4>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                    {mission.description}
                  </p>
                  
                  <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 mb-8">
                    <h5 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
                       <Search className="h-4 w-4" /> Deep Dive
                    </h5>
                    <p className="text-white/80 leading-relaxed font-light">
                      {mission.deepDive}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {mission.technical.map((tech) => (
                      <div key={tech.label} className="p-4 rounded-xl bg-black border border-white/5">
                        <div className="text-[10px] uppercase font-bold text-white/40 mb-1">{tech.label}</div>
                        <div className="text-xs font-mono font-bold text-blue-400">{tech.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="sticky top-32">
                  <div className="aspect-video rounded-[3rem] overflow-hidden relative group shadow-2xl">
                    <img 
                      src={mission.image} 
                      alt={mission.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-8 left-8 p-4 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                      <div className="flex items-center gap-3">
                        <Info className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-mono font-bold uppercase tracking-widest">{mission.stats}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Achievements */}
      <section className="relative bg-white/[0.02] py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Historical Timeline</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Key milestones that defined NASA's legacy and expanded our horizons.</p>
          </div>

          <div className="space-y-8 relative">
             <div className="absolute left-[21px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0 hidden md:block" />
             
             {ACHIEVEMENTS.map((ach, i) => (
               <motion.div
                 key={ach.year}
                 initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className={cn(
                   "flex flex-col md:flex-row gap-8 items-start md:items-center",
                   i % 2 === 1 ? "md:flex-row-reverse" : ""
                 )}
               >
                 <div className="flex-1 w-full text-left md:text-right">
                    {i % 2 === 0 && (
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
                        <div className="text-blue-400 mb-2">{ach.icon}</div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">{ach.title}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{ach.desc}</p>
                      </div>
                    )}
                 </div>

                 <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 border-4 border-black text-xs font-black">
                    {ach.year.slice(2)}
                 </div>

                 <div className="flex-1 w-full text-left">
                    {i % 2 === 1 && (
                      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
                        <div className="text-blue-400 mb-2">{ach.icon}</div>
                        <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">{ach.title}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{ach.desc}</p>
                      </div>
                    )}
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto p-16 rounded-[4rem] bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent" />
          <History className="h-16 w-16 text-blue-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-tight">Humanity's Next <br /> Great Leap</h2>
          <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto">The journey doesn't end here. Join us as we continue to push the boundaries of what is possible in the vast ocean of space.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link href="/education/solar-system">
              <Button size="lg" className="rounded-full px-12 h-16 font-black uppercase tracking-tighter text-lg w-full sm:w-auto">
                Explore Solar System
              </Button>
            </Link>
            <Link href="/education">
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 font-black uppercase tracking-tighter text-lg w-full sm:w-auto border-white/20">
                Back to Academy
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 text-center text-muted-foreground text-xs font-mono uppercase tracking-[0.5em] border-t border-white/5 bg-black px-6">
        NASA Data Visualization // Aetheris Project // 2026
      </footer>
    </main>
  );
}
