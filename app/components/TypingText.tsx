"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  repeatCount?: number; // number of times to repeat after first full typing
  pauseAfterMs?: number; // pause before restarting
}

export default function TypingText({
  text,
  speed = 80,
  repeatCount = 3,
  pauseAfterMs = 2000
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [cycle, setCycle] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blinking every 530ms (independent of typing state)
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isPaused) {
      const timer = setTimeout(() => {
        if (cycle < repeatCount) {
          setDisplayed("");
          setCycle((prev) => prev + 1);
          setIsPaused(false);
        } else {
          // All cycles done, stay paused with full text visible, cursor still blinking
          setIsPaused(false); // ensure we exit paused state but don't clear text
        }
      }, pauseAfterMs);
      return () => clearTimeout(timer);
    } else if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      // Full text shown, pause then restart (if cycles left)
      const t = setTimeout(() => setIsPaused(true), 0);
      return () => clearTimeout(t);
    }
  }, [displayed, text, speed, cycle, repeatCount, pauseAfterMs, isPaused]);

  return (
    <span>
      {displayed || text}
      <span className={`inline-block w-1 h-8 ml-1 align-middle bg-primary-400 transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
}
