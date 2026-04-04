"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

function InkSplatter({ x, y, delay }: { x: number; y: number; delay: number }) {
  const size = 40 + Math.random() * 120;
  return (
    <motion.div
      className="fixed rounded-full"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        backgroundColor: [
          "var(--accent-hot)",
          "var(--accent-warm)",
          "var(--accent-cool)",
        ][Math.floor(Math.random() * 3)],
        mixBlendMode: "multiply",
      }}
      initial={{ scale: 0, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 0 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
    />
  );
}

export default function KonamiEasterEgg() {
  const [input, setInput] = useState<string[]>([]);
  const [triggered, setTriggered] = useState(false);
  const [splatters, setSplatters] = useState<{ x: number; y: number; delay: number; id: number }[]>([]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (triggered) return;
      const next = [...input, e.key].slice(-KONAMI.length);
      setInput(next);

      if (next.length === KONAMI.length && next.every((k, i) => k === KONAMI[i])) {
        setTriggered(true);
        // Generate splatters
        const newSplatters = Array.from({ length: 20 }, (_, i) => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          delay: i * 0.05,
          id: i,
        }));
        setSplatters(newSplatters);
        setTimeout(() => {
          setTriggered(false);
          setSplatters([]);
        }, 3000);
      }
    },
    [input, triggered]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      {triggered && (
        <div className="pointer-events-none fixed inset-0 z-[200]">
          {splatters.map((s) => (
            <InkSplatter key={s.id} x={s.x} y={s.y} delay={s.delay} />
          ))}
          <motion.p
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-4xl uppercase tracking-widest text-flash-white md:text-6xl"
            style={{ transform: "rotate(-5deg)" }}
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            &#9733; NICE &#9733;
          </motion.p>
        </div>
      )}
    </AnimatePresence>
  );
}
