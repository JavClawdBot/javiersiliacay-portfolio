"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, VideoOff, Hand, Loader2, Zap, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    Hands: any;
    Camera: any;
    drawConnectors: any;
    drawLandmarks: any;
    HAND_CONNECTIONS: any;
  }
}

export default function GestureControl() {
  const [isVisionModeOn, setIsVisionModeOn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [gesture, setGesture] = useState<string>("Initializing...");
  const [libsReady, setLibsReady] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const handsRef = useRef<any>(null);
  const smoothedCursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
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

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsActive(false);
    setIsVisionModeOn(false);
    setGesture("Offline");
  }, []);

  useEffect(() => {
    let mounted = true;
    async function initCamera() {
      if (isVisionModeOn && !isActive && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480, frameRate: { ideal: 30 } }
          });
          if (mounted && videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            await videoRef.current.play();
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

  useEffect(() => {
    if (!libsReady || !window.Hands || !window.HAND_CONNECTIONS) return;

    const hands = new window.Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results: any) => {
      if (!canvasRef.current || !results.multiHandLandmarks) return;
      const canvasCtx = canvasRef.current.getContext("2d");
      if (!canvasCtx) return;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        const indexTip = landmarks[8];
        const wrist = landmarks[0];

        // 1. Draw Mesh Skeleton
        window.drawConnectors(canvasCtx, landmarks, window.HAND_CONNECTIONS, {
          color: "#f59e0b",
          lineWidth: 2.5
        });
        window.drawLandmarks(canvasCtx, landmarks, {
          color: "#fbbf24",
          lineWidth: 1,
          radius: 2
        });

        // 2. Continuous Scrolling Logic (intuitive - based on height)
        // If hand is in top 35%, scroll up. If bottom 35%, scroll down.
        let status = "Tracking";
        if (indexTip.y < 0.35) {
          const power = Math.pow((0.35 - indexTip.y) * 4, 2) * 20;
          window.scrollBy({ top: -power, behavior: "auto" });
          status = "Scrolling Up";
        } else if (indexTip.y > 0.65) {
          const power = Math.pow((indexTip.y - 0.65) * 4, 2) * 20;
          window.scrollBy({ top: power, behavior: "auto" });
          status = "Scrolling Down";
        }
        setGesture(status);

        // 3. Cursor Smoothing
        const targetX = (1 - indexTip.x) * canvasRef.current.width;
        const targetY = indexTip.y * canvasRef.current.height;
        smoothedCursor.current.x += (targetX - smoothedCursor.current.x) * 0.45;
        smoothedCursor.current.y += (targetY - smoothedCursor.current.y) * 0.45;

        // Draw Focus Cursor
        const { x, y } = smoothedCursor.current;
        canvasCtx.shadowBlur = 10;
        canvasCtx.shadowColor = "#f59e0b";
        canvasCtx.fillStyle = "#f59e0b";
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, 6, 0, 2 * Math.PI);
        canvasCtx.fill();

        canvasCtx.strokeStyle = "rgba(245, 158, 11, 0.4)";
        canvasCtx.lineWidth = 1;
        canvasCtx.beginPath();
        canvasCtx.arc(x, y, 15, 0, 2 * Math.PI);
        canvasCtx.stroke();
      } else {
        setGesture("Waiting...");
      }
      canvasCtx.restore();
    });

    handsRef.current = hands;
    return () => hands.close();
  }, [libsReady]);

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
        className={`fixed top-24 right-6 z-[70] px-4 py-3 rounded-2xl border flex items-center gap-3 transition-all shadow-2xl ${
          isVisionModeOn ? "bg-primary-600 text-white border-primary-400" : "bg-slate-900/90 text-slate-300 border-white/10 backdrop-blur-xl hover:border-primary-500/50"
        }`}
      >
        <div className="relative">
          {(isVisionModeOn && !isActive) ? <Loader2 className="animate-spin" size={20} /> : (isVisionModeOn ? <Hand size={20} className="text-yellow-400" /> : <VideoOff size={20} />)}
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1">Hand Gesture</span>
          <span className="text-sm font-bold">
            {isVisionModeOn && !isActive ? "Syncing..." : (isVisionModeOn ? "Vision Active" : "Vision Mode")}
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isVisionModeOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-32 right-6 z-[60] w-72 h-56 rounded-[2rem] overflow-hidden glass-card border border-white/10 shadow-2xl backdrop-blur-2xl"
          >
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1">
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md">
                <ShieldCheck size={12} className="text-green-500" />
                <span className="text-[9px] font-bold text-slate-200 uppercase tracking-tighter">{gesture}</span>
              </div>
            </div>

            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[1.5] contrast-[1.1] opacity-40 mix-blend-lighten" muted playsInline />
            <canvas ref={canvasRef} width={288} height={224} className="absolute inset-0 w-full h-full pointer-events-none z-30 scale-x-[-1]" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[30%] border-y border-white/10 pointer-events-none opacity-20" />
            <div className="absolute bottom-2 left-0 right-0 text-center z-40">
              <p className="text-[7px] font-bold text-white/20 uppercase tracking-[0.4em]">Engine v4.3 Live</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
