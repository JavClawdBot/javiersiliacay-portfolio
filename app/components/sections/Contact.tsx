"use client";

import { Mail, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto w-full text-center">
      <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
      <p className="text-slate-400 mb-8 max-w-xl mx-auto">
        I&apos;m open to collaborations, freelance work, and interesting projects. Feel free to reach out!
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
  );
}
