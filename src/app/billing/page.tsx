"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Check, CreditCard, Zap, Shield, Globe, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const plans = [
  {
    name: "Starter Protocol",
    price: "$0",
    description: "Ideal for individual developers exploring the ecosystem.",
    features: ["5 Global Mesh Regions", "100GB Immutable Storage", "Community Support", "Basic Telemetry"],
    cta: "Start Free",
    variant: "outline"
  },
  {
    name: "Enterprise Core",
    price: "$499",
    description: "High-performance infrastructure for scaling organizations.",
    features: ["All Global Mesh Regions", "10TB Immutable Storage", "24/7 Priority Support", "Advanced WebGL Heatmaps", "Neural Engine Access"],
    cta: "Initialize Enterprise",
    variant: "default",
    popular: true
  },
  {
    name: "Quantum Custom",
    price: "Custom",
    description: "Bespoke solutions for global-scale operations.",
    features: ["Unlimited Mesh Regions", "Unlimited Storage", "Dedicated Solutions Architect", "Post-Quantum Encryption", "On-premise Deployment"],
    cta: "Contact Sales",
    variant: "outline"
  }
]

export default function BillingPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-24 px-6">
      <Navbar />
      
      <div className="mx-auto max-w-7xl">
        <header className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1">
            Pricing Protocols
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-4">Transparent Scaling</h1>
          <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
            Choose the protocol that fits your infrastructure needs. No hidden costs, just raw performance.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 glass ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10' : 'border-foreground/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  MOST SELECTED
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3 w-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant={plan.variant as any} className="w-full h-12 rounded-full text-lg group">
                {plan.cta} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </div>

        <section className="mt-24 rounded-3xl glass p-8 md:p-12 border border-foreground/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Enterprise-Grade Security</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">SOC2 Type II Compliant</h4>
                    <p className="text-sm text-muted-foreground">Rigorous security audits ensure your data remains protected under the highest standards.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyber-neon/10 text-cyber-neon">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Global Data Sovereignty</h4>
                    <p className="text-sm text-muted-foreground">Comply with local regulations by selecting specific mesh regions for data residency.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden border border-foreground/10 bg-zinc-950 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.2),transparent_70%)]" />
              <div className="relative z-10 text-center">
                <CreditCard className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
                <div className="text-xl font-mono font-bold tracking-widest text-primary">SECURE PAYMENT PROTOCOL</div>
                <div className="mt-2 text-xs text-muted-foreground">ENCRYPTED VIA QUANTUM-VAULT</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
