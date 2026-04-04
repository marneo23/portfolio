"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadSequenceProps {
  children: React.ReactNode;
}

export default function LoadSequence({ children }: LoadSequenceProps) {
  const [phase, setPhase] = useState<"black" | "grain" | "done">("black");

  useEffect(() => {
    // Black -> grain visible (200ms)
    const t1 = setTimeout(() => setPhase("grain"), 200);
    // Grain -> content (700ms total)
    const t2 = setTimeout(() => setPhase("done"), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {phase !== "done" && (
          <motion.div
            className="fixed inset-0 z-[100] bg-bg-primary"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Grain fades in during "grain" phase */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "grain" ? 0.08 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="100%" height="100%">
                <filter id="load-grain">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#load-grain)" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
