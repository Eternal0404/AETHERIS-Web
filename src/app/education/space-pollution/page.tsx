"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { EarthPollutionModel } from "@/components/earth-pollution-model";
import { ScrambleIn } from "@/components/scramble-in";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Zap, Activity, Info, AlertTriangle, Recycle } from "lucide-react";

export default function SpacePollutionPage() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-red-500/30">
      <Navbar />
      
      {/* Hero 3D Section */}
      <section className="relative h-[80vh] w-full pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EarthPollutionModel />
        </div>
        
        <div className="relative z-10 flex h-full flex-col items-center justify-end pb-20 px-6 pointer-events-none">
          <ScrambleIn delay={0.5} stagger={0.1} className="text-center">
            <h1 className="text-6xl font-black tracking-tighter md:text-8xl lg:text-9xl text-mask uppercase">
              Orbital Debris
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-red-400 font-mono tracking-widest uppercase md:text-xl">
              Critical Level: High | Collision Risk: Exponential
            </p>
          </ScrambleIn>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <ScrambleIn stagger={0.15} className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 backdrop-blur-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/20 text-red-500">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-4xl font-bold tracking-tight">34,000+</h3>
            <p className="mt-2 text-muted-foreground">Objects larger than 10cm currently being tracked in Earth's orbit.</p>
          </div>
          
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-4xl font-bold tracking-tight">128M</h3>
            <p className="mt-2 text-muted-foreground">Pieces of debris from 1mm to 1cm orbiting at lethal speeds.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-4xl font-bold tracking-tight">7.5km/s</h3>
            <p className="mt-2 text-muted-foreground">Average velocity of orbital debris. At this speed, a paint chip acts like a bullet.</p>
          </div>
        </ScrambleIn>
      </section>

      {/* Educational Content */}
      <section className="mx-auto max-w-4xl px-6 py-24 space-y-32">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <ScrambleIn>
            <h2 className="text-4xl font-bold tracking-tighter flex items-center gap-4">
              <Info className="text-red-500" /> What is Space Pollution?
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Space debris, or "space junk," is any human-made object in orbit around Earth that no longer serves a useful function. This includes non-functional spacecraft, abandoned launch vehicle stages, mission-related debris, and fragmentation debris.
            </p>
          </ScrambleIn>
          <div className="aspect-square rounded-full border border-red-500/10 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-red-500/5 rounded-full animate-pulse" />
            <AlertTriangle className="h-24 w-24 text-red-500/50" />
          </div>
        </div>

        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="order-2 md:order-1 aspect-square rounded-full border border-blue-500/10 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-blue-500/5 rounded-full animate-pulse" />
            <Recycle className="h-24 w-24 text-blue-500/50" />
          </div>
          <ScrambleIn className="order-1 md:order-2">
            <h2 className="text-4xl font-bold tracking-tighter flex items-center gap-4">
               The Kessler Syndrome
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              Proposed by NASA scientist Donald Kessler, this theory suggests that the density of objects in LEO (Low Earth Orbit) is high enough that collisions could set off a cascade—where each collision generates debris that then increases the likelihood of further collisions.
            </p>
          </ScrambleIn>
        </div>
      </section>

      {/* Solutions CTA */}
      <section className="bg-red-950/20 border-y border-red-500/10 py-32 text-center px-6">
        <ScrambleIn>
          <h2 className="text-5xl font-black tracking-tighter md:text-7xl uppercase">
            Can we fix it?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-xl text-muted-foreground">
            From giant nets and harpoons to laser ablation, engineers are developing ways to "clean" the orbit. Support global initiatives for sustainable space exploration.
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <Button size="lg" className="bg-red-600 hover:bg-red-500 text-white rounded-full px-12 h-16 text-lg">
              Explore Solutions
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg border-white/20">
              View Data Map
            </Button>
          </div>
        </ScrambleIn>
      </section>

      <footer className="py-24 text-center text-muted-foreground text-sm font-mono uppercase tracking-[0.5em]">
        Earth Orbit Monitoring System v4.0.2
      </footer>
    </main>
  );
}
