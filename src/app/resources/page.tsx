"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { FileText, ArrowLeft, Download, Share2, ExternalLink, Clock, Tag, Search, Filter, BookOpen, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const resources = [
  {
    id: "r1",
    title: "Quantum Encryption Standards",
    category: "Security",
    description: "A comprehensive guide to post-quantum cryptographic protocols and their implementation in the Aetheris ecosystem.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop",
    date: "March 15, 2025",
    readTime: "12 min",
    featured: true
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
  },
  {
    id: "r5",
    title: "Real-time Analytics Pipeline",
    category: "Data",
    description: "Building streaming data pipelines that process millions of events per second with sub-millisecond latency.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    date: "March 01, 2025",
    readTime: "20 min"
  },
  {
    id: "r6",
    title: "Zero-Trust Architecture",
    category: "Security",
    description: "Implementing comprehensive security models that verify every request regardless of source or destination.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
    date: "Feb 28, 2025",
    readTime: "14 min"
  }
]

const categories = ["All", "Security", "AI", "Infrastructure", "Data"]

export default function ResourceLibrary() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null)
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const selectedResource = resources.find(r => r.id === selectedId)
  
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8])

  const filteredResources = resources.filter(r => {
    const matchesCategory = activeCategory === "All" || r.category === activeCategory
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredResource = resources.find(r => r.featured)

  return (
    <main className="min-h-screen bg-background pt-24 px-6">
      <Navbar />
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyber-pink/5 blur-[120px]" />
      </div>
      
      <div className="mx-auto max-w-7xl">
        <motion.header 
          style={{ opacity: headerOpacity }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Knowledge Base</span>
              </motion.div>
              <h1 className="text-5xl font-bold tracking-tight">Resource Library</h1>
              <p className="mt-3 text-lg text-muted-foreground max-w-xl">
                Technical documentation, whitepapers, and implementation guides for the Aetheris ecosystem.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  className="pl-10 w-full sm:w-64 h-11 rounded-full bg-foreground/5 border-foreground/10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-foreground/5 text-muted-foreground hover:bg-foreground/10"
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.header>

        {featuredResource && activeCategory === "All" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Featured</span>
            </div>
            <motion.div
              whileHover={{ y: -4 }}
              onClick={() => setSelectedId(featuredResource.id)}
              className="group cursor-pointer overflow-hidden rounded-3xl glass border border-foreground/10 hover:border-primary/50 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img 
                    src={featuredResource.image} 
                    alt={featuredResource.title} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary/10 text-primary border-none">{featuredResource.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {featuredResource.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{featuredResource.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredResource.description}</p>
                  <div className="flex items-center gap-4">
                    <Button className="rounded-full">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <span className="text-xs font-mono text-muted-foreground">{featuredResource.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredResources.filter(r => !r.featured || activeCategory !== "All" || searchQuery).map((resource, i) => (
              <motion.div
                layoutId={`card-${resource.id}`}
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedId(resource.id)}
                whileHover={{ y: -8 }}
                className="group cursor-pointer overflow-hidden rounded-2xl glass transition-all hover:border-primary/50 border border-foreground/10"
              >
                <motion.div layoutId={`image-${resource.id}`} className="aspect-video overflow-hidden relative">
                  <img 
                    src={resource.image} 
                    alt={resource.title} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Badge variant="outline" className="bg-foreground/5 border-none text-xs">
                      {resource.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {resource.readTime}
                    </span>
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
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ x: 4 }}
                      className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedId && selectedResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl" 
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-background border border-foreground/10 shadow-2xl"
            >
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedId(null)}
                className="absolute top-6 left-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-md hover:bg-background border border-foreground/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <motion.div layoutId={`image-${selectedId}`} className="h-[300px] md:h-full overflow-hidden relative">
                  <img 
                    src={selectedResource.image} 
                    alt={selectedResource.title} 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/50 hidden md:block" />
                </motion.div>
                
                <div className="p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-[80vh]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-primary/10 text-primary border-none px-3 py-1">
                        {selectedResource.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedResource.readTime}
                      </span>
                    </div>
                    
                    <motion.h2 layoutId={`title-${selectedId}`} className="text-3xl font-bold tracking-tight mb-6">
                      {selectedResource.title}
                    </motion.h2>
                    
                    <div className="prose prose-sm dark:prose-invert">
                      <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                        {selectedResource.description}
                      </p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className="text-muted-foreground">
                          This technical whitepaper deep-dives into the architecture of {selectedResource.title}. 
                          We explore the foundational principles that allow Aetheris to maintain 99.999% reliability 
                          even under extreme network conditions.
                        </p>
                        <h4 className="font-bold text-foreground mt-8 mb-4">Key Objectives</h4>
                        <ul className="space-y-3 text-muted-foreground">
                          {[
                            "Establishing multi-layered security protocols",
                            "Optimizing data throughput across distributed nodes",
                            "Ensuring verifiable integrity of all processed transactions",
                            "Implementing automated failover mechanisms for global availability"
                          ].map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-12 flex flex-wrap gap-4"
                    >
                      <Button className="rounded-full px-8 h-12">
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </Button>
                      <Button variant="outline" className="rounded-full px-6 h-12">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 pt-8 border-t border-foreground/10"
                    >
                      <div className="text-xs text-muted-foreground">
                        Published on {selectedResource.date}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
