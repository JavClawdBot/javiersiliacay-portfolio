"use client";

import TypingText from "../TypingText";
import { Github, ChevronRight } from "lucide-react";

const techStack = [
  { name: "TypeScript" }, { name: "Next.js" }, { name: "Supabase" },
  { name: "Arduino" }, { name: "ESP32" }, { name: "C/C++" },
  { name: "Python" }, { name: "MQTT" }, { name: "Tailwind CSS" },
  { name: "OpenCV" }, { name: "TensorFlow Lite" }, { name: "Raspberry Pi" },
];

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
        <TypingText text="Javier Siliacay" repeatCount={1} speed={50} pauseAfterMs={2000} />
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 mb-4 max-w-2xl">
        Embedded Systems & Full-Stack Developer
      </p>
      <p className="text-slate-500 max-w-2xl mb-8">
        From USTP Cagayan de Oro. Building intelligent systems that combine embedded electronics, full-stack web platforms, and AI-driven automotive solutions.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <a href="#projects" className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-medium transition-colors flex items-center gap-2">
          View Projects <ChevronRight size={18} />
        </a>
        <a href="https://github.com/javiersiliacay" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-slate-600 hover:border-primary-400 text-slate-300 rounded-full font-medium transition-colors flex items-center gap-2">
          <Github size={18} /> GitHub
        </a>
      </div>

      <div className="mt-16 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
        {techStack.slice(0, 6).map((tech) => (
          <span key={tech.name} className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
            {tech.name}
          </span>
        ))}
      </div>
    </section>
  );
}
