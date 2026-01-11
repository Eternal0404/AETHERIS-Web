// src/app/education/page.tsx
"use client";

import * as React from "react";
import { Navbar } from "@/components/navbar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Rocket, Globe, Telescope, ShieldAlert, Award, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TOPICS = [
  {
    title: "NASA Missions",
    description: "Explore the ambitious plans, current missions, and historic achievements of NASA.",
    icon: <Rocket className="h-8 w-8" />,
    href: "/education/nasa-missions",
    color: "from-blue-600 to-indigo-600",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072",
  },
  {
    title: "Orbital Debris",
    description: "Understand the growing threat of space pollution and the solutions being developed.",
    icon: <ShieldAlert className="h-8 w-8" />,
    href: "/education/space-pollution",
    color: "from-red-600 to-orange-600",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
  },
  {
    title: "Space Achievements",
    description: "A look at the most significant milestones in human space exploration.",
    icon: <Award className="h-8 w-8" />,
    href: "/education/nasa-missions#achievements",
    color: "from-purple-600 to-pink-600",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&q=80&w=2072",
  },
];

export default function EducationHub() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />
      
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            Academy of <br /> The Stars
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Journey through the cosmos with our curated educational modules. 
            From the history of spaceflight to the future of planetary defense.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TOPICS.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <Link href={topic.href}>
                <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 glass transition-all group-hover:border-white/20">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={topic.image} 
                      alt={topic.title}
                      className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-t opacity-60", topic.color)} />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  <div className="relative z-10 h-full p-10 flex flex-col justify-end">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white">
                      {topic.icon}
                    </div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{topic.title}</h3>
                    <p className="text-white/70 mb-8 leading-relaxed">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                      Explore Module <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 relative z-10">Want to contribute?</h2>
          <p className="text-muted-foreground mb-8 relative z-10 max-w-xl mx-auto">
            We are always looking for space enthusiasts and educators to help expand our knowledge base.
          </p>
          <Button size="lg" className="rounded-full px-10 h-16 text-lg font-bold uppercase relative z-10">
            Become a Contributor
          </Button>
        </motion.section>
      </div>

      <footer className="py-12 text-center text-muted-foreground text-xs font-mono uppercase tracking-[0.5em] border-t border-white/5 bg-black">
        Aetheris Education v1.0 // Beyond Horizons
      </footer>
    </main>
  );
}
