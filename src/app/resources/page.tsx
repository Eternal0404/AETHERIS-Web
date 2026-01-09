"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { SearchOverlay } from "@/components/search-overlay"
import { FileText, ArrowLeft, Download, Share2, ExternalLink, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const resources = [
  {
    id: "r1",
    title: "Quantum Encryption Standards",
    category: "Security",
    description: "A comprehensive guide to post-quantum cryptographic protocols and their implementation in the Aetheris ecosystem.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop",
    date: "March 15, 2025",
    readTime: "12 min"
  },
  {
    id: "r2",
    title: "Neural Network Optimization",
    category: "AI",
    description: "Exploring advanced techniques for reducing latency in large-scale transformer models using structural granularity.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2032&auto=format&fit=crop",
    date: "March 12, 2025",
    readTime: "18 min"
  },
  {
    id: "r3",
    title: "Edge Computing Patterns",
    category: "Infrastructure",
    description: "Best practices for distributing workloads across global mesh regions while maintaining consistent state.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    date: "March 08, 2025",
    readTime: "15 min"
  },
  {
    id: "r4",
    title: "Immutable Storage Architectures",
    category: "Data",
    description: "Designing data persistence layers that are resistant to manipulation and provide verifiable audit trails.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=2026&auto=format&fit=crop",
    date: "March 05, 2025",
    readTime: "10 min"
  }
]

export default function ResourceLibrary() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const selectedResource = resources.find(r => r.id === selectedId)

  return (
    <main className="min-h-screen bg-background pt-24 px-6">
      <Navbar />
      
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Resource Library</h1>
            <p className="mt-2 text-muted-foreground">Technical documentation, whitepapers, and implementation guides.</p>
          </div>
          <div className="flex gap-2">
            {["All", "Security", "AI", "Infrastructure", "Data"].map((cat) => (
              <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-foreground/5 py-1.5 px-3">
                {cat}
              </Badge>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
          {resources.map((resource) => (
            <motion.div
              layoutId={`card-${resource.id}`}
              key={resource.id}
              onClick={() => setSelectedId(resource.id)}
              className="group cursor-pointer overflow-hidden rounded-2xl glass transition-all hover:border-primary/50"
            >
              <motion.div layoutId={`image-${resource.id}`} className="aspect-video overflow-hidden">
                <img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Tag className="h-3 w-3" />
                  <span>{resource.category}</span>
                  <span className="mx-1">•</span>
                  <Clock className="h-3 w-3" />
                  <span>{resource.readTime}</span>
                </div>
                <motion.h3 layoutId={`title-${resource.id}`} className="text-xl font-bold group-hover:text-primary transition-colors">
                  {resource.title}
                </motion.h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {resource.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {resource.date}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-md" 
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-background border border-foreground/10 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-6 left-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/50 backdrop-blur-md hover:bg-background"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <motion.div layoutId={`image-${selectedId}`} className="h-[300px] md:h-full overflow-hidden">
                  <img 
                    src={selectedResource.image} 
                    alt={selectedResource.title} 
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                
                <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                      {selectedResource.category}
                    </Badge>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3" />
                    <span>{selectedResource.readTime}</span>
                  </div>
                  
                  <motion.h2 layoutId={`title-${selectedId}`} className="text-3xl font-bold tracking-tight mb-6">
                    {selectedResource.title}
                  </motion.h2>
                  
                  <div className="prose prose-sm dark:prose-invert">
                    <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                      {selectedResource.description}
                    </p>
                    <p>
                      This technical whitepaper deep-dives into the architecture of {selectedResource.title}. 
                      We explore the foundational principles that allow Aetheris to maintain 99.999% reliability 
                      even under extreme network conditions.
                    </p>
                    <h4 className="font-bold text-foreground mt-8 mb-4">Key Objectives</h4>
                    <ul className="space-y-2 text-muted-foreground list-disc pl-4">
                      <li>Establishing multi-layered security protocols</li>
                      <li>Optimizing data throughput across distributed nodes</li>
                      <li>Ensuring verifiable integrity of all processed transactions</li>
                      <li>Implementing automated failover mechanisms for global availability</li>
                    </ul>
                  </div>

                  <div className="mt-12 flex flex-wrap gap-4">
                    <Button className="rounded-full px-8">
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                    <Button variant="outline" className="rounded-full px-6">
                      <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
