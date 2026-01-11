// src/app/education/nasa-missions/page.tsx
"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Target, Star, Award, Zap, Users, Telescope, Globe, Info, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MISSIONS = [
  {
    id: "artemis",
    title: "Artemis Program",
    subtitle: "Moon to Mars",
    description: "NASA's most ambitious human spaceflight program since Apollo. Artemis aims to land the first woman and first person of color on the Moon, establishing a sustainable presence to prepare for the first human mission to Mars.",
    icon: <Rocket className="h-6 w-6" />,
    stats: "Next Launch: 2025 (Artemis II)",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=2070",
    color: "bg-blue-600"
  },
  {
    id: "jwst",
    title: "James Webb",
    subtitle: "Unfolding the Universe",
    description: "The premier observatory of the next decade. Webb is solving mysteries in our solar system, looking beyond to distant worlds around other stars, and probing the mysterious structures and origins of our universe.",
    icon: <Telescope className="h-6 w-6" />,
    stats: "Distance: 1.5M km (L2 Point)",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2000",
    color: "bg-amber-600"
  },
  {
    id: "perseverance",
    title: "Perseverance Rover",
    subtitle: "Seeking Life on Mars",
    description: "Currently exploring Jezero Crater, searching for signs of ancient microbial life, and collecting samples of rock and regolith for a future return to Earth.",
    icon: <Target className="h-6 w-6" />,
    stats: "Landed: Feb 18, 2021",
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

const FUTURE_PLANS = [
  {
    title: "Gateway Station",
    desc: "A lunar-orbiting outpost that will provide vital support for long-term human return to the lunar surface.",
    status: "In Development"
  },
  {
    title: "Mars Sample Return",
    desc: "A complex multi-mission campaign to bring Perseverance's samples back to Earth for analysis.",
    status: "Planned 2030s"
  },
  {
    title: "Europa Clipper",
    desc: "A mission to study Jupiter's moon Europa to determine if it has conditions suitable for life.",
    status: "Launch 2024"
  }
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
            Exploring the Final Frontier
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-8"
          >
            NASA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">MISSIONS</span>
          </h1 >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto font-light mb-12"
          >
            Detailed analysis of humanity's greatest endeavors in space exploration, 
            from historic milestones to the future of multi-planetary life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button size="lg" className="rounded-full px-8 h-16 text-lg font-bold uppercase group">
              Start Journey <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Floating Icons Background */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/5"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50 + "%"],
                rotate: [null, Math.random() * 360]
              }}
              transition={{ 
                duration: Math.random() * 20 + 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              <Star size={Math.random() * 20 + 10} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Missions Section */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic border-l-8 border-blue-600 pl-8 mb-6">Current Flagships</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">The pillars of modern space exploration pushing the boundaries of what is possible.</p>
        </div>

        <div className="space-y-32">
          {MISSIONS.map((mission, i) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                "flex flex-col md:flex-row gap-12 items-center",
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              )}
            >
              <div className="flex-1 space-y-8">
                <div className={cn("inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white", mission.color)}>
                  {mission.icon}
                </div>
                <div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter mb-2">{mission.title}</h3>
                  <h4 className="text-xl font-bold text-blue-400 uppercase tracking-widest mb-6">{mission.subtitle}</h4>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    {mission.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 w-fit">
                  <Info className="h-5 w-5 text-blue-400" />
                  <span className="font-mono text-sm uppercase tracking-wider">{mission.stats}</span>
                </div>
              </div>
              <div className="flex-1 w-full aspect-video rounded-[2rem] overflow-hidden relative group">
                <img 
                  src={mission.image} 
                  alt={mission.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="relative bg-white/[0.02] py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Legacy of Excellence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Milestones that defined human history and expanded our horizons beyond Earth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {ACHIEVEMENTS.map((ach, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-3xl bg-black border border-white/10 hover:border-blue-500/50 transition-all overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 h-24 w-24 bg-blue-600/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-blue-500 mb-6">{ach.icon}</div>
                <div className="text-sm font-mono text-white/40 mb-2">{ach.year}</div>
                <h4 className="text-xl font-bold uppercase mb-4">{ach.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{ach.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Plans Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 leading-none">The Next <br /> <span className="text-blue-500 italic">Frontier</span></h2>
            <p className="text-xl text-muted-foreground mb-12">NASA's roadmap for the coming decade focuses on sustainable lunar living and the first human steps on Mars.</p>
            <div className="space-y-8">
              {FUTURE_PLANS.map((plan, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="h-1 w-12 bg-blue-600 mt-3" />
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-2">{plan.title}</h4>
                    <p className="text-muted-foreground mb-2">{plan.desc}</p>
                    <span className="text-[10px] font-mono text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded uppercase">{plan.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] animate-pulse" />
            <div className="relative h-full w-full rounded-[3rem] border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-8 rounded-full border border-dashed border-blue-500/30"
               />
               <Rocket className="h-32 w-32 text-blue-500/50 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-950 py-32 text-center px-6">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Ready to join the mission?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-12">Stay updated with the latest NASA telemetry and mission reports through our integrated dashboard.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold uppercase bg-white text-blue-900 hover:bg-blue-50">
              Explore Dashboard
            </Button>
            <Link href="/education">
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold uppercase border-white/20 text-white hover:bg-white/10">
                Back to Academy
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-muted-foreground text-xs font-mono uppercase tracking-[0.5em] border-t border-white/5 bg-black px-6">
        NASA Data Visualization // Aetheris Project
      </footer>
    </main>
  );
}
