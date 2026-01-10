"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Lock, ShieldCheck, CheckCircle2, User, Eye, EyeOff, Sparkles, Github, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [mode, setMode] = React.useState<"signin" | "signup">("signin")
  const [step, setStep] = React.useState(1)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [code, setCode] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  const handleNext = () => setStep((s) => s + 1)
  const handleBack = () => setStep((s) => s - 1)
  
  const handleComplete = () => {
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin")
    setStep(1)
    setEmail("")
    setPassword("")
    setName("")
    setCode("")
  }

  const totalSteps = mode === "signin" ? 3 : 4

  const variants = {
    initial: { opacity: 0, x: 30, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -30, scale: 0.95 },
  }

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <Navbar />
      
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--cyber-pink-rgb,236,72,153),0.1),transparent_50%)]" />
        
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-1/4 left-[10%] h-72 w-72 rounded-full bg-primary/10 blur-[100px]"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute bottom-1/4 right-[10%] h-96 w-96 rounded-full bg-cyber-pink/10 blur-[120px]"
        />
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute -top-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-xl"
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 shadow-2xl backdrop-blur-2xl border border-foreground/10"
        >
          <div className="mb-8 text-center">
            <motion.h1
              key={mode}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold tracking-tight"
            >
              {mode === "signin" ? "Identity Verification" : "Initialize New Entity"}
            </motion.h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Protocol Step {step} of {totalSteps}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {mode === "signup" && step === 1 && (
              <motion.div
                key="name"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Entity Designation (Name)</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-12 rounded-xl bg-foreground/5 border-foreground/10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="w-full h-12 rounded-full text-base" onClick={handleNext}>
                  Proceed <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {((mode === "signin" && step === 1) || (mode === "signup" && step === 2)) && (
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
                    <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@aetheris.io"
                      className="pl-10 h-12 rounded-xl bg-foreground/5 border-foreground/10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  {mode === "signup" && (
                    <Button variant="ghost" className="flex-1 rounded-full h-12" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button className={`h-12 rounded-full text-base ${mode === "signin" ? "w-full" : "flex-[2]"}`} onClick={handleNext}>
                    Proceed <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {((mode === "signin" && step === 2) || (mode === "signup" && step === 3)) && (
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
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      className="pl-10 pr-10 h-12 rounded-xl bg-foreground/5 border-foreground/10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {mode === "signup" && (
                    <div className="mt-3 space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: password.length >= i * 3 ? 1 : 0.3 }}
                            className={`h-1 flex-1 rounded-full origin-left ${password.length >= i * 3 ? "bg-primary" : "bg-foreground/10"}`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {password.length < 8 ? "Minimum 8 characters required" : "Strong encryption key detected"}
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" className="flex-1 rounded-full h-12" onClick={handleBack}>
                    Back
                  </Button>
                  <Button className="flex-[2] h-12 rounded-full text-base" onClick={handleNext}>
                    Verify <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {((mode === "signin" && step === 3) || (mode === "signup" && step === 4)) && (
              <motion.div
                key="2fa"
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="space-y-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary"
                  >
                    <ShieldCheck className="h-8 w-8" />
                  </motion.div>
                  <Label htmlFor="2fa">Secondary Protocol (2FA)</Label>
                  <p className="text-xs text-muted-foreground">Enter the 6-digit code from your authenticator device.</p>
                  <div className="flex justify-center gap-2 mt-4">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Input
                          type="text"
                          maxLength={1}
                          className="h-14 w-12 text-center text-2xl font-bold rounded-xl bg-foreground/5 border-foreground/10"
                          value={code[i] || ""}
                          onChange={(e) => {
                            const newCode = code.split("")
                            newCode[i] = e.target.value
                            setCode(newCode.join(""))
                            if (e.target.value && e.target.nextElementSibling) {
                              (e.target.nextElementSibling as HTMLInputElement).focus()
                            }
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
                <Button 
                  className="w-full h-12 rounded-full text-base" 
                  onClick={handleComplete}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Complete Initialization <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0.8 }}
                animate={{ scale: i + 1 <= step ? 1 : 0.8 }}
                className={`h-1.5 w-8 rounded-full transition-colors duration-500 ${
                  i + 1 <= step ? "bg-primary" : "bg-foreground/10"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-foreground/10">
            <p className="text-center text-sm text-muted-foreground mb-4">Or continue with</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 h-11 rounded-full">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="flex-1 h-11 rounded-full">
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={switchMode}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {mode === "signin" ? (
                <>Don&apos;t have an account? <span className="text-primary font-medium">Create one</span></>
              ) : (
                <>Already have an account? <span className="text-primary font-medium">Sign in</span></>
              )}
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          By continuing, you agree to the Aetheris <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Protocol</a>.
        </motion.p>
      </div>
    </main>
  )
}
