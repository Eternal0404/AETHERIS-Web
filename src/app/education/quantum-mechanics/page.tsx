"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Atom,
  Waves,
  Zap,
  Eye,
  Box,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Lightbulb,
  Binary,
  Cpu,
  FlaskConical,
  BookOpen,
  Shuffle,
  CircleDot,
  Orbit,
  Scale,
  Clock,
  Infinity,
  Brain,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CORE_PRINCIPLES = [
  {
    id: "wave-particle",
    title: "Wave-Particle Duality",
    subtitle: "The Dual Nature of Reality",
    icon: <Waves className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
    summary: "Matter and light exhibit both wave-like and particle-like properties.",
    content: `One of the most profound discoveries in physics is that all matter and energy exhibit both wave-like and particle-like properties. This concept, known as wave-particle duality, fundamentally changed our understanding of reality.

In the famous double-slit experiment, when electrons or photons are fired one at a time through two parallel slits, they create an interference pattern on the detector—a behavior characteristic of waves. However, each individual electron arrives at the detector as a discrete point, like a particle.

This duality was first proposed by Louis de Broglie in 1924, who suggested that just as light (traditionally thought of as a wave) could behave like particles (photons), matter (traditionally thought of as particles) could behave like waves. The wavelength of any particle is given by the de Broglie equation: λ = h/p, where h is Planck's constant and p is momentum.

This principle applies to everything from electrons to baseballs—though for large objects, the wavelength is so incredibly small it's undetectable. For electrons, however, the wave nature is essential for understanding atomic structure, chemical bonding, and modern electronics.`,
    keyPoints: [
      "Light behaves as both waves and particles (photons)",
      "Electrons show interference patterns like waves",
      "de Broglie wavelength: λ = h/p",
      "Foundation of modern electron microscopy"
    ],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "superposition",
    title: "Quantum Superposition",
    subtitle: "Existing in Multiple States",
    icon: <Shuffle className="h-6 w-6" />,
    color: "from-purple-500 to-pink-500",
    summary: "Particles exist in all possible states simultaneously until measured.",
    content: `Quantum superposition is perhaps the most counterintuitive principle in all of physics. It states that a quantum system can exist in multiple states simultaneously until it is observed or measured.

The most famous illustration of this concept is Schrödinger's Cat, a thought experiment proposed by physicist Erwin Schrödinger in 1935. In this scenario, a cat in a sealed box is simultaneously alive and dead until the box is opened and the cat is observed. While this seems absurd for macroscopic objects, it accurately describes the behavior of quantum particles.

Mathematically, the state of a quantum system is described by a wave function (Ψ), which represents a probability amplitude. Before measurement, the wave function is a linear combination (superposition) of all possible states. The probability of finding the system in any particular state is given by |Ψ|².

This principle is the foundation of quantum computing. While classical computers use bits that are either 0 or 1, quantum computers use qubits that can be in a superposition of both 0 and 1 simultaneously. This allows quantum computers to process vast amounts of information in parallel, potentially solving problems that are intractable for classical computers.

Superposition is not just theoretical—it has been experimentally verified countless times. Atomic clocks, MRI machines, and laser technology all rely on principles of superposition.`,
    keyPoints: [
      "Systems exist in multiple states at once",
      "Wave function (Ψ) describes probability amplitudes",
      "Measurement 'collapses' the superposition",
      "Enables quantum computing's parallel processing"
    ],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "uncertainty",
    title: "Heisenberg Uncertainty",
    subtitle: "The Limits of Knowledge",
    icon: <Target className="h-6 w-6" />,
    color: "from-amber-500 to-orange-500",
    summary: "Certain pairs of properties cannot both be known precisely.",
    content: `Werner Heisenberg's Uncertainty Principle, formulated in 1927, is a fundamental limit on what we can know about quantum systems. It states that certain pairs of physical properties—most famously position (x) and momentum (p)—cannot both be measured precisely at the same time.

The mathematical statement is: Δx · Δp ≥ ℏ/2, where Δx is the uncertainty in position, Δp is the uncertainty in momentum, and ℏ is the reduced Planck constant. The more precisely you know a particle's position, the less precisely you can know its momentum, and vice versa.

Crucially, this is not a limitation of our measurement technology—it is a fundamental property of nature itself. The act of measurement inherently disturbs the system. To measure position, you must interact with the particle (e.g., with a photon), and that interaction changes its momentum.

This principle has profound implications. It explains why electrons don't spiral into atomic nuclei (they would have well-defined position and near-zero momentum, violating the principle). It also sets fundamental limits on technologies like electron microscopes and explains phenomena like quantum tunneling.

The uncertainty principle also applies to other pairs of "conjugate variables," such as energy and time: ΔE · Δt ≥ ℏ/2. This energy-time uncertainty allows particles to briefly "borrow" energy from the vacuum, leading to virtual particles and the Casimir effect.`,
    keyPoints: [
      "Δx · Δp ≥ ℏ/2 (position-momentum)",
      "ΔE · Δt ≥ ℏ/2 (energy-time)",
      "Not a measurement limitation—fundamental to reality",
      "Enables quantum tunneling and virtual particles"
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "entanglement",
    title: "Quantum Entanglement",
    subtitle: "Spooky Action at a Distance",
    icon: <Infinity className="h-6 w-6" />,
    color: "from-emerald-500 to-teal-500",
    summary: "Particles become correlated and share fate across any distance.",
    content: `Quantum entanglement is a phenomenon where two or more particles become correlated in such a way that the quantum state of each particle cannot be described independently of the others, even when separated by vast distances.

When particles become entangled, measuring one particle's property instantly determines the corresponding property of its entangled partner—regardless of the distance between them. Einstein famously called this "spooky action at a distance" and believed it proved quantum mechanics was incomplete. However, subsequent experiments (particularly Bell test experiments) have conclusively demonstrated that entanglement is real.

When two particles are entangled, their combined state is described by a single wave function. For example, two entangled electrons might be in a state where measuring one as "spin up" guarantees the other will be "spin down," but before measurement, neither has a definite spin.

It's crucial to understand that entanglement does not allow faster-than-light communication. While the correlation is instant, you cannot use it to send information—the measurement results appear random until compared with the partner particle's results.

Entanglement is the foundation of quantum cryptography (quantum key distribution), which offers theoretically unbreakable encryption. It's also essential for quantum teleportation—not teleporting matter, but teleporting quantum states. Major research institutions and tech companies are racing to build quantum networks that leverage entanglement for secure communications.`,
    keyPoints: [
      "Particles share a single quantum state",
      "Measurement of one instantly affects the other",
      "Does not enable faster-than-light communication",
      "Foundation of quantum cryptography and teleportation"
    ],
    image: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "tunneling",
    title: "Quantum Tunneling",
    subtitle: "Passing Through the Impossible",
    icon: <Zap className="h-6 w-6" />,
    color: "from-rose-500 to-red-500",
    summary: "Particles can pass through barriers they classically shouldn't.",
    content: `Quantum tunneling is the phenomenon where particles can pass through potential energy barriers that they classically should not be able to overcome. It's like throwing a ball at a wall and having it occasionally appear on the other side—without going over or around.

This effect arises from the wave-like nature of quantum particles. The wave function of a particle doesn't abruptly stop at a barrier; instead, it decays exponentially through the barrier. If the barrier is thin enough, there's a non-zero probability of finding the particle on the other side.

The tunneling probability depends on the barrier's height, width, and the particle's mass and energy. Lighter particles (like electrons) tunnel more readily than heavier ones. The mathematical treatment involves solving the Schrödinger equation for a potential barrier.

Tunneling is not just a curiosity—it's essential to many natural and technological processes:

• Nuclear Fusion in Stars: The Sun's core isn't hot enough for protons to classically overcome their electromagnetic repulsion. Tunneling allows nuclear fusion to occur, powering all stars.

• Radioactive Decay: Alpha decay occurs when alpha particles tunnel out of unstable nuclei.

• Scanning Tunneling Microscopes (STM): These instruments use tunneling current to image surfaces at the atomic level, allowing us to see individual atoms.

• Flash Memory: Modern computer flash drives and SSDs rely on electrons tunneling through thin oxide layers to store data.

• Enzyme Catalysis: Some biological enzymes may use tunneling to speed up chemical reactions essential for life.`,
    keyPoints: [
      "Wave functions penetrate potential barriers",
      "Probability decreases with barrier width/height",
      "Powers nuclear fusion in stars",
      "Used in STM, flash memory, and biological processes"
    ],
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: "quantization",
    title: "Energy Quantization",
    subtitle: "The Discrete Nature of Energy",
    icon: <CircleDot className="h-6 w-6" />,
    color: "from-indigo-500 to-violet-500",
    summary: "Energy comes in discrete packets called quanta.",
    content: `Energy quantization is the foundational principle that gives quantum mechanics its name. It states that energy is not continuous but comes in discrete, indivisible units called "quanta."

This revolutionary idea was introduced by Max Planck in 1900 to solve the "ultraviolet catastrophe"—a problem in classical physics where the predicted energy of black-body radiation diverged to infinity at high frequencies. Planck proposed that energy could only be emitted or absorbed in discrete packets: E = hν, where h is Planck's constant (6.626 × 10⁻³⁴ J·s) and ν is frequency.

Einstein extended this idea in 1905, proposing that light itself is quantized into particles called photons. This explained the photoelectric effect—why light below a certain frequency cannot eject electrons from a metal, regardless of intensity.

In atoms, electrons can only occupy specific energy levels, not arbitrary values. When an electron transitions between levels, it emits or absorbs a photon with energy exactly equal to the difference between levels. This explains atomic spectra—the characteristic "fingerprint" of light frequencies emitted by each element.

Quantization extends beyond energy. Angular momentum is quantized (explaining atomic orbitals), electric charge is quantized (with the electron charge as the fundamental unit), and even space and time may be quantized at the Planck scale (10⁻³⁵ m and 10⁻⁴³ s).

Understanding energy quantization is essential for:
• Semiconductor physics and computer chips
• Lasers and LEDs
• Medical imaging (MRI, PET scans)
• Understanding chemical bonds and reactions`,
    keyPoints: [
      "E = hν (energy of a quantum)",
      "Planck's constant: h = 6.626 × 10⁻³⁴ J·s",
      "Explains atomic spectra and photoelectric effect",
      "Foundation of semiconductor technology"
    ],
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=2070"
  }
];

const PIONEERS = [
  { name: "Max Planck", contribution: "Introduced energy quanta (1900)", year: "1858-1947" },
  { name: "Albert Einstein", contribution: "Photoelectric effect, photons (1905)", year: "1879-1955" },
  { name: "Niels Bohr", contribution: "Atomic model with quantized orbits (1913)", year: "1885-1962" },
  { name: "Louis de Broglie", contribution: "Wave-particle duality (1924)", year: "1892-1987" },
  { name: "Werner Heisenberg", contribution: "Uncertainty principle, matrix mechanics (1925)", year: "1901-1976" },
  { name: "Erwin Schrödinger", contribution: "Wave equation (1926)", year: "1887-1961" },
  { name: "Paul Dirac", contribution: "Relativistic quantum mechanics (1928)", year: "1902-1984" },
  { name: "Richard Feynman", contribution: "QED, path integrals (1940s)", year: "1918-1988" }
];

const APPLICATIONS = [
  {
    title: "Quantum Computing",
    desc: "Using superposition and entanglement to solve problems impossible for classical computers. Companies like IBM, Google, and startups are racing to achieve quantum advantage.",
    icon: <Cpu className="h-6 w-6" />
  },
  {
    title: "Quantum Cryptography",
    desc: "Leveraging entanglement for theoretically unbreakable encryption. Quantum key distribution (QKD) is already being deployed for secure government and financial communications.",
    icon: <Binary className="h-6 w-6" />
  },
  {
    title: "Medical Imaging",
    desc: "MRI machines exploit nuclear spin states, while PET scans detect gamma rays from positron-electron annihilation. Quantum sensors may enable even more precise diagnostics.",
    icon: <FlaskConical className="h-6 w-6" />
  },
  {
    title: "Semiconductors & Electronics",
    desc: "Every transistor, LED, and solar cell relies on quantum mechanics. Understanding band gaps, tunneling, and quantum confinement enables modern technology.",
    icon: <Zap className="h-6 w-6" />
  }
];

const EQUATIONS = [
  { name: "Schrödinger Equation", eq: "iℏ ∂Ψ/∂t = ĤΨ", desc: "Governs the evolution of quantum states" },
  { name: "de Broglie Wavelength", eq: "λ = h/p", desc: "Wavelength of any particle" },
  { name: "Heisenberg Uncertainty", eq: "Δx·Δp ≥ ℏ/2", desc: "Fundamental limits on precision" },
  { name: "Planck-Einstein Relation", eq: "E = hν = ℏω", desc: "Energy of a photon" }
];

function AnimatedAtom() {
  return (
    <div className="relative h-64 w-64">
      <motion.div
        className="absolute inset-0 rounded-full border border-blue-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: 999999, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border border-purple-500/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: 999999, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-8 rounded-full border border-cyan-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: 999999, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-[0_0_30px_rgba(139,92,246,0.8)]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: 999999 }}
      />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          animate={{
            x: [Math.cos((angle * Math.PI) / 180) * 100, Math.cos(((angle + 360) * Math.PI) / 180) * 100],
            y: [Math.sin((angle * Math.PI) / 180) * 100, Math.sin(((angle + 360) * Math.PI) / 180) * 100],
          }}
          transition={{ duration: 4 + i * 0.5, repeat: 999999, ease: "linear" }}
          style={{ marginLeft: -4, marginTop: -4 }}
        />
      ))}
    </div>
  );
}

