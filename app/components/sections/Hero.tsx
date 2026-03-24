"use client";

import TypingText from "../TypingText";
import { Github, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const techStack = [
  { name: "TypeScript" }, { name: "Next.js" }, { name: "Supabase" },
  { name: "Arduino" }, { name: "ESP32" }, { name: "C/C++" },
  { name: "Python" }, { name: "MQTT" }, { name: "Tailwind CSS" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
            <Sparkles size={14} /> 
            <span>Available for new projects</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 leading-tight">
            <TypingText text="Javier Siliacay" repeatCount={1} speed={50} pauseAfterMs={2000} />
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-slate-200 mb-6">
            Embedded Systems & <span className="text-primary-400">Full-Stack Developer</span>
          </h2>
          
          <p className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
            From USTP Cagayan de Oro. Building intelligent systems that combine embedded electronics, full-stack web platforms, IoT Projects and AI-driven integrated solutions.
          </p>

          <div className="flex gap-4 flex-wrap mb-12">
            <a href="#projects" className="px-8 py-3.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all hover:scale-105 flex items-center gap-2">
              View My Work <ChevronRight size={18} />
            </a>
            <a href="https://github.com/javiersiliacay" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 border border-slate-700 bg-slate-800/50 hover:border-primary-400 text-slate-300 rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2">
              <Github size={18} /> GitHub
            </a>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-medium text-slate-400 uppercase tracking-widest">
            {techStack.map((tech) => (
              <span key={tech.name} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800">
                {tech.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Figure (Tech Transformation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center"
        >
          {/* Circuit Decor Background */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30">
            <svg width="500" height="500" viewBox="0 0 100 100" className="text-primary-500/20">
              <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M10,10 L90,10 L90,90 L10,90 Z M20,20 L80,20 M20,30 L80,30 M50,10 L50,90 M10,50 L90,50" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2,2" />
            </svg>
          </div>

          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-[420px] h-[420px] border border-primary-500/20 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
          </div>

          {/* Profile Frame with 'Tech' Filters */}
          <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden glass-card border border-primary-500/30 group shadow-2xl relative">
            {/* Scanning Line Animation */}
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent z-10 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            />
            
            <div className="absolute inset-0 bg-primary-500/5 -z-10" />
            
            <Image 
              src="/javiersiliacay-portfolio/javier.png" 
              alt="Javier Siliacay"
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 brightness-[1.05] contrast-[1.05]"
              priority
            />
            
            {/* Cyberpunk Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/40 via-transparent to-primary-900/20 pointer-events-none" />
          </div>

          {/* Floating 'Tech Guy' Labels */}
          <motion.div 
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 p-4 rounded-2xl glass-card border border-primary-500/20 shadow-xl backdrop-blur-md hidden md:block z-20"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <div className="text-[10px] uppercase text-slate-400 font-bold tracking-tighter">System Online</div>
            </div>
            <div className="text-xl font-black text-primary-400 tracking-tight">DEV_MODE</div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 p-4 rounded-2xl glass-card border border-primary-500/20 shadow-xl backdrop-blur-md hidden md:block z-20"
          >
            <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">Authorization</div>
            <div className="text-lg font-mono text-primary-400">ADMIN::ROOT</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
