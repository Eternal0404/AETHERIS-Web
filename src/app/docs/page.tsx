"use client"

import * as React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy, Check, ChevronRight, BookOpen, Terminal, Code2, Zap, Search, Menu, X, ExternalLink, ArrowRight } from "lucide-react"
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CodeSnippet({ code, language = "typescript" }: { code: string, language?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative my-6 overflow-hidden rounded-xl border border-foreground/10 bg-zinc-950 shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-red-500/50" />
            <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-amber-500/50" />
            <motion.div whileHover={{ scale: 1.2 }} className="h-3 w-3 rounded-full bg-emerald-500/50" />
          </div>
          <span className="ml-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            {language}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied!" : "Copy"}
        </motion.button>
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
    </motion.div>
  )
}

const sections = [
  { id: "introduction", title: "Introduction", icon: BookOpen },
  { id: "quickstart", title: "Quick Start", icon: Zap },
  { id: "authentication", title: "Authentication", icon: Zap },
  { id: "endpoints", title: "Core Endpoints", icon: Terminal },
  { id: "sdk", title: "Aetheris SDK", icon: Code2 },
]

const quickLinks = [
  { title: "API Reference", href: "#endpoints" },
  { title: "SDK Documentation", href: "#sdk" },
  { title: "Examples", href: "#" },
  { title: "Changelog", href: "#" },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = React.useState("introduction")
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id))
      const scrollPosition = window.scrollY + 200
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background pt-24">
      <Navbar />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 z-[110] h-1 origin-left bg-primary"
        style={{ scaleX }}
      />

      <div className="lg:hidden fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <div className="mx-auto max-w-7xl px-6 flex gap-12">
        <AnimatePresence>
          {(sidebarOpen || typeof window !== 'undefined') && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className={`${sidebarOpen ? 'fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-32 px-6' : 'hidden'} w-64 shrink-0 lg:block lg:sticky lg:top-32 lg:h-[calc(100vh-8rem)] lg:pt-0 lg:px-0 lg:bg-transparent lg:backdrop-blur-none`}
            >
              <div className="space-y-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search docs..."
                    className="pl-10 h-10 rounded-full bg-foreground/5 border-foreground/10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Documentation</h4>
                  <nav className="space-y-1">
                    {sections.map((section, i) => (
                      <motion.a
                        key={section.id}
                        href={`#${section.id}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                          activeSection === section.id 
                            ? "bg-primary/10 text-primary" 
                            : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                        }`}
                      >
                        <section.icon className="h-4 w-4" />
                        {section.title}
                        {activeSection === section.id && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                          />
                        )}
                      </motion.a>
                    ))}
                  </nav>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl glass p-4"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">Current Version</div>
                  <div className="text-sm font-mono font-bold">v2.4.0-stable</div>
                  <div className="mt-3 text-xs text-muted-foreground">Released Mar 15, 2025</div>
                </motion.div>
                
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Quick Links</h4>
                  <div className="space-y-1">
                    {quickLinks.map((link, i) => (
                      <motion.a
                        key={link.title}
                        href={link.href}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {link.title}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        <article className="flex-1 pb-24 max-w-none lg:pl-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold tracking-tight mb-4">API Documentation</h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
              Seamlessly integrate the Aetheris digital ecosystem into your existing stack using our high-fidelity APIs.
            </p>
          </motion.div>

          <section id="introduction" className="scroll-mt-32 pt-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                Introduction
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Aetheris provides a suite of modular APIs designed for structural granularity. Whether you're monitoring 
                global mesh traffic or securing sensitive data vaults, our interface ensures sub-millisecond precision.
              </p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 rounded-xl bg-primary/5 border border-primary/10 p-6 glass"
              >
                <h4 className="m-0 font-bold text-primary flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Pre-release Protocol
                </h4>
                <p className="m-0 mt-2 text-sm text-muted-foreground">
                  Note: These endpoints are currently in the 'Kinetic' phase. Breaking changes may occur as we 
                  optimize for the 2025 standards.
                </p>
              </motion.div>
            </motion.div>
          </section>

          <section id="quickstart" className="scroll-mt-32 pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                Quick Start
              </h2>
              <p className="mt-6 text-muted-foreground">
                Get up and running with Aetheris in under 5 minutes. Follow these steps to initialize your first connection.
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { step: "01", title: "Install SDK", desc: "Add the Aetheris package to your project" },
                  { step: "02", title: "Configure Keys", desc: "Set up your API credentials securely" },
                  { step: "03", title: "Make Requests", desc: "Start integrating with our endpoints" },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="rounded-xl glass p-6 border border-foreground/10"
                  >
                    <div className="text-4xl font-bold text-primary/30 mb-2">{item.step}</div>
                    <h4 className="font-bold mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              <CodeSnippet 
                code={`# Install via npm
npm install @aetheris/sdk

# Or using yarn
yarn add @aetheris/sdk

# Or using pnpm
pnpm add @aetheris/sdk`}
                language="bash"
              />
            </motion.div>
          </section>

          <section id="authentication" className="scroll-mt-32 pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                Authentication
              </h2>
              <p className="mt-6 text-muted-foreground">
                All requests to the Aetheris API must be authenticated using a Bearer token. 
                Tokens can be generated within the <a href="/dashboard" className="text-primary hover:underline">Command Center</a>.
              </p>
              <CodeSnippet 
                code={`curl -X GET "https://api.aetheris.io/v1/telemetry" \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \\
  -H "X-Aetheris-Protocol: v2" \\
  -H "Content-Type: application/json"`}
                language="bash"
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
              >
                <p className="text-sm text-amber-200/80">
                  <strong>Security Notice:</strong> Never expose your API tokens in client-side code. 
                  Always make API calls from your server-side application.
                </p>
              </motion.div>
            </motion.div>
          </section>

          <section id="endpoints" className="scroll-mt-32 pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
                Core Endpoints
              </h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 rounded-xl glass p-6 border border-foreground/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-mono font-bold">GET</span>
                  <code className="text-sm font-mono">/v1/telemetry</code>
                </div>
                <p className="text-muted-foreground mb-4">Retrieve live activity data from all active mesh regions.</p>
                <CodeSnippet 
                  code={`{
  "status": "success",
  "data": {
    "timestamp": "2025-03-20T12:00:00Z",
    "nodes": 1248,
    "latency_avg": "14ms",
    "regions": [
      { "id": "us-east", "status": "optimal", "load": 0.42 },
      { "id": "eu-central", "status": "optimal", "load": 0.38 },
      { "id": "ap-south", "status": "optimal", "load": 0.55 }
    ]
  }
}`}
                  language="json"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-6 rounded-xl glass p-6 border border-foreground/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 text-xs font-mono font-bold">POST</span>
                  <code className="text-sm font-mono">/v1/compute/deploy</code>
                </div>
                <p className="text-muted-foreground mb-4">Deploy a new compute workload to the specified region.</p>
                <CodeSnippet 
                  code={`{
  "workload_id": "wl-abc123",
  "region": "us-east",
  "config": {
    "cpu": 4,
    "memory": "16GB",
    "replicas": 3
  }
}`}
                  language="json"
                />
              </motion.div>
            </motion.div>
          </section>

          <section id="sdk" className="scroll-mt-32 pt-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="flex items-center gap-3 text-3xl font-bold border-b border-foreground/10 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Code2 className="h-5 w-5 text-primary" />
                </div>
                Aetheris SDK
              </h2>
              <p className="mt-6 text-muted-foreground">
                Our TypeScript SDK provides first-class support for typed interactions and automated retry logic.
              </p>
              <CodeSnippet 
                code={`import { AetherisClient } from '@aetheris/sdk';

const client = new AetherisClient({
  apiKey: process.env.AETHERIS_KEY,
  region: 'global-mesh',
  timeout: 30000,
  retries: 3
});

async function monitorHeartbeat() {
  const telemetry = await client.telemetry.getLiveStream();
  
  telemetry.on('pulse', (data) => {
    console.log(\`[PULSE] Current Load: \${data.load * 100}%\`);
    console.log(\`[PULSE] Active Nodes: \${data.nodes}\`);
  });
  
  telemetry.on('alert', (alert) => {
    console.warn(\`[ALERT] \${alert.message}\`);
  });
}

monitorHeartbeat();`}
                language="typescript"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 p-6 rounded-xl glass border border-foreground/10"
              >
                <h4 className="font-bold mb-4">SDK Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Full TypeScript support with detailed types",
                    "Automatic retry with exponential backoff",
                    "Real-time WebSocket subscriptions",
                    "Built-in request/response logging",
                    "Rate limiting and queue management",
                    "Cross-platform compatibility"
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 p-8 rounded-2xl glass border border-foreground/10 text-center"
          >
            <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
            <p className="text-muted-foreground mb-6">Our support team is available 24/7 to assist with your integration.</p>
            <div className="flex justify-center gap-4">
              <Button className="rounded-full">
                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-full">
                Join Discord
              </Button>
            </div>
          </motion.div>
        </article>
      </div>
    </main>
  )
}
