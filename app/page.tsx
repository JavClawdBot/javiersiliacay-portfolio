"use client";

import { Github, Mail, MapPin, Code, Cpu, Server, ExternalLink, ChevronRight, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedCppCode from "./components/AnimatedCppCode";
import TypingText from "./components/TypingText";

const techStack = [
  { name: "TypeScript", icon: Code },
  { name: "Next.js", icon: Server },
  { name: "Supabase", icon: Server },
  { name: "Arduino", icon: Cpu },
  { name: "ESP32", icon: Cpu },
  { name: "C/C++", icon: Code },
  { name: "Python", icon: Code },
  { name: "MQTT", icon: Code },
  { name: "Tailwind CSS", icon: Code },
  { name: "OpenCV", icon: Code },
  { name: "TensorFlow Lite", icon: Code },
  { name: "Raspberry Pi", icon: Cpu },
];

const projects = [
  {
    title: "autoworx-system",
    description: "Vehicle repair appointment booking and management system with real-time tracking, cost management, and admin dashboard.",
    tech: ["TypeScript", "Next.js", "Supabase"],
    link: "https://github.com/JavierSiliacay/autoworx-system",
    stars: 0,
  },
  {
    title: "Circuito-AI",
    description: "A browser-based hardware development environment featuring an Automotive Diagnostic Station, real-time serial telemetry, and an AI Specialist for advanced vehicle and IoT debugging.",
    tech: ["TypeScript", "Next.js", "AI", "IoT"],
    link: "https://github.com/JavierSiliacay/Circuito-AI",
    stars: 0,
  },
  {
    title: "Mini-Solar-and-Wind-Hybrid-Charging-System",
    description: "Hybrid renewable-energy monitoring system powered by solar and wind sources with infrared sensors, lithium-ion battery storage, and real-time monitoring.",
    tech: ["Arduino", "Sensors", "Energy"],
    link: "https://github.com/JavierSiliacay/Mini-Solar-and-Wind-Hybrid-Charging-System",
    stars: 0,
  },
  {
    title: "Fire-Gas-Detection-with-Automated-Bin-Level-Alert",
    description: "Smart multi-sensor system that detects fire, gas levels, and bin capacity in real time. Automatic safety responses with alerts.",
    tech: ["Arduino", "Sensors", "IoT"],
    link: "https://github.com/JavierSiliacay/Fire-Gas-Detection-with-Automated-Bin-Level-Alert",
    stars: 1,
  },
  {
    title: "TFT-WebServer-RPMGauge",
    description: "ESP32-based Honda Civic RPM gauge using ultrasonic sensor and 2.4\" TFT display. Features real-time RPM visualization and WiFi web interface.",
    tech: ["ESP32", "Arduino C++", "WebServer"],
    link: "https://github.com/JavierSiliacay/TFT-WebServer-RPMGauge",
    stars: 0,
  },
  {
    title: "EMF-Detector",
    description: "Arduino-based EMF detector visualizing EMF levels on an OLED as a dynamic wave. Includes LED and buzzer alerts for low/medium/high readings.",
    tech: ["Arduino", "OLED", "Sensors"],
    link: "https://github.com/JavierSiliacay/EMF-Detector",
    stars: 2,
  },
];

const stats = [
  { label: "Repositories", value: "20+" },
  { label: "Commits (2025)", value: "500+" },
  { label: "Languages", value: "C++, TypeScript, Python" },
  { label: "Focus", value: "Embedded + Full-Stack" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
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
        <div className="flex gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-medium transition-colors flex items-center gap-2"
          >
            View Projects <ChevronRight size={18} />
          </a>
          <a
            href="https://github.com/javiersiliacay"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 border border-slate-600 hover:border-primary-400 text-slate-300 rounded-full font-medium transition-colors flex items-center gap-2"
          >
            <Github size={18} /> GitHub
          </a>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-3 text-sm text-slate-500">
          {techStack.slice(0, 6).map((tech) => {
            const Icon = tech.icon;
            return (
              <span key={tech.name} className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700">
                <Icon size={14} className="text-primary-400" /> {tech.name}
              </span>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <span className="w-1 h-8 bg-primary-500 rounded-full" /> About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              I'm a passionate developer from the Philippines, currently studying at <strong className="text-primary-400">University of Science and Technology of Southern Philippines (USTP)</strong>, focused on building intelligent systems that combine embedded electronics, full-stack web platforms, and AI-driven automotive solutions.
            </p>
            <p>
              My work spans from Arduino / ESP-based hardware systems to production-grade full-stack applications using Next.js, Supabase, TypeScript, and modern AI integrations.
            </p>
            <p>
              I enjoy designing systems where hardware and software work together — from sensors and real-time diagnostics to complete automotive service platforms deployed on the web.
            </p>
          </div>
          <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="text-xl font-semibold text-primary-400">Quick Facts</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary-400" />
                Cagayan de Oro, Philippines
              </li>
              <li className="flex items-center gap-2">
                <Cpu size={16} className="text-primary-400" />
                B.S. Autotronics, USTP
              </li>
              <li className="flex items-center gap-2">
                <Code size={16} className="text-primary-400" />
                Full-Stack + Embedded
              </li>
              <li className="flex items-center gap-2">
                <Server size={16} className="text-primary-400" />
                IoT & Cloud Integrations
              </li>
            </ul>
            <div className="text-sm text-slate-400 pt-2 border-t border-slate-700">
              <AnimatedCppCode speed={50} />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="py-24 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
          <span className="w-1 h-8 bg-primary-500 rounded-full" /> Tech Arsenal
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-primary-500/50 transition-colors"
              >
                <Icon size={20} className="text-primary-400" />
                <span className="text-slate-200">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects */}
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

      {/* GitHub Integration & Stats */}
      <section className="py-24 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
          <span className="w-1 h-8 bg-primary-500 rounded-full" /> GitHub Activity
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
              <div className="text-3xl font-bold text-primary-400 mb-2">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
        <a
          href="https://github.com/javiersiliacay"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-primary-500 text-slate-200 rounded-full font-medium transition-colors"
        >
          <Github size={20} /> View Full Profile
        </a>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          I'm open to collaborations, freelance work, and interesting projects. Feel free to reach out!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:siliacay.javier@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-medium transition-colors shadow-lg shadow-primary-500/25"
          >
            <Mail size={18} /> Send Email
          </a>
          <a
            href="https://www.facebook.com/siliacayjavier/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-primary-500 text-slate-200 rounded-full font-medium transition-colors"
          >
            <Facebook size={18} /> Facebook
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Javier Siliacay. Built with Next.js & Tailwind.</p>
        <p className="mt-2">
          <a href="https://github.com/javiersiliacay" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">GitHub</a>
          {' • '}
          <a href="mailto:javier.siliacay@example.com" className="hover:text-primary-400 transition-colors">Email</a>
        </p>
      </footer>
    </div>
  );
}
