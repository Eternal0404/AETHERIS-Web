"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Zap, 
  Activity, 
  Globe, 
  Search,
  Filter,
  ArrowRight,
  Clock,
  MessageSquare,
  Bookmark
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const posts = [
  {
    title: "The Future of Neural Mesh Networking",
    excerpt: "Exploring how Aetheris is revolutionizing global data distribution with zero-latency edge compute.",
    category: "Architecture",
    date: "May 12, 2024",
    readTime: "8 min read",
    author: "Dr. Aris Thorne",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Optimizing WebGL Performance for Dashboards",
    excerpt: "Technical deep dive into shader optimization and GPU memory management for real-time telemetry.",
    category: "Engineering",
    date: "May 10, 2024",
    readTime: "12 min read",
    author: "Sarah Chen",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Securing Edge Nodes in a Hostile Environment",
    excerpt: "Best practices for implementing zero-trust architecture at the edge using Aetheris security protocols.",
    category: "Security",
    date: "May 08, 2024",
    readTime: "15 min read",
    author: "Marcus Vane",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest"
        >
          <Zap className="h-3 w-3" />
          Aetheris Insights
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Neural Engineering Blog
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground"
        >
          Deep dives into the tech powering the next generation of global infrastructure.
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between py-6 border-y border-foreground/10">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-10 rounded-full bg-foreground/5" />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {["All", "Architecture", "Engineering", "Security", "Case Studies"].map((cat) => (
            <Button key={cat} variant="ghost" size="sm" className="whitespace-nowrap rounded-full">
              {cat}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group flex flex-col space-y-4"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-foreground/10">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={post.image} 
                alt={post.title} 
                className="object-cover w-full h-full"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider border border-white/10">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-foreground/5">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                  {post.author.charAt(0)}
                </div>
                <span className="text-xs font-medium">{post.author}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="rounded-3xl p-12 bg-primary/5 border border-primary/10 text-center space-y-6"
      >
        <h2 className="text-3xl font-bold">Stay updated with the grid</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Get weekly insights into global mesh architecture and edge compute optimization directly in your terminal.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input placeholder="Enter your email" className="bg-background rounded-full" />
          <Button className="rounded-full px-8">Subscribe</Button>
        </div>
      </motion.div>
    </div>
  )
}
