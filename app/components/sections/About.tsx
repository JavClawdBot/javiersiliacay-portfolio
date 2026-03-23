"use client";

import { MapPin, Cpu, Code, Server } from "lucide-react";
import AnimatedCppCode from "../AnimatedCppCode";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto w-full">
      <div className="space-y-4 text-slate-300 leading-relaxed">
        <p>
          I&apos;m a passionate developer from the Philippines, currently studying at <strong className="text-primary-400">University of Science and Technology of Southern Philippines (USTP)</strong>, focused on building intelligent systems that combine embedded electronics, full-stack web platforms, and AI-driven automotive solutions.
        </p>
        <p>
          My work spans from Arduino / ESP-based hardware systems to production-grade full-stack applications using Next.js, Supabase, TypeScript, and modern AI integrations.
        </p>
        <p>
          I enjoy designing systems where hardware and software work together — from sensors and real-time diagnostics to complete automotive service platforms deployed on the web.
        </p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 space-y-4 mt-8">
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
    </section>
  );
}
