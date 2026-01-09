"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Lock, ShieldCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [step, setStep] = React.useState(1)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [code, setCode] = React.useState("")
  const router = useRouter()

  const handleNext = () => setStep((s) => s + 1)
  const handleComplete = () => {
    // Simulate authentication
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  const variants = {
    initial: { opacity: 0, x: 20, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -20, scale: 0.95 },
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <Navbar />
      
      {/* Abstract Background */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyber-pink/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass rounded-2xl p-8 shadow-2xl backdrop-blur-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Identity Verification</h1>
            <p className="mt-2 text-sm text-muted-foreground">Protocol Step {step} of 3</p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="email"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Neural Identifier (Email)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@aetheris.io"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full h-12 rounded-full" onClick={handleNext}>
                  Proceed <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="password"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="password">Access Key (Password)</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="ghost" className="flex-1 rounded-full" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button className="flex-[2] h-12 rounded-full" onClick={handleNext}>
                    Verify <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="2fa"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="space-y-2 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <Label htmlFor="2fa">Secondary Protocol (2FA)</Label>
                  <p className="text-xs text-muted-foreground">Enter the 6-digit code from your authenticator device.</p>
                  <Input
                    id="2fa"
                    type="text"
                    placeholder="000 000"
                    className="mt-4 text-center text-2xl font-bold tracking-[0.5em]"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <Button className="w-full h-12 rounded-full" onClick={handleComplete}>
                  Complete Initialization <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 w-8 rounded-full transition-colors duration-500 ${
                  s <= step ? "bg-primary" : "bg-primary/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
