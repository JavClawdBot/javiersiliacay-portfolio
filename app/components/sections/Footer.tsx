"use client";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-slate-800 text-center text-slate-500 text-sm">
      <p>© {currentYear} Javier Siliacay. Built with Next.js & Tailwind.</p>
      <p className="mt-2">
        <a href="https://github.com/javiersiliacay" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">GitHub</a>
        {' • '}
        <a href="https://www.facebook.com/siliacayjavier/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">Facebook</a>
        {' • '}
        <a href="mailto:siliacay.javier@gmail.com" className="hover:text-primary-400 transition-colors">Email</a>
      </p>
    </footer>
  );
}
