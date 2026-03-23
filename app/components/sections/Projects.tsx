"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "autoworx-system",
    description: "Vehicle repair appointment booking and management platform with real-time tracking, cost management, admin dashboard, and Google OAuth. In production by Autoworx.",
    tech: ["TypeScript", "Next.js", "Supabase", "Google OAuth"],
    link: "https://github.com/JavierSiliacay/autoworx-system",
    stars: 0,
  },
  {
    title: "circuitoai",
    description: "AI-powered hardware diagnostic environment – a browser-based IDE with real-time serial telemetry and an AI Specialist for vehicle and IoT debugging. Under active development.",
    tech: ["TypeScript", "Next.js", "AI", "IoT"],
    link: "https://github.com/JavierSiliacay/Circuito-AI",
    stars: 0,
  },
  {
    title: "tarafix",
    description: "Home services marketplace connecting customers with service providers. Features advanced caching with Upstash Redis and TanStack Query for optimal performance. Currently improving.",
    tech: ["TypeScript", "Next.js", "Supabase", "Redis", "TanStack Query"],
    link: "https://github.com/JavierSiliacay/tarafix",
    stars: 0,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto w-full">
      <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
        <span className="w-1 h-8 bg-primary-500 rounded-full" /> Featured Projects
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative flex flex-col p-6 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-primary-500/50 transition-all hover:shadow-xl hover:shadow-primary-500/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex-1">
              <h3 className="text-xl font-semibold text-slate-100 group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative mt-6 flex items-center justify-between">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium text-sm"
              >
                View Project <ExternalLink size={14} />
              </a>
              {project.stars > 0 && (
                <span className="text-slate-500 text-sm flex items-center gap-1">
                  ★ {project.stars}
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
