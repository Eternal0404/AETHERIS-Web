"use client"

import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy, Check, ChevronRight, BookOpen, Terminal, Code2, Zap } from "lucide-react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

export function CodeSnippet({ code, language = "typescript" }: { code: string, language?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-foreground/10 bg-zinc-950 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/50" />
            <div className="h-3 w-3 rounded-full bg-amber-500/50" />
            <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
          </div>
          <span className="ml-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            {language}
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-sm">
        <SyntaxHighlighter
          language={language}
          style={atomDark}
          customStyle={{
            background: "transparent",
            padding: 0,
            margin: 0,
            fontSize: "13px",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

const sections = [
  { id: "introduction", title: "Introduction", icon: BookOpen },
  { id: "authentication", title: "Authentication", icon: Zap },
  { id: "endpoints", title: "Core Endpoints", icon: Terminal },
  { id: "sdk", title: "Aetheris SDK", icon: Code2 },
]

export default function DocsPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[110] h-1 origin-left bg-primary"
        style={{ scaleX }}
      />

      <div className="mx-auto max-w-7xl px-6 flex gap-12">
        {/* Sticky Table of Contents */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-32 space-y-8">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Documentation</h4>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    <section.icon className="h-4 w-4" />
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
            <div className="rounded-xl glass p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">Current Version</div>
              <div className="text-xs font-mono">v2.4.0-stable</div>
            </div>
          </div>
        </aside>

        {/* Documentation Content */}
        <article className="flex-1 pb-24 prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-5xl font-bold tracking-tight mb-4">API Documentation</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Seamlessly integrate the Aetheris digital ecosystem into your existing stack using our high-fidelity APIs.
          </p>

          <section id="introduction" className="scroll-mt-32 pt-12">
            <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
              <BookOpen className="h-8 w-8 text-primary" /> Introduction
            </h2>
            <p className="mt-6 leading-relaxed">
              Aetheris provides a suite of modular APIs designed for structural granularity. Whether you're monitoring 
              global mesh traffic or securing sensitive data vaults, our interface ensures sub-millisecond precision.
            </p>
            <div className="mt-8 rounded-xl bg-primary/5 border border-primary/10 p-6 glass">
              <h4 className="m-0 font-bold text-primary">Pre-release Protocol</h4>
              <p className="m-0 mt-2 text-sm">
                Note: These endpoints are currently in the 'Kinetic' phase. Breaking changes may occur as we 
                optimize for the 2025 standards.
              </p>
            </div>
          </section>

          <section id="authentication" className="scroll-mt-32 pt-12">
            <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
              <Zap className="h-8 w-8 text-primary" /> Authentication
            </h2>
            <p className="mt-6">
              All requests to the Aetheris API must be authenticated using a Bearer token. 
              Tokens can be generated within the <a href="/dashboard">Command Center</a>.
            </p>
            <CodeSnippet 
              code={`curl -X GET "https://api.aetheris.io/v1/telemetry" \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \\
  -H "X-Aetheris-Protocol: v2"`}
              language="bash"
            />
          </section>

          <section id="endpoints" className="scroll-mt-32 pt-12">
            <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
              <Terminal className="h-8 w-8 text-primary" /> Core Endpoints
            </h2>
            
            <h3 className="mt-8 text-xl font-bold">GET /v1/telemetry</h3>
            <p>Retrieve live activity data from all active mesh regions.</p>
            <CodeSnippet 
              code={`{
  "status": "success",
  "data": {
    "timestamp": "2025-03-20T12:00:00Z",
    "nodes": 1248,
    "latency_avg": "14ms",
    "regions": [
      { "id": "us-east", "status": "optimal", "load": 0.42 },
      { "id": "eu-central", "status": "optimal", "load": 0.38 }
    ]
  }
}`}
              language="json"
            />
          </section>

          <section id="sdk" className="scroll-mt-32 pt-12">
            <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
              <Code2 className="h-8 w-8 text-primary" /> Aetheris SDK
            </h2>
            <p className="mt-6">
              Our TypeScript SDK provides first-class support for typed interactions and automated retry logic.
            </p>
            <CodeSnippet 
              code={`import { AetherisClient } from '@aetheris/sdk';

const client = new AetherisClient({
  apiKey: process.env.AETHERIS_KEY,
  region: 'global-mesh'
});

async function monitorHeartbeat() {
  const telemetry = await client.telemetry.getLiveStream();
  
  telemetry.on('pulse', (data) => {
    console.log(\`[PULSE] Current Load: \${data.load * 100}%\`);
  });
}`}
              language="typescript"
            />
          </section>
        </article>
      </div>
    </main>
  )
}
