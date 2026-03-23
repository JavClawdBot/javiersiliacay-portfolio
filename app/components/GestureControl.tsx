"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, VideoOff, Eye, ShieldCheck, Zap, Loader2 } from "lucide-react";

declare global {
  interface Window {
    Hands: any;
    Camera: any;
  }
}

export default function GestureControl() {
  const [isVisionModeOn, setIsVisionModeOn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down" | null>(null);
  const [libsReady, setLibsReady] = useState(false);
  const [isCalibrated, setIsCalibrated] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const handsRef = useRef<any>(null);
  const cursorRef = useRef({ x: 0, y: 0 });

  // 1. Load Scripts
  useEffect(() => {
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
    ];

    let loadedCount = 0;
    const loadHandler = () => {
      loadedCount++;
      if (loadedCount === scripts.length) setLibsReady(true);
    };

    scripts.forEach((src) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        loadHandler();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = loadHandler;
      document.head.appendChild(script);
    });
  }, []);

  // 2. Camera Management (Fixed Lifecycle)
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsActive(false);
    setIsVisionModeOn(false);
    setScrollDir(null);
  }, []);

  // Use a targeted effect to start camera once video element exists
  useEffect(() => {
    let mounted = true;

    async function initCamera() {
      if (isVisionModeOn && !isActive && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 }
          });
          if (mounted && videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            videoRef.current.play();
            setIsActive(true);
          }
        } catch (err) {
          console.error("Camera fail:", err);
          setIsVisionModeOn(false);
        }
      }
    }

    initCamera();
    return () => { mounted = false; };
  }, [isVisionModeOn, isActive]);

  // 3. AI Logic (Standardized)
  useEffect(() => {
    if (!libsReady || !window.Hands) return;

    const hands = new window.Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results: any) => {
      if (!canvasRef.current || !results.multiHandLandmarks) return;
      const canvasCtx = canvasRef.current.getContext("2d");
      if (!canvasCtx) return;

      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.multiHandLandmarks.length > 0) {
        setIsCalibrated(true);
        const landmarks = results.multiHandLandmarks[0];
        const indexTip = landmarks[8];

        const targetX = (1 - indexTip.x) * canvasRef.current.width;
        const targetY = indexTip.y * canvasRef.current.height;
        cursorRef.current.x += (targetX - cursorRef.current.x) * 0.4;
        cursorRef.current.y += (targetY - cursorRef.current.y) * 0.4;

        // Draw HUD
        const { x, y } = cursorRef.current;
        canvasCtx.fillStyle = "#f59e0b";
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, 6, 0, 2 * Math.PI);
        canvasCtx.fill();

        // Scroll
        if (indexTip.y < 0.3) {
          window.scrollBy({ top: -15, behavior: "auto" });
          setScrollDir("up");
        } else if (indexTip.y > 0.7) {
          window.scrollBy({ top: 15, behavior: "auto" });
          setScrollDir("down");
        } else {
          setScrollDir(null);
        }
      } else {
        setScrollDir(null);
      }
    });

    handsRef.current = hands;
    return () => hands.close();
  }, [libsReady]);

  // 4. Processing Loop
  useEffect(() => {
    let animationFrameId: number;
    const process = async () => {
      if (isActive && videoRef.current?.readyState === 4 && handsRef.current) {
        await handsRef.current.send({ image: videoRef.current });
      }
      animationFrameId = requestAnimationFrame(process);
    };
    if (isActive) process();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return (
    <>
      <motion.button
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        onClick={() => isVisionModeOn ? stopCamera() : setIsVisionModeOn(true)}
        disabled={!libsReady}
        className={`fixed top-24 right-6 z-[70] p-3 rounded-xl border flex items-center gap-2 transition-all shadow-xl ${
          isVisionModeOn ? "bg-primary-600 text-white border-primary-400" : "bg-slate-900/80 text-slate-300 border-white/10 backdrop-blur-md"
        }`}
      >
        <div className="relative">
          {(!libsReady || (isVisionModeOn && !isActive)) ? <Loader2 className="animate-spin" size={20} /> : (isVisionModeOn ? <Video size={20} /> : <VideoOff size={20} />)}
        </div>
        <span className="text-xs font-bold uppercase tracking-widest hidden md:block">
          {isVisionModeOn && !isActive ? "Connecting..." : (isVisionModeOn ? "Vision Active" : "Vision Mode")}
        </span>
      </motion.button>

      <AnimatePresence>
        {isVisionModeOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed bottom-32 right-6 z-[60] w-72 h-56 rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl backdrop-blur-xl"
          >
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
                <ShieldCheck size={12} className="text-green-500" />
                <span className="text-[9px] font-bold text-slate-200 uppercase tracking-tighter">Private Stream</span>
              </div>
            </div>

            {scrollDir && (
              <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <div className="bg-primary-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  SCROLLING {scrollDir}
                </div>
              </div>
            )}

            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover grayscale brightness-125" muted playsInline />
            <canvas ref={canvasRef} width={288} height={224} className="absolute inset-0 w-full h-full pointer-events-none z-30" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
