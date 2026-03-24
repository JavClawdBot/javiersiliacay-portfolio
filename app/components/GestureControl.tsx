"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoOff, Hand, Loader2, ShieldCheck, User, Box, Smile } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Hands: any;
    FaceMesh: any;
    drawConnectors: any;
    drawLandmarks: any;
    HAND_CONNECTIONS: any;
    FACEMESH_TESSELATION: any;
  }
}

export default function MultimodalVision() {
  const [isVisionModeOn, setIsVisionModeOn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [libsReady, setLibsReady] = useState(false);
  
  const [emotion, setEmotion] = useState<string>("Neutral");
  const [detectedObj] = useState<string | null>(null);
  const [gesture, setGesture] = useState<string>("Initializing...");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const handsRef = useRef<any>(null);
  const faceMeshRef = useRef<any>(null);
  const smoothedCursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scripts = [
      "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js",
      "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js",
    ];

    let loaded = 0;
    const loadHandler = () => {
      loaded++;
      if (loaded === scripts.length) setLibsReady(true);
    };

    scripts.forEach(src => {
      const s = document.createElement("script");
      s.src = src; s.async = true;
      s.onload = loadHandler;
      document.head.appendChild(s);
    });
  }, []);

  const stopVision = useCallback(() => {
    if (streamRef.current) { streamRef.current.getTracks().forEach(t => t.stop()); streamRef.current = null; }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsActive(false); setIsVisionModeOn(false);
  }, []);

  useEffect(() => {
    if (isVisionModeOn && !isActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
        .then(s => { 
          if (videoRef.current) { videoRef.current.srcObject = s; streamRef.current = s; videoRef.current.play(); setIsActive(true); }
        })
        .catch(() => setIsVisionModeOn(false));
    }
  }, [isVisionModeOn, isActive]);

  useEffect(() => {
    if (!libsReady || !window.Hands || !window.FaceMesh) return;

    const hands = new window.Hands({
      locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
    });
    hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.7 });
    hands.onResults((res: any) => handleHands(res));
    handsRef.current = hands;

    const faceMesh = new window.FaceMesh({
      locateFile: (f: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}`
    });
    faceMesh.setOptions({ maxNumFaces: 1, refineLandmarks: true, minDetectionConfidence: 0.7 });
    faceMesh.onResults((res: any) => handleFace(res));
    faceMeshRef.current = faceMesh;

    return () => { hands.close(); faceMesh.close(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [libsReady]);

  const handleHands = (results: any) => {
    if (!canvasRef.current || !results.multiHandLandmarks) return;
    const ctx = canvasRef.current.getContext("2d")!;
    if (results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      const indexTip = landmarks[8];
      
      window.drawConnectors(ctx, landmarks, window.HAND_CONNECTIONS, { color: "rgba(245,158,11,0.2)", lineWidth: 2 });
      window.drawLandmarks(ctx, landmarks, { color: "#fbbf24", lineWidth: 1, radius: 1 });

      if (indexTip.y < 0.3) { window.scrollBy(0, -25); setGesture("Scrolling Up"); }
      else if (indexTip.y > 0.7) { window.scrollBy(0, 25); setGesture("Scrolling Down"); }
      else setGesture("Tracking Hand");

      const tx = indexTip.x * canvasRef.current.width;
      const ty = indexTip.y * canvasRef.current.height;
      smoothedCursor.current.x += (tx - smoothedCursor.current.x) * 0.4;
      smoothedCursor.current.y += (ty - smoothedCursor.current.y) * 0.4;
      ctx.fillStyle = "#f59e0b"; ctx.beginPath(); ctx.arc(smoothedCursor.current.x, smoothedCursor.current.y, 6, 0, 2*Math.PI); ctx.fill();
    }
  };

  const handleFace = (results: any) => {
    if (!canvasRef.current || !results.multiFaceLandmarks) return;
    const ctx = canvasRef.current.getContext("2d")!;
    
    if (results.multiFaceLandmarks.length > 0) {
      const landmarks = results.multiFaceLandmarks[0];
      
      ctx.save();
      window.drawConnectors(ctx, landmarks, window.FACEMESH_TESSELATION, 
        { color: "rgba(255, 255, 255, 0.2)", lineWidth: 0.5 });
      
      const keypoints = [
        landmarks[1], landmarks[33], landmarks[263], landmarks[61], landmarks[291], 
        landmarks[199], landmarks[10], landmarks[152]
      ];
      
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00d4ff";
      ctx.fillStyle = "#00d4ff";
      keypoints.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x * canvasRef.current!.width, pt.y * canvasRef.current!.height, 2.5, 0, 2*Math.PI);
        ctx.fill();
      });
      ctx.restore();

      const mouthLeft = landmarks[61]; const mouthRight = landmarks[291];
      const mouthTop = landmarks[13]; const mouthBottom = landmarks[14];
      const eyeLeft = landmarks[33]; const eyeRight = landmarks[263];
      
      const mouthWidth = Math.sqrt(Math.pow(mouthLeft.x - mouthRight.x, 2) + Math.pow(mouthLeft.y - mouthRight.y, 2));
      const eyeWidth = Math.sqrt(Math.pow(eyeLeft.x - eyeRight.x, 2) + Math.pow(eyeLeft.y - eyeRight.y, 2));
      const mouthHeight = Math.abs(mouthTop.y - mouthBottom.y);
      const smileRatio = mouthWidth / eyeWidth;
      
      if (mouthHeight > 0.05) setEmotion("Surprised");
      else if (smileRatio > 0.85) setEmotion("Smiling :)");
      else setEmotion("Focused");
    }
  };

  useEffect(() => {
    let anim: number;
    const loop = async () => {
      if (isActive && videoRef.current?.readyState === 4) {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d")!;
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        if (handsRef.current) await handsRef.current.send({ image: videoRef.current });
        if (faceMeshRef.current) await faceMeshRef.current.send({ image: videoRef.current });
      }
      anim = requestAnimationFrame(loop);
    };
    if (isActive) loop();
    return () => cancelAnimationFrame(anim);
  }, [isActive]);

  return (
    <>
      <motion.button
        onClick={() => isVisionModeOn ? stopVision() : setIsVisionModeOn(true)}
        disabled={!libsReady}
        className={`fixed top-24 right-6 z-[70] px-4 py-3 rounded-2xl border flex items-center gap-3 transition-all ${
          isVisionModeOn ? "bg-primary-600 text-white border-primary-400" : "bg-slate-900/90 text-slate-300 border-white/10 backdrop-blur-xl"
        }`}
      >
        {(isVisionModeOn && !isActive) ? <Loader2 className="animate-spin" size={18} /> : (isVisionModeOn ? <User size={18} /> : <VideoOff size={18} />)}
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black uppercase tracking-widest mb-1">AI Camera Vision</span>
          <span className="text-sm font-bold">{isVisionModeOn ? "Camera Vision Active" : "Vision Mode"}</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {isVisionModeOn && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-32 right-6 z-[60] w-80 h-64 rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl backdrop-blur-2xl"
          >
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <Hand size={12} className="text-primary-400" />
                <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest leading-none">{gesture}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <Smile size={12} className="text-blue-400" />
                <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest leading-none">Mood: {emotion}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <Box size={12} className="text-green-400" />
                <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest leading-none">{detectedObj || "Environmental Scan"}</span>
              </div>
            </div>

            <div className="absolute inset-0 w-full h-full scale-x-[-1]">
              <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover grayscale brightness-[1.6] opacity-30 mix-blend-screen" muted playsInline />
              <canvas ref={canvasRef} width={320} height={256} className="absolute inset-0 w-full h-full pointer-events-none z-30" />
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 text-center z-40">
              <div className="flex items-center justify-center gap-2 mb-1">
                <ShieldCheck size={10} className="text-green-500" />
                <p className="text-[7px] font-black text-white/30 uppercase tracking-[0.4em]">Biometric Local Sync</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