function WaveAnimation() {
  return (
    <svg viewBox="0 0 400 100" className="w-full h-24 text-blue-500">
      <motion.path
        d="M 0 50 Q 50 0, 100 50 T 200 50 T 300 50 T 400 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: 999999, repeatType: "loop" }}
      />
      <motion.path
        d="M 0 50 Q 50 100, 100 50 T 200 50 T 300 50 T 400 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity={0.3}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, repeat: 999999, repeatType: "loop" }}
      />
    </svg>
  );
}

function ProbabilityCloud() {
  return (
    <div className="relative h-48 w-48">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${50 + (Math.random() - 0.5) * 80}%`,
            top: `${50 + (Math.random() - 0.5) * 80}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: 999999,
            delay: Math.random() * 2,
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
      </div>
    </div>
  );
}

function DoubleSlitVisualization() {
  return (
    <div className="relative h-32 w-full bg-black/50 rounded-xl overflow-hidden border border-white/10">
      <div className="absolute left-8 top-0 bottom-0 w-2 bg-white/20 flex flex-col justify-center gap-4">
        <div className="h-4 w-full bg-black" />
        <div className="h-4 w-full bg-black" />
      </div>
      <div className="absolute right-4 top-0 bottom-0 w-16 flex items-center">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 bg-blue-400/80 rounded-full"
            style={{ top: `${10 + i * 4}%` }}
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: [0, Math.sin(i * 0.5) * 30 + 10, 0],
              opacity: [0, Math.sin(i * 0.5) * 0.8 + 0.2, 0],
            }}
            transition={{ duration: 3, repeat: 999999, delay: i * 0.1 }}
          />
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-12 h-0.5 w-1 bg-cyan-400 rounded-full"
          style={{ top: `${40 + i * 5}%` }}
          animate={{
            x: [0, 200],
            opacity: [1, 0],
          }}
          transition={{ duration: 1.5, repeat: 999999, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

export default function QuantumMechanicsPage() {
  const [activePrinciple, setActivePrinciple] = React.useState(CORE_PRINCIPLES[0]);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
      <Navbar />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-600/5 blur-[100px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div style={{ opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/50 bg-purple-500/10 px-6 py-2 text-sm font-bold uppercase tracking-widest text-purple-400 backdrop-blur-md"
            >
              <Atom className="h-4 w-4 animate-spin" style={{ animationDuration: "4s" }} />
              Deep Dive Education
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8"
            >
              Quantum <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                Mechanics
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 max-w-xl mb-10 leading-relaxed"
            >
              Explore the fundamental theory that governs the behavior of matter and energy at the smallest scales—where particles become waves, cats are simultaneously alive and dead, and reality itself becomes probabilistic.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Button size="lg" className="rounded-full px-10 h-14 font-black uppercase tracking-tight text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
                Start Learning
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 font-black uppercase tracking-tight text-lg border-white/20 hover:bg-white/10">
                <BookOpen className="mr-2 h-5 w-5" /> Research Papers
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <AnimatedAtom />
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: 999999 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* Introduction Section */}
      <section className="relative z-10 py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16">
              What is Quantum Mechanics?
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-white/80 leading-relaxed">
                  <span className="text-2xl font-black text-purple-400">Quantum mechanics</span> is the branch of physics that describes the behavior of matter and energy at the atomic and subatomic scales. Developed in the early 20th century, it revolutionized our understanding of the physical world and remains one of humanity's greatest intellectual achievements.
                </p>
                <p className="text-lg text-white/60 leading-relaxed">
                  At the quantum level, the rules we experience in everyday life break down completely. Particles don't have definite positions until measured. They can exist in multiple states simultaneously. They can tunnel through barriers and become mysteriously correlated across vast distances.
                </p>
                <p className="text-lg text-white/60 leading-relaxed">
                  Despite its counterintuitive nature, quantum mechanics is the most precisely tested theory in all of science. Its predictions have been verified to accuracies of one part in a trillion. It underlies virtually all modern technology—from smartphones to medical imaging to the internet itself.
                </p>
              </div>
              <div className="flex flex-col items-center gap-8">
                <WaveAnimation />
                <ProbabilityCloud />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Principles Interactive Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Core Principles
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Master the six foundational concepts that define quantum mechanics and reshape our understanding of reality.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-80 space-y-2 lg:sticky lg:top-24 lg:self-start">
              {CORE_PRINCIPLES.map((principle) => (
                <button
                  key={principle.id}
                  onClick={() => setActivePrinciple(principle)}
                  className={cn(
                    "w-full group flex items-center gap-4 p-5 rounded-2xl transition-all border text-left",
                    activePrinciple.id === principle.id
                      ? "bg-white/10 border-white/20 shadow-xl"
                      : "bg-transparent border-transparent hover:bg-white/5"
                  )}
                >
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center text-white transition-all bg-gradient-to-br",
                    principle.color,
                    activePrinciple.id === principle.id ? "scale-110" : "opacity-60 group-hover:opacity-100"
                  )}>
                    {principle.icon}
                  </div>
                  <div>
                    <span className={cn(
                      "font-bold uppercase tracking-tight transition-colors block",
                      activePrinciple.id === principle.id ? "text-white" : "text-white/50 group-hover:text-white/80"
                    )}>
                      {principle.title}
                    </span>
                    <span className="text-xs text-white/30">{principle.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePrinciple.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden"
                >
                  {/* Hero Image */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                      src={activePrinciple.image}
                      alt={activePrinciple.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={cn("absolute inset-0 bg-gradient-to-t opacity-80", activePrinciple.color)} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center bg-gradient-to-br text-white", activePrinciple.color)}>
                          {activePrinciple.icon}
                        </div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight">{activePrinciple.title}</h3>
                          <p className="text-white/60 font-medium">{activePrinciple.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 space-y-8">
                    {/* Summary */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-white/10">
                      <div className="flex items-start gap-4">
                        <Lightbulb className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
                        <p className="text-xl text-white/90 font-medium leading-relaxed">
                          {activePrinciple.summary}
                        </p>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-invert prose-lg max-w-none">
                      {activePrinciple.content.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-white/70 leading-relaxed mb-6">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Key Points */}
                    <div className="p-8 rounded-2xl bg-black/40 border border-white/5">
                      <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/40 mb-6 flex items-center gap-2">
                        <Target className="h-4 w-4" /> Key Takeaways
                      </h4>
                      <ul className="space-y-4">
                        {activePrinciple.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-br flex-shrink-0", activePrinciple.color)}>
                              {i + 1}
                            </div>
                            <span className="text-white/80">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Double Slit Experiment Visualization */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              The Double-Slit Experiment
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12">
              The most beautiful experiment in physics, demonstrating wave-particle duality in action.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-white/70 leading-relaxed">
                Fire electrons one at a time through two slits. Classical physics predicts two bands of hits on the detector. Instead, an interference pattern emerges—proof that each electron passes through both slits simultaneously as a wave.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                But here's the twist: if you try to observe which slit each electron passes through, the interference pattern disappears. The act of measurement collapses the wave function, forcing the electron to "choose" one path.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                This experiment encapsulates the central mystery of quantum mechanics: observation fundamentally changes reality.
              </p>
            </div>
            <div className="space-y-6">
              <DoubleSlitVisualization />
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-black text-cyan-400">1</div>
                  <div className="text-xs text-white/40 uppercase">Electron Source</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-black text-purple-400">2</div>
                  <div className="text-xs text-white/40 uppercase">Double Slits</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-2xl font-black text-blue-400">∞</div>
                  <div className="text-xs text-white/40 uppercase">Interference</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Equations */}
      <section className="relative z-10 py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              The Mathematics
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              The elegant equations that describe quantum reality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {EQUATIONS.map((eq, i) => (
              <motion.div
                key={eq.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-purple-500/30 transition-all group"
              >
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">{eq.name}</div>
                <div className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
                  {eq.eq}
                </div>
                <p className="text-white/60">{eq.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pioneers Timeline */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              The Pioneers
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              The brilliant minds who built quantum mechanics, brick by brick.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0" />
            
            {PIONEERS.map((pioneer, i) => (
              <motion.div
                key={pioneer.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative flex items-center gap-8 mb-8",
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                <div className={cn("flex-1", i % 2 === 0 ? "md:text-right" : "md:text-left", "hidden md:block")} />
                
                <div className="relative z-10 h-4 w-4 rounded-full bg-purple-500 border-4 border-black shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
                
                <div className="flex-1">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all ml-8 md:ml-0">
                    <div className="text-xs text-purple-400 font-mono mb-2">{pioneer.year}</div>
                    <h4 className="text-xl font-black uppercase tracking-tight mb-2">{pioneer.name}</h4>
                    <p className="text-white/60 text-sm">{pioneer.contribution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="relative z-10 py-32 px-6 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Real-World Applications
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">
              Quantum mechanics isn't just theory—it powers the modern world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {APPLICATIONS.map((app, i) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                  {app.icon}
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-4">{app.title}</h4>
                <p className="text-white/60 leading-relaxed">{app.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mind-Bending Facts */}
      <section className="relative z-10 py-32 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <Brain className="h-16 w-16 text-purple-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12">
            Mind-Bending Facts
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-black border border-white/10">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">99.9%</div>
              <p className="text-white/60">of an atom is empty space. If the nucleus were a marble, the nearest electron would be 2 kilometers away.</p>
            </div>
            <div className="p-8 rounded-3xl bg-black border border-white/10">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">10⁻³⁵m</div>
              <p className="text-white/60">The Planck length—possibly the smallest meaningful distance. Space itself may be quantized at this scale.</p>
            </div>
            <div className="p-8 rounded-3xl bg-black border border-white/10">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400 mb-4">∞</div>
              <p className="text-white/60">Parallel universes? The Many-Worlds interpretation suggests every quantum measurement creates branching realities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-16 rounded-[4rem] bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent" />
          <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Continue Your Journey</h2>
          <p className="text-xl text-white/60 mb-10 max-w-xl mx-auto">
            Quantum mechanics is just the beginning. Explore more of the cosmos in our educational academy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link href="/education/solar-system">
              <Button size="lg" className="rounded-full px-12 h-16 font-black uppercase tracking-tighter text-lg w-full sm:w-auto">
                Solar System
              </Button>
            </Link>
            <Link href="/education">
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 font-black uppercase tracking-tighter text-lg w-full sm:w-auto border-white/20">
                Back to Academy
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 text-center text-muted-foreground text-xs font-mono uppercase tracking-[0.5em] border-t border-white/5 bg-black px-6">
        Aetheris Quantum Academy // The Nature of Reality // 2026
      </footer>
    </main>
  );
}
