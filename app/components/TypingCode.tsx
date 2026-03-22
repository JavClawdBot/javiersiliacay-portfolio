"use client";

import { useState, useEffect } from "react";

interface TypingCodeProps {
  code: string;
  speed?: number;
}

export default function TypingCode({ code, speed = 30 }: TypingCodeProps) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    let mounted = true;
    
    const type = () => {
      if (mounted && i < code.length) {
        setDisplayed(code.slice(0, i + 1));
        i++;
        setTimeout(type, speed);
      }
    };

    // Blink cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    type();

    return () => {
      mounted = false;
      clearInterval(cursorInterval);
    };
  }, [code, speed]);

  return (
    <code className="relative">
      <span className="text-primary-400 font-mono whitespace-pre-wrap">{displayed}</span>
      <span className={`inline-block w-2 h-5 ml-1 align-middle bg-primary-400 transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </code>
  );
}
