import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Javier Siliacay - Embedded Systems & Full-Stack Developer",
  description: "Portfolio of Javier Siliacay — Full-stack developer and embedded systems engineer from the Philippines. Building intelligent systems that combine hardware, web, and AI.",
};

import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`} data-theme="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
        <Navbar />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
