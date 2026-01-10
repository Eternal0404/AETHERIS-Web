"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Preloader } from "@/components/preloader";
import { TiltCard, TelemetryWaveform } from "@/components/interactive-cards";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cpu, Globe, Zap, Database, Shield, Activity } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = React.useState(true);

  return (
    <main className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {loading ?
        <Preloader key="preloader" onComplete={() => setLoading(false)} /> :

        <HomeContent key="content" />
        }
      </AnimatePresence>
    </main>);

}

function HomeContent() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}>

      <Navbar />
      
      {/* Hero Section */}
          <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
              <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-[0.03] cyber:opacity-[0.05]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" }} />

            </div>

            <div className="max-w-6xl text-center">
              <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-mask text-5xl font-bold tracking-tighter sm:text-7xl md:text-9xl">

                STRUCTURAL <br /> GRANULARITY
              </motion.h1>
              <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">

                Experience the next evolution of digital ecosystems. 
                Precision-engineered kinetic interfaces for the hyper-connected era.
              </motion.p>
              <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-wrap justify-center gap-4">
                <a href="/dashboard">
                  <Button size="lg" className="h-14 rounded-full px-8 text-lg">
                    Initialize Protocol
                  </Button>
                </a>
                <a href="/docs">
                  <Button size="lg" variant="outline" className="h-14 rounded-full px-8 text-lg glass">
                    View Documentation
                  </Button>
                </a>
              </motion.div>
            </div>

            <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2">

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-12 text-muted-foreground/40">
                  <motion.div
                animate={{ y: [0, -5, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>

                    <Shield className="h-4 w-4" />
                  </motion.div>
                  <motion.div
                animate={{ y: [0, -5, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>

                    <Zap className="h-4 w-4" />
                  </motion.div>
                </div>
                <div className="flex flex-col items-center gap-2 !w-full !h-[37px]">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll to explore</span>
                  <div className="h-12 w-px bg-gradient-to-b from-primary to-transparent" />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Bento Grid Section */}
          <section className="mx-auto max-w-7xl px-6 py-24">
            <div className="mb-16">
              <h2 className="text-3xl font-bold tracking-tight">System Architecture</h2>
              <p className="text-muted-foreground">Modular components built for scale and performance.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2">
              <TiltCard className="md:col-span-2">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">Neural Engine</h3>
                    <p className="mt-2 text-muted-foreground">Real-time processing with sub-millisecond latency for complex datasets.</p>
                  </div>
                  <div className="mt-8">
                    <TelemetryWaveform />
                    <div className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>LOAD: 42%</span>
                      <span>FREQ: 5.2GHz</span>
                      <span>TEMP: 38°C</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
              
              <TiltCard>
                <div className="flex h-full flex-col justify-between">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-neon/10 text-cyber-neon">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Global Mesh</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Edge distribution network spanning 42 global regions.</p>
                  </div>
                </div>
              </TiltCard>

              <TiltCard>
                <div className="flex h-full flex-col justify-between">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-pink/10 text-cyber-pink">
                    <Database className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Quantum Vault</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Immutable storage with post-quantum encryption standards.</p>
                  </div>
                </div>
              </TiltCard>

              <TiltCard className="md:col-span-2">
                <div className="flex h-full items-center gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">Live Telemetry</h3>
                    <p className="mt-2 text-muted-foreground">Monitoring the heartbeat of your infrastructure in real-time.</p>
                    <div className="mt-6 flex gap-4">
                      <div className="rounded-lg bg-foreground/5 p-4 text-center glass flex-1">
                        <div className="text-2xl font-bold">99.9%</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Uptime</div>
                      </div>
                      <div className="rounded-lg bg-foreground/5 p-4 text-center glass flex-1">
                        <div className="text-2xl font-bold">14ms</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Latency</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative hidden w-48 shrink-0 md:block">
                    <div className="aspect-square rounded-full border border-primary/20 p-2">
                      <div className="aspect-square rounded-full border border-primary/40 p-2">
                        <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="flex h-full w-full items-center justify-center rounded-full border border-primary/60">

                          <Activity className="h-8 w-8 text-primary" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </section>

          {/* Horizontal Scroll Timeline */}
          <section className="bg-background border-y border-foreground/5 py-24">
            <div className="px-6 mb-12 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight">Our Journey</h2>
              <p className="text-muted-foreground">Tracing the path of innovation.</p>
            </div>
            <HorizontalTimeline />
          </section>

          {/* Footer Preview */}
          <footer className="border-t border-foreground/10 px-6 py-24 text-center">
            <h2 className="text-4xl font-bold tracking-tighter">READY TO SYNC?</h2>
            <p className="mt-4 text-muted-foreground">Join the elite network today.</p>
            <a href="/auth">
              <Button size="lg" className="mt-8 rounded-full">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </a>
          </footer>
        </motion.div>);

}

function HorizontalTimeline() {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: targetRef,
    axis: "x"
  });

  // We need a proper horizontal scroll section.
  // Using a container with overflow-x-auto and snap-x
  return (
    <div className="relative">
      <div
        ref={targetRef}
        className="flex gap-12 overflow-x-auto px-6 pb-12 no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}>

        {timelineItems.map((item, i) =>
        <TimelineItem key={i} item={item} />
        )}
      </div>
    </div>);

}

function TimelineItem({ item }: {item: typeof timelineItems[0];}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Velocity-based mask expansion
  const velocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const maskSize = useTransform(smoothVelocity, [-1, 0, 1], ["80%", "100%", "80%"]);

  return (
    <motion.div
      ref={ref}
      className="min-w-[400px] snap-center">

      <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mb-2">{item.year}</div>
      <motion.h3
        style={{ scale: maskSize }}
        className="text-4xl font-bold tracking-tight mb-4">

        {item.title}
      </motion.h3>
      <p className="text-muted-foreground leading-relaxed">
        {item.description}
      </p>
    </motion.div>);

}

const timelineItems = [
{
  year: "2021",
  title: "The Genesis",
  description: "Architecting the first layer of the Aetheris protocol, establishing the core foundations of structural granularity."
},
{
  year: "2022",
  title: "Kinetic Expansion",
  description: "Implementing fluid interface dynamics and real-time telemetry systems for global infrastructure monitoring."
},
{
  year: "2023",
  title: "Neural Integration",
  description: "Deploying the first high-fidelity AI-driven data processing engines, enabling predictive analytics at scale."
},
{
  year: "2024",
  title: "The Ecosystem",
  description: "Aetheris reaches full maturity as a deep-nested digital ecosystem for enterprise-grade performance."
},
{
  year: "2025",
  title: "Quantum Leap",
  description: "Transitioning to post-quantum encryption standards and establishing the next frontier of secure computing."
}];