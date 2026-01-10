"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Terminal, 
  Code, 
  Copy, 
  Play, 
  RefreshCw,
  Key,
  Globe,
  Database,
  ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function APIConsolePage() {
  const [method, setMethod] = React.useState("GET")
  const [endpoint, setEndpoint] = React.useState("https://api.aetheris.io/v1/nodes")

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Console</h1>
          <p className="text-muted-foreground">Interactive interface for neural mesh communication.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Key className="mr-2 h-4 w-4" />
            Manage Keys
          </Button>
          <Button size="sm">
            Docs
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-6">
            <div className="flex gap-2">
              <select 
                value={method} 
                onChange={(e) => setMethod(e.target.value)}
                className="bg-foreground/5 border border-foreground/10 rounded-lg px-3 py-2 text-xs font-bold"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <Input 
                value={endpoint} 
                onChange={(e) => setEndpoint(e.target.value)}
                className="flex-1 bg-foreground/5 border-foreground/10 font-mono text-xs" 
              />
              <Button size="icon" className="shrink-0">
                <Play className="h-4 w-4 fill-current" />
              </Button>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Authentication</h4>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Key className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono">ae_live_842x91...</span>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-bold">REGENERATE</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Parameters</h4>
              <div className="space-y-2">
                <ParamRow name="region" value="us-east-1" />
                <ParamRow name="limit" value="10" />
                <Button variant="ghost" size="sm" className="w-full text-[10px] border border-dashed border-foreground/10">+ ADD PARAMETER</Button>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass border border-foreground/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">SDK Snippet</h3>
            <div className="relative">
              <pre className="p-4 rounded-xl bg-black/40 font-mono text-xs text-primary leading-relaxed overflow-x-auto">
{`const aetheris = new AetherisClient({
  apiKey: 'YOUR_API_KEY'
});

const nodes = await aetheris.nodes.list({
  region: 'us-east-1',
  limit: 10
});`}
              </pre>
              <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-muted-foreground">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-foreground/10 bg-black/40 overflow-hidden min-h-[500px]">
          <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between bg-foreground/5">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-widest">Response Body</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-mono">
              <span className="text-green-500">200 OK</span>
              <span className="text-muted-foreground">14ms</span>
            </div>
          </div>
          <div className="flex-1 p-6 font-mono text-xs text-muted-foreground leading-relaxed overflow-y-auto">
{`{
  "status": "success",
  "data": {
    "nodes": [
      {
        "id": "node_842",
        "region": "us-east-1",
        "status": "active",
        "compute": {
          "cpu": "8 vCPU",
          "memory": "16GB"
        }
      },
      {
        "id": "node_911",
        "region": "us-east-1",
        "status": "scaling",
        "compute": {
          "cpu": "4 vCPU",
          "memory": "8GB"
        }
      }
    ],
    "pagination": {
      "total": 42,
      "limit": 10,
      "offset": 0
    }
  }
}`}
          </div>
        </div>
      </div>
    </div>
  )
}

function ParamRow({ name, value }: { name: string, value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Input value={name} readOnly className="h-8 bg-foreground/5 border-foreground/10 font-mono text-[10px] w-32" />
      <Input value={value} readOnly className="h-8 bg-foreground/5 border-foreground/10 font-mono text-[10px]" />
    </div>
  )
}
