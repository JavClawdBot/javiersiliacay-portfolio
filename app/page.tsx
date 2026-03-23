"use client";

import { motion } from "framer-motion";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import TechStack from "./components/sections/TechStack";
import Projects from "./components/sections/Projects";
import GitHubStats from "./components/sections/GitHubStats";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      <section id="about" className="py-24 px-6 max-w-6xl mx-auto w-full snap-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-8 bg-primary-500 rounded-full" /> About Me
          </h2>
          <About />
        </motion.div>
      </section>

      <section id="tech-stack" className="py-24 px-6 max-w-6xl mx-auto w-full snap-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <TechStack />
        </motion.div>
      </section>

      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto w-full snap-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <Projects />
        </motion.div>
      </section>

      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto w-full snap-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <Projects />
        </motion.div>
      </section>

      <section id="github" className="py-24 px-6 max-w-6xl mx-auto w-full snap-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <GitHubStats />
        </motion.div>
      </section>

      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto w-full snap-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <Contact />
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
